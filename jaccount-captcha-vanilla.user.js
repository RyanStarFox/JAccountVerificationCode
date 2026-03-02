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
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0, 64, 64);
        const imageData = ctx.getImageData(0, 0, 64, 64);
        const data = imageData.data;
        const input = new Float32Array(64 * 64);
        const threshold = 156;
        for (let i = 0; i < 64 * 64; i++) {
            const gray = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
            input[i] = gray > threshold ? 1.0 : 0.0;
        }
        return input;
    }

    function postprocessONNX(output) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const logits = output.output.data;
        let result = '';
        for (let i = 0; i < 5; i++) {
            let maxIdx = 0, maxVal = -Infinity;
            for (let j = 0; j < 26; j++) {
                if (logits[i * 26 + j] > maxVal) {
                    maxVal = logits[i * 26 + j];
                    maxIdx = j;
                }
            }
            result += chars[maxIdx];
        }
        return result;
    }

    async function recognizeWithONNX(captchaImage) {
        await loadONNX();
        await loadONNXModel();
        const inputData = preprocessForONNX(captchaImage);
        const inputTensor = new ort.Tensor('float32', inputData, [1, 1, 64, 64]);
        const output = await onnxSession.run({ input: inputTensor });
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
