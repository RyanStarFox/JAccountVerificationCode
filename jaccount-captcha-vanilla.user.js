// ==UserScript==
// @name         jAccount 验证码识别 - 本地OCR版
// @name:en      jAccount Captcha Auto-Recognizer
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  jAccount验证码识别 - 本地Tesseract.js OCR
// @description:en jAccount captcha recognition - local OCR with Tesseract.js
// @author       danyang685
// @homepageURL  https://github.com/RyanStarFox/JAccountVerificationCode
// @supportURL   https://github.com/RyanStarFox/JAccountVerificationCode/issues
// @source       https://github.com/RyanStarFox/JAccountVerificationCode
// @match        https://jaccount.sjtu.edu.cn/jaccount/jalogin*
// @grant        GM_xmlHttpRequest
// @run-at       document-end
// @connect      unpkg.com
// @connect      raw.githubusercontent.com
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    
    const CONFIG = {
        captchaInputSelector: '#input-login-captcha',
        captchaImageSelector: '#captcha-img',
        usernameSelector: '#input-login-name',
        timeout: 30000
    };
    
    function getElement(selector) {
        return document.querySelector(selector);
    }
    
    function getImageBase64(imgElement) {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = imgElement.naturalWidth || imgElement.width;
                canvas.height = imgElement.naturalHeight || imgElement.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Cannot get canvas context'));
                    return;
                }
                ctx.drawImage(imgElement, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            } catch (e) {
                reject(e);
            }
        });
    }
    
    // ========== ONNX 模型识别 (优先) ==========
    let ort = null;
    let onnxSession = null;

    // 抑制 ONNX 警告日志 - 只抑制 ONNX Runtime 的内部日志
    (function() {
        const originalWarn = console.warn;
        const originalError = console.error;
        console.warn = function(...args) {
            const msg = args[0];
            if (msg && typeof msg === 'string') {
                // 抑制 ONNX Runtime 的警告: [W:onnxruntime 或 Initializer 开头
                if (msg.includes('[W:onnxruntime') || msg.startsWith('Initializer ')) {
                    return;
                }
            }
            originalWarn.apply(console, args);
        };
        console.error = function(...args) {
            const msg = args[0];
            if (msg && typeof msg === 'string') {
                if (msg.includes('[W:onnxruntime') || msg.startsWith('Initializer ')) {
                    return;
                }
            }
            originalError.apply(console, args);
        };
    });




    (function() {
        const originalWarn = console.warn;
        const originalError = console.error;
        const originalLog = console.log;
        console.warn = function(...args) {
            if (args[0] && typeof args[0] === 'string' && args[0].toLowerCase().includes('onnxruntime')) return;
            originalWarn.apply(console, args);
        };
        console.error = function(...args) {
            if (args[0] && typeof args[0] === 'string' && args[0].toLowerCase().includes('onnxruntime')) return;
            originalError.apply(console, args);
        };
        console.log = function(...args) {
            if (args[0] && typeof args[0] === 'string' && args[0].toLowerCase().includes('onnxruntime')) return;
            originalLog.apply(console, args);
        };
    })();
        const originalWarn = console.warn;
    })();
            if (args[0] && typeof args[0] === 'string' && args[0].toLowerCase().includes('onnx')) return;
            originalWarn.apply(console, args);
        };
    })();
    async function loadONNX() {
        if (ort) return ort;
        console.log('[jAccount] 加载 ONNX Runtime...');
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/onnxruntime-web@1.16.3/dist/ort.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('ONNX load failed'));
            document.head.appendChild(script);
        });
        ort = window.ort;
        return ort;
    }

    async function loadONNXModel() {
        if (onnxSession) return onnxSession;
        console.log('[jAccount] 加载 ResNet 模型...');
        const modelUrl = 'https://raw.githubusercontent.com/RyanStarFox/JAccountVerificationCode/main/model/nn_model.onnx';
        onnxSession = await ort.InferenceSession.create(modelUrl);
        console.log('[jAccount] 模型加载成功');
        return onnxSession;
    }

    function preprocessForONNX(imgElement) {
        const width = 110;
        const height = 40;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const input = new Float32Array(width * height);
        const threshold = 156;
        for (let i = 0; i < width * height; i++) {
            const gray = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
            // Python: img.point(table, "1") 后再做 /255.0 归一化
            input[i] = gray > threshold ? 1.0 : 0.0;
        }
        return input;
    }

    function postprocessONNX(output) {
        // 输出是 5 个独立的 tensor，键为 '218', '219', '220', '221', '222'
        const outputKeys = Object.keys(output);
        console.log('[jAccount] 输出键:', outputKeys);
        
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        let confidenceValues = [];
        
        for (const key of outputKeys) {
            const tensor = output[key];
            const data = tensor.data;
            
            // 找到最大值的索引和置信度
            let maxIdx = 0, maxVal = -Infinity;
            for (let j = 0; j < 26; j++) {
                if (data[j] > maxVal) {
                    maxVal = data[j];
                    maxIdx = j;
                }
            }
            confidenceValues.push(maxVal);
            result += chars[maxIdx];
        }
        
        console.log('[jAccount] 置信度:', confidenceValues);
        
        // 检测有效字符数量 - 从后往前扫描，找到低置信度的起始位置
        // 支持 1-5 位验证码（模型输出 5 个 tensor）
        const avgConfidence = confidenceValues.reduce((a, b) => a + b, 0) / confidenceValues.length;
        // 专门检测4位验证码：最后一两个位置信度明显低于前面
        // 4位验证码：第4位(索引3)和第5位(索引4)的置信度应该都很低
        const lastTwo = confidenceValues.slice(-2);
        const firstThree = confidenceValues.slice(0, 3);
        const lastTwoAvg = lastTwo.reduce((a,b)=>a+b,0) / 2;
        const firstThreeAvg = firstThree.reduce((a,b)=>a+b,0) / 3;
        
        // 如果后两位平均置信度小于前三位平均的40%，认为是4位
        if (lastTwoAvg < firstThreeAvg * 0.4 && confidenceValues.length === 5) {
            result = result.substring(0, 4);
            console.log('[jAccount] 检测为4位验证码:', result);
        }
        
        // 从后往前数有多少个低置信度的位置
        let trailingLowCount = 0;
        for (let i = confidenceValues.length - 1; i >= 0; i--) {
            if (confidenceValues[i] < threshold) {
                trailingLowCount++;
            } else {
                break;  // 遇到高置信度就停止
            }
        }
        
        // 实际长度 = 总长度 - 尾随低置信度数量
        // 至少保留 1 位
        const actualLength = Math.max(1, confidenceValues.length - trailingLowCount);
        
        if (trailingLowCount > 0) {
            result = result.substring(0, actualLength);
            console.log(`[jAccount] 检测为${actualLength}位验证码 (${trailingLowCount}位低置信度):`, result);
        }
        
        console.log('[jAccount] 后处理结果:', result);
        return result;
    }














    async function recognizeWithONNX(captchaImage) {
        await loadONNX();
        await loadONNXModel();
        
        // 预处理图片
        const inputData = preprocessForONNX(captchaImage);
        console.log('[jAccount] 输入数据长度:', inputData.length);
        const inputTensor = new ort.Tensor('float32', inputData, [1, 1, 40, 110]);
        
        // 模型输入名是 'input.1'
        console.log('[jAccount] 执行 ONNX 推理...');
        const feeds = { 'input.1': inputTensor };
        const output = await onnxSession.run(feeds);
        console.log('[jAccount] ONNX 输出 keys:', Object.keys(output));
        
        return postprocessONNX(output);
    }
    
    // ========== Tesseract 识别 (回退方案) ==========
    async function loadTesseract() {
        if (window.Tesseract) return;
        console.log('[jAccount] 加载 Tesseract.js...');
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/tesseract.js@5/dist/tesseract.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Tesseract.js load failed'));
            document.head.appendChild(script);
        });
    }

    async function recognizeWithTesseract(captchaImage) {
        await loadTesseract();
        const dataURL = await getImageBase64(captchaImage);
        console.log('[jAccount] Tesseract 识别中...');
        const result = await Tesseract.recognize(dataURL, 'eng', {
            logger: m => console.log('[jAccount] Tesseract:', m.status, (m.progress * 100).toFixed(0) + '%')
        });
        return result.data.text.replace(/[^a-zA-Z0-9]/g, '');
    }
    
    async function recognize(captchaImage) {
        const captchaInput = getElement(CONFIG.captchaInputSelector);
        if (!captchaImage || !captchaInput) {
            console.error('[jAccount] Elements not found');
            return;
        }
        
        try {
            captchaInput.placeholder = '正在识别...';
            
            let text;
            
            // 优先使用 ONNX 模型识别
            try {
                console.log('[jAccount] 尝试 ONNX 模型识别...');
                text = await recognizeWithONNX(captchaImage);
                console.log('[jAccount] ONNX 识别成功:', text);
            } catch (onnxError) {
                console.warn('[jAccount] ONNX 识别失败，使用 Tesseract:', onnxError.message);
                // 回退到 Tesseract
                text = await recognizeWithTesseract(captchaImage);
                console.log('[jAccount] Tesseract 识别成功:', text);
            }
            
            captchaInput.value = text;
            captchaInput.spellcheck = false;
            console.log('[jAccount] 识别成功:', text);
            
            // 聚焦到用户名输入框
            setTimeout(() => {
                // 尝试多个可能的选择器
                const selectors = ['#input-login-name', '#username', 'input[name="username"]', 'input[type="text"]'];
                for (const sel of selectors) {
                    const el = document.querySelector(sel);
                    if (el) {
                        el.focus();
                        console.log('[jAccount] 已聚焦到:', sel);
                        break;
                    }
                }
            }, 200);
            
            // 延迟聚焦到用户名输入框
            setTimeout(() => {
                const usernameInput = getElement(CONFIG.usernameSelector);
                if (usernameInput) {
                    usernameInput.focus();
                    console.log('[jAccount] 已聚焦到用户名框');
                }
            }, 100);
            
        } catch (e) {
            console.error('[jAccount] 识别失败:', e);
            captchaInput.placeholder = '识别失败，请手动输入';
        }
    }
    
    function doRecognize() {
        const captchaImage = getElement(CONFIG.captchaImageSelector);
        const captchaInput = getElement(CONFIG.captchaInputSelector);
        
        if (!captchaImage || !captchaInput) return;
        
        captchaInput.value = '';
        captchaInput.focus();
        
        // 等待图片加载
        if (captchaImage.complete) {
            recognize(captchaImage);
        } else {
            captchaImage.onload = () => recognize(captchaImage);
        }
        
        // 超时保护
        setTimeout(() => {
            if (captchaInput.placeholder === '正在识别...') {
                captchaInput.placeholder = '识别超时，请手动输入';
            }
        }, CONFIG.timeout);
    }
    
    // 初始化
    function init() {
        const captchaImage = getElement(CONFIG.captchaImageSelector);
        if (!captchaImage) {
            console.log('[jAccount] 未找到验证码图片');
            return;
        }
        
        console.log('[jAccount] 初始化完成');
        
        // 延迟执行，确保图片加载
        setTimeout(doRecognize, 500);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
