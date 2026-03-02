# jAccount 验证码自动识别 | jAccount Captcha Auto-Recognizer

> 基于 [jAccount 验证码在线](https://greasyfork.org/zh-CN/scripts/432645-jaccount-验证码在线-resnet-高速高精度毫秒级识别) 修改而来

[English](#english) | [中文](#中文)

---

## 快速开始 | Quick Start

### 中文

请查看 [QuickStart.md](./QuickStart.md) 获取详细安装指南。

### English

See [QuickStart.md](./QuickStart.md) for detailed installation guide.

---

## 功能特性 | Features

### 中文

- 🚀 **自动识别** - 打开 jAccount 登录页面自动识别验证码
- 🍎 **完全兼容 Safari** - 纯原生 JavaScript，无需 jQuery
- 🔒 **安全可靠** - 仅在本地处理，不保存任何用户凭证
- 🎯 **精准快速** - 集成上海交通大学极客工作室识别服务

### English

- 🚀 **Auto Recognition** - Automatically recognizes captcha when opening jAccount login page
- 🍎 **Safari Compatible** - Pure native JavaScript, no jQuery required
- 🔒 **Secure & Reliable** - Local processing only, no user credentials saved
- 🎯 **Fast & Accurate** - Integrated with SJTU Geek Studio recognition service

---

## 支持的浏览器 | Supported Browsers

### 中文

- Tampermonkey（推荐 | Recommended）
- Greasemonkey
- Violentmonkey

**支持列表 | Supported List:**
- Chrome / Edge / Firefox / Safari

---

## 工作原理 | How It Works

### 中文

1. 用户访问 jAccount 登录页面
2. 脚本自动捕获验证码图片
3. 图片发送至 [极客工作室识别服务](https://geek.sjtu.edu.cn) 进行识别
4. 识别结果自动填入输入框

### English

1. User visits jAccount login page
2. Script automatically captures the captcha image
3. Image is sent to [Geek Studio Recognition Service](https://geek.sjtu.edu.cn) for recognition
4. Recognition result is automatically filled into the input field

---

## 注意事项 | Important Notes

### 中文

- ⚠️ 需要网络连接以访问识别服务
- ⚠️ 识别服务由 [上海交通大学极客工作室](https://geek.sjtu.edu.cn) 提供
- ⚠️ 本脚本仅供学习交流，请合理使用

### English

- ⚠️ Network connection required to access recognition service
- ⚠️ Recognition service provided by [SJTU Geek Studio](https://geek.sjtu.edu.cn)
- ⚠️ For educational purposes only, please use responsibly

---

## 许可证 | License

MIT License

---

## 贡献者 | Contributors

- [danyang685](https://github.com/danyang685)
