// ==UserScript==
// @name         jAccount 验证码识别 - 原生JS版 (无需jQuery)
// @name:en      jAccount Captcha Auto-Recognizer - Vanilla JS
// @namespace    http://tampermonkey.net/
// @version      2.1
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
// @license      MIT
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
    // 本地 OCR 识别 (使用 Tesseract.js)
    async function recognizeWithTesseract(captchaImage) {
        console.log('[jAccount] 开始本地 OCR 识别...');
        
        // 获取图片 Base64
        const dataURL = await getImageBase64(captchaImage);
        
        // 动态加载 Tesseract.js
        if (!window.Tesseract) {
            console.log('[jAccount] 加载 Tesseract.js...');
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/tesseract.js@5/dist/tesseract.min.js';
                script.onload = resolve;
                script.onerror = () => reject(new Error('Tesseract.js 加载失败'));
                document.head.appendChild(script);
            });
        }
        
        console.log('[jAccount] 执行 OCR 识别...');
        const result = await Tesseract.recognize(dataURL, 'eng+chi_sim', {
            logger: m => console.log('[jAccount] OCR:', m.status, (m.progress * 100).toFixed(0) + '%')
        });
        
        // 清理结果：只保留数字和字母
        const text = result.data.text.replace(/[^a-zA-Z0-9]/g, '');
        console.log('[jAccount] OCR 原始结果:', result.data.text, '-> 清理后:', text);
        return text;
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
            captchaInput.placeholder = '正在OCR识别...';
            
            // 使用本地 Tesseract.js 进行 OCR 识别
            const result = await recognizeWithTesseract(captchaImage);
            
            // 填充结果
            captchaInput.value = result;
            captchaInput.spellcheck = false;
            
            console.log('[jAccount] 识别成功:', result);
            
        } catch (e) {
            console.error('[jAccount] 识别失败:', e);
            captchaInput.placeholder = '识别失败，请手动输入';
        }
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
