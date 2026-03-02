// ==UserScript==
// @name         jAccount 验证码识别 - 原生JS版 (无需jQuery)
// @name:en      jAccount Captcha Auto-Recognizer - Vanilla JS
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  jAccount验证码识别 - 纯原生JavaScript，完全兼容Safari
// @description:en jAccount captcha recognition - pure native JavaScript, fully compatible with Safari
// @author       danyang685
// @homepageURL  https://github.com/danyang685/JAccountVerificationCode
// @supportURL   https://github.com/danyang685/JAccountVerificationCode/issues
// @source       https://github.com/danyang685/JAccountVerificationCode
// @match        https://jaccount.sjtu.edu.cn/jaccount/jalogin*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmlJREFUWAntl8FKAzEQhv+zJWIXHbRjcXFwcHB00MnJ0cXF2c3R0cXF2dHJ0dHJ0dHRz/5LR0dHR+IKFAouWhTc7GZ3k5yT3WQPaYL+s5PdzPJm/pnRJBIYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAYDAeT7/f5XkqR+v/+TpunVbrf7NplM/k4mk/8Wi8XvhULhW7FY/F4qlb4Vi8VvhULha7FY/F4oFL4WCoXP+Xz+Uzab/ZDJZD5kMpkPyWTyQzKZ/JBIJD4kEokPiUTiXTwef4/H4+/h2HvY7e/D4fBbNBp9C4fDr6FQ6DUYCLz6fL5Xt9v9YrfbX+12+6vVan21Wq0vFovl2Ww2P5vN5kfz+fxorVYb7fP5/ov5fH5wMBgM9vv9/na73c1ms5u1Wm20xWL5L+bz+cHBwOBb8C34GnwOvgeTyeQ/1Gq10VardbRcLo/2er2Pfr//0ev1Prrd7ker1fpot9t/mUzm/2KxOB6LxUYbjcZot9sd7fV6H61W62OxWPyG3W4fTafTo+12+2M2m/0P1Gq10UajMToYDD663e5Ht9v96Ha7H91u96Pb7X50u92Pbrf70ePx/AdyuX+C2WwOsrOzs1csFgfZbHY4m80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ7DCbzQ6z2ewwm80Os9nsMJvNDrPZ5K7gYv0y+AAAAAASUVORK5CYII=
// @grant        GM_xmlHttpRequest
// @run-at       document-end
// @connect      geek.sjtu.edu.cn
// @connect      *
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    
    // ============ 配置 ============
    const CONFIG = {
        captchaInputSelector: '#input-login-captcha',
        captchaImageSelector: '#captcha-img',
        captchaSolverUrl: 'https://geek.sjtu.edu.cn/captcha-solver/',
        timeout: 15000
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
    // 发送请求 - 优先使用 GM_xmlHttpRequest 绕过 CORS
    function sendRequest(url, formData) {
        return new Promise((resolve, reject) => {
            console.log('[jAccount] sendRequest 被调用, GM_xmlHttpRequest 可用:', typeof GM_xmlHttpRequest !== 'undefined');
            
            // 优先使用 GM_xmlHttpRequest (Tampermonkey 内置，可跨域)
            if (typeof GM_xmlHttpRequest !== 'undefined') {
                console.log('[jAccount] 使用 GM_xmlHttpRequest 发送请求');
                GM_xmlHttpRequest({
                    url: url,
                    method: 'POST',
                    data: formData,
                    onload: function(response) {
                        console.log('[jAccount] GM_xmlHttpRequest 响应状态:', response.status);
                        if (response.status >= 200 && response.status < 300) {
                            resolve(response.responseText);
                        } else {
                            reject(new Error('HTTP ' + response.status));
                        }
                    },
                    onerror: function(error) {
                        console.error('[jAccount] GM_xmlHttpRequest 错误:', error);
                        reject(error);
                    },
                    ontimeout: function() {
                        reject(new Error('Request timeout'));
                    }
                });
                return;
            }
            
            console.log('[jAccount] GM_xmlHttpRequest 不可用，使用 fetch (可能会有 CORS 问题)');
            // 备用方案: fetch (可能会有 CORS 问题)
            fetch(url, {
                method: 'POST',
                body: formData,
                mode: 'cors'
            })
            .then(response => {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.text();
            })
            .then(resolve)
            .catch(reject);
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
            // 获取图片
            const dataURL = await getImageBase64(captchaImage);
            
            // 转换为 Blob
            const blob = await fetch(dataURL).then(r => r.blob());
            const formData = new FormData();
            formData.append('image', new File([blob], 'captcha.jpg', { type: 'image/jpeg' }));
            
            // 发送请求
            captchaInput.placeholder = '正在识别...';
            const responseText = await sendRequest(CONFIG.captchaSolverUrl, formData);
            const result = JSON.parse(responseText);
            
            // 填充结果
            captchaInput.value = result.result;
            captchaInput.spellcheck = false;
            
            console.log('[jAccount] 识别成功:', result.result);
            
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
