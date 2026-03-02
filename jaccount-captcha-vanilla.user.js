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
    
    async function recognize(captchaImage) {
        const captchaInput = getElement(CONFIG.captchaInputSelector);
        if (!captchaImage || !captchaInput) {
            console.error('[jAccount] Elements not found');
            return;
        }
        
        try {
            captchaInput.placeholder = '正在识别...';
            
            await loadTesseract();
            
            const dataURL = await getImageBase64(captchaImage);
            console.log('[jAccount] OCR识别中...');
            
            const result = await Tesseract.recognize(dataURL, 'eng', {
                logger: m => console.log('[jAccount] OCR:', m.status, (m.progress * 100).toFixed(0) + '%')
            });
            
            // 清理结果：只保留数字和字母
            const text = result.data.text.replace(/[^a-zA-Z0-9]/g, '');
            
            captchaInput.value = text;
            captchaInput.spellcheck = false;
            console.log('[jAccount] 识别成功:', text);
            
            // 自动聚焦到用户名输入框
            const usernameInput = getElement(CONFIG.usernameSelector);
            if (usernameInput) {
                usernameInput.focus();
            }
            
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
