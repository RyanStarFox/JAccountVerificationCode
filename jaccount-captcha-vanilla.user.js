// ==UserScript==
// @name         jAccount 验证码识别 - 原生JS版 (无需jQuery)
// @name:en      jAccount Captcha Auto-Recognizer - Vanilla JS
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  jAccount验证码识别 - 本地ONNX模型识别，精度高速度快
// @description  jAccount验证码识别 - 纯本地OCR，无需远程服务器
// @description:en jAccount captcha recognition - local OCR, no remote server required
// @author       danyang685
// @homepageURL  https://github.com/danyang685/JAccountVerificationCode
// @supportURL   https://github.com/danyang685/JAccountVerificationCode/issues
// @source       https://github.com/danyang685/JAccountVerificationCode
// @match        https://jaccount.sjtu.edu.cn/jaccount/jalogin*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmlJREFUWAntl8FKAzEQhv+zJWIXHbRjcXFwcHB00MnJ0cXF2c3R0cXF2dHJ0dHJ0dHRz/5LR0dHR+IKFAouWhTc7GZ3k5yT3WQPaYL+s5PdzPJm/pnRJBIYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAYDAeT7/f5XkqR+v/+TpunVbrf7NplM/k4mk/8Wi8XvhULhW7FY/F4qlb4Vi8VvhULha7FY/F4oFL4WCoXP+Xz+Uzab/ZDJZD5kMpkPyWTyQzKZ/JBIJD4kEokPiUTiXTwef4/H4+/h2HvY7e/D4fBbNBp9C4fDr6FQ6DUYCLz6fL5Xt9v9YrfbX+12+6vVan21Wq0vFovl2Ww2P5vN5kfz+fxorVYb7fP5/ov5fH5wMBgM9vv9/na73c1ms5u1Wm20xWL5L+bz+cHBwOBb8C34GnwOvgeTyeQ/1Gq10VardbRcLo/2er2Pfr//0ev1Prrd7ker1fpot9t/mUzm/2KxOB6LxUYbjcZot9sd7fV6H61W62OxWPyG3W4fTafTo+12+2M2m/0P1Gq10UajMToYDD663e5Ht9v96Ha7H91u96Pb7X50u92Pbrf70ePx/AdyuX+C2WwOsrOzs1csFgfZbHY4m80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ5K7gYv0y+AAAAAASUVORK5CYII=
// @grant        GM_xmlHttpRequest
// @run-at       document-end
// @connect      unpkg.com
// @connect      raw.githubusercontent.com
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    
    // ============ 配置 ============
    const CONFIG = {
        captchaInputSelector: '#input-login-captcha',
        captchaImageSelector: '#captcha-img',
        timeout: 30000  // OCR 需要更长时间
    };
    
    // ============ 工具函数 ============
    // 模拟 jQuery 的 $ 函数
    function $(selector) {
        const elements = document.querySelectorAll(selector);
        return {
            length: elements.length,
            0: elements[0],
            // 常见方法
            attr: function(name, value) {
                if (value === undefined) {
                    return this[0] ? this[0].getAttribute(name) : undefined;
                }
                elements.forEach(el => el.setAttribute(name, value));
                return this;
            },
            css: function(name, value) {
                elements.forEach(el => el.style[name] = value);
                return this;
            },
            show: function() {
                elements.forEach(el => el.style.display = '');
                return this;
            },
            hide: function() {
                elements.forEach(el => el.style.display = 'none');
                return this;
            },
            focus: function() {
                if (this[0]) this[0].focus();
                return this;
            },
            stop: function() {
                elements.forEach(el => {
                    if (el.style) el.style.display = '';
                });
                return this;
            },
            append: function(content) {
                if (typeof content === 'string') {
                    const temp = document.createElement('div');
                    temp.innerHTML = content;
                    elements.forEach(el => {
                        while (temp.firstChild) {
                            el.appendChild(temp.firstChild);
                        }
                    });
                }
                return this;
            }
        };
    }
    
    // DOM 就绪
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    // 获取元素
    function getElement(selector) {
        return document.querySelector(selector);
    }
    
    // 获取图片 Base64
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
    // ONNX Runtime Web
    let ort = null;
    let session = null;

    // 加载 ONNX Runtime Web
    async function loadONNXRuntime() {
        if (ort) return ort;
        console.log('[jAccount] 加载 ONNX Runtime Web...');
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/onnxruntime-web@1.16.3/dist/ort.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('ONNX Runtime 加载失败'));
            document.head.appendChild(script);
        });
        ort = window.ort;
        console.log('[jAccount] ONNX Runtime 已加载');
        return ort;
    }

    // 加载模型
    async function loadModel() {
        if (session) return session;
        console.log('[jAccount] 加载识别模型...');
        const modelUrl = 'https://raw.githubusercontent.com/RyanStarFox/JAccountVerificationCode/main/model/nn_model.onnx';
        try {
            session = await ort.InferenceSession.create(modelUrl);
            console.log('[jAccount] 模型加载成功');
            return session;
        } catch (e) {
            console.error('[jAccount] 模型加载失败:', e);
            throw e;
        }
    }

    // 预处理图片 - 匹配 Python 代码
    function preprocessImage(imgElement, width = 64, height = 64) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // 绘制图片
        ctx.drawImage(imgElement, 0, 0, width, height);
        
        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // 转换为灰度并应用阈值 (table = [0]*156 + [1]*100)
        const threshold = 156;
        const input = new Float32Array(width * height);
        
        for (let i = 0; i < width * height; i++) {
            const r = data[i * 4];
            const g = data[i * 4 + 1];
            const b = data[i * 4 + 2];
            // 灰度转换
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            // 阈值处理
            input[i] = gray > threshold ? 1.0 : 0.0;
        }
        
        return input;
    }

    // 后处理 - 只支持26个字母 (a-z)
    function postprocess(output) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        const captchaLength = 5;
        const numClasses = chars.length;
        
        // 输出形状应该是 [1, 5, 26]
        const logits = output.output.data;
        
        for (let i = 0; i < captchaLength; i++) {
            let maxIdx = 0;
            let maxVal = -Infinity;
            
            for (let j = 0; j < numClasses; j++) {
                // 每个字符的logits是分开的
                const idx = i * numClasses + j;
                if (logits[idx] > maxVal) {
                    maxVal = logits[idx];
                    maxIdx = j;
                }
            }
            result += chars[maxIdx];
        }
        return result;
    }

    // 本地 ONNX 模型识别
    async function recognizeWithONNX(captchaImage) {
        console.log('[jAccount] 开始 ONNX 模型识别...');
        
        try {
            await loadONNXRuntime();
            await loadModel();
            
            const inputData = preprocessImage(captchaImage);
            console.log('[jAccount] 输入数据形状:', inputData.length);
            
            // 创建输入 tensor - 形状 [1, 1, 64, 64]
            const inputTensor = new ort.Tensor('float32', inputData, [1, 1, 64, 64]);
            
            console.log('[jAccount] 执行推理...');
            const output = await session.run({ input: inputTensor });
            
            console.log('[jAccount] 输出:', output);
            const result = postprocess(output);
            console.log('[jAccount] 识别结果:', result);
            
            return result;
        } catch (e) {
            console.error('[jAccount] ONNX 识别失败:', e);
            throw e;
        }
    }

    // 远程识别 (GM_xmlHttpRequest)
    function sendRequest(url, formData) {
        return new Promise((resolve, reject) => {
            if (typeof GM_xmlHttpRequest !== 'undefined') {
                GM_xmlHttpRequest({
                    url: url,
                    method: 'POST',
                    data: formData,
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            resolve(response.responseText);
                        } else {
                            reject(new Error('HTTP ' + response.status));
                        }
                    },
                    onerror: function(error) {
                        reject(error);
                    },
                    ontimeout: function() {
                        reject(new Error('Request timeout'));
                    }
                });
            } else {
                reject(new Error('GM_xmlHttpRequest not available'));
            }
        });
    }
    
    // ============ 主逻辑 ============
    async function recognize() {
        const captchaInput = getElement(CONFIG.captchaInputSelector);
        const captchaImage = getElement(CONFIG.captchaImageSelector);
        
        if (!captchaImage || !captchaInput) {
            console.error('[jAccount] 找不到验证码元素');
            return;
        }
        
        try {
            captchaInput.placeholder = '正在识别...';
            
            let result;
            try {
                // 优先使用 ONNX 模型识别
                result = await recognizeWithONNX(captchaImage);
            } catch (onnxError) {
                console.warn('[jAccount] ONNX 识别失败，使用 Tesseract 备用:', onnxError);
                // 备用: 使用 Tesseract
                result = await recognizeWithTesseract(captchaImage);
            }
            
            // 填充结果
            captchaInput.value = result;
            captchaInput.spellcheck = false;
            
            console.log('[jAccount] 识别成功:', result);
            
        } catch (e) {
            console.error('[jAccount] 识别失败:', e);
            captchaInput.placeholder = '识别失败，请手动输入';
        }
    
    function doRecognize() {
        const captchaImage = getElement(CONFIG.captchaImageSelector);
        const captchaInput = getElement(CONFIG.captchaInputSelector);
        
        if (!captchaImage || !captchaInput) return;
        
        captchaImage.style.display = 'none';
        captchaInput.value = '';
        captchaInput.focus();
        
        // 随机滤镜
        const hue = Math.random();
        const saturation = Math.random() + 0.5;
        captchaImage.style.filter = `hue-rotate(${hue}turn) saturate(${saturation}) blur(0.5px)`;
        
        // 等待图片加载
        const checkInterval = setInterval(() => {
            if (captchaImage.complete) {
                clearInterval(checkInterval);
                captchaInput.placeholder = '正在识别';
                captchaImage.style.display = '';
                recognize();
            }
        }, 50);
        
        // 超时保护
        setTimeout(() => {
            clearInterval(checkInterval);
            if (captchaInput.placeholder === '正在识别') {
                captchaInput.placeholder = '识别超时，请手动输入';
            }
        }, CONFIG.timeout);
    }
    
    // ============ 初始化 ============
    ready(() => {
        const captchaImage = getElement(CONFIG.captchaImageSelector);
        
        if (!captchaImage) {
            console.log('[jAccount] 未找到验证码图片');
            return;
        }
        
        console.log('[jAccount] 初始化完成, 开始识别...');
        
        // 隐藏原来的元素
        const captchaBox = getElement('#captcha-box');
        const operateButtons = getElement('#operate-buttons');
        const loginForm = getElement('#login-form');
        
        if (captchaBox) captchaBox.style.overflow = 'hidden';
        if (operateButtons) operateButtons.style.display = '';
        
        // 立即执行识别
        doRecognize();
        
        // 拦截刷新验证码
        if (typeof refreshCaptcha === 'function') {
            window.refreshCaptcha = function() {
                refreshCaptcha();
                doRecognize();
            };
        }
    });
    
})();
