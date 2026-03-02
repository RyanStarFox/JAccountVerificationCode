# 快速开始指南 | Quick Start Guide

## 中文

### 第一步：安装用户脚本管理器

在浏览器中安装 Tampermonkey 扩展：

- [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- [Tampermonkey for Safari](https://safari.tampermonkey.net/)

### 第二步：安装脚本

**方法 A：从 GitHub 安装（推荐）**

1. 打开 [jaccount-captcha-vanilla.user.js](./jaccount-captcha-vanilla.user.js)
2. 点击 "Raw" 按钮查看原始代码
3. Tampermonkey 会自动提示安装

**方法 B：手动安装**

1. 复制 `jaccount-captcha-vanilla.user.js` 的全部代码
2. 点击 Tampermonkey 图标 → "添加新脚本"
3. 粘贴代码并保存

### 第三步：使用

1. 打开 [jAccount 登录页面](https://jaccount.sjtu.edu.cn/jaccount/jalogin)
2. 脚本会自动识别验证码并填入输入框
3. 输入用户名和密码，登录即可

---

## English

### Step 1: Install a Userscript Manager

Install the Tampermonkey extension in your browser:

- [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- [Tampermonkey for Safari](https://safari.tampermonkey.net/)

### Step 2: Install the Script

**Method A: Install from GitHub (Recommended)**

1. Open [jaccount-captcha-vanilla.user.js](./jaccount-captcha-vanilla.user.js)
2. Click the "Raw" button to view raw code
3. Tampermonkey will prompt to install

**Method B: Manual Install**

1. Copy all code from `jaccount-captcha-vanilla.user.js`
2. Click Tampermonkey icon → "Add a new script"
3. Paste code and save

### Step 3: Usage

1. Open [jAccount Login Page](https://jaccount.sjtu.edu.cn/jaccount/jalogin)
2. Script will automatically recognize captcha and fill the input
3. Enter username and password, then login

---

## 常见问题 | FAQ

### Q: 识别失败怎么办？
### Q: What if recognition fails?

**中文**: 检查网络连接是否正常，识别服务可能有临时故障。可以手动刷新页面重试。

**English**: Check your network connection, the recognition service may have temporary issues. Try refreshing the page manually.

### Q: 支持哪些浏览器？
### Q: Which browsers are supported?

**中文**: Chrome、Firefox、Edge、Safari 等主流浏览器。

**English**: Chrome, Firefox, Edge, Safari and other major browsers.
