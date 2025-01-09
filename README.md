# 永不离开的支教老师 (NLteachers)

<div align="center">
    <img src="static/images/common/logo.png" alt="Logo" width="200">
</div>

## 项目简介

"永不离开的支教老师"是一个基于uni-app开发的跨平台教育应用，旨在为支教老师和学生提供持续的在线教育支持。通过智能对话系统和趣味性的教育游戏，让教育资源得以延续，让知识传递永不停歇。

## 主要功能

### 🎯 核心功能
- 智能对话系统
  - 实时聊天功能
  - 成语接龙游戏
  - 智能教学辅导

### 👥 社交功能
- 我的好友
- 联系人管理
- 个人中心

### 🛠 其他功能
- 消息通知
- 设置中心
- 多平台适配

## 技术栈

- 框架：uni-app
- UI组件：FirstUI
- 开发语言：Vue.js、JavaScript
- 开发工具：HBuilderX

## 项目结构

```
NLteachers/
├── frontend/         # 前端目录
│   ├── pages/        # 页面文件
│   │   ├── chat/     # 聊天相关页面
│   │   ├── contacts/ # 联系人页面
│   │   ├── my/       # 个人中心
│   │   └── index/    # 首页
│   ├── components/   # 组件文件夹
│   ├── static/       # 静态资源
│   └── common/       # 公共文件
└── backend/          # 后端目录
```

## 开始使用

1. 环境准备
```bash
# 确保安装了 HBuilderX
# Node.js 版本 >= 12
```

2. 克隆项目
```bash
git clone https://github.com/xuelinf/NLteachers.git
cd NLteachers
```

3. 运行项目
- 前端
  - 使用 HBuilderX 导入前端项目
  - 点击运行到浏览器/模拟器/真机
- 后端
  - `npm run dev` 运行本地开发服务器
  - `npm run build` 执行构建
  - `npm run doc` 生成 API 接口文档

## 预览

支持的平台：
- Android
- iOS
- H5
- 小程序（微信/支付宝）

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 版本历史

- v1.0.0 (2025-01-03)
  - 初始版本发布
  - 实现基础聊天功能
  - 添加成语接龙游戏

## 联系方式

- 项目维护者：xuelinf
- GitHub：[https://github.com/xuelinf/NLteachers](https://github.com/xuelinf/NLteachers)

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
