# 永不离开的支教老师 (NLteachers)

<div align="center">
    <img src="frontend/static/images/common/logo.png" alt="Logo" width="200">
</div>

## 项目简介

这是一款面向偏远地区留守儿童的微信小程序，接入专门为留守儿童设计的智能体，完成陪伴和智能辅导的需求，弥补支教老师稀缺，师资力量不足的问题。同时关注孩子们的心理健康，提供专业的情感疏导和生活指导，让留守儿童也能公平的享受人工智能带给人们的温暖和帮助。

## 目标人群

- 偏远山区的留守儿童及其家长
- 师资力量不足的希望工程小学
- 需要情感关怀和生活指导的儿童

## 主要功能

### 🎯 核心功能
- 智慧学伴：提供个性化学习辅导
- 成长帮手：协助日常生活指导
- 趣味玩伴：激发学习兴趣的教育游戏
- 知心小鹿：提供心理咨询和情感支持

### 🤝 辅助功能
其中部分智能体，也可以为教师提供辅助功能
- 支教老师助手
  - 教学辅助工具
  - 班级管理帮手
  - 学生进度跟踪

### 🌟 平台价值
为了给留守儿童提供更多的帮助，未来我们也致力于:
- 链接社会爱心人士
- 对接偏远地区学校
- 服务留守儿童群体
- 技术赋能公益事业

## 技术栈

### 前端
- 框架：uni-app
- UI组件：FirstUI
- 开发语言：Vue.js、JavaScript
- 开发工具：HBuilderX

### 后端
- 开发语言：TypeScript、Node.js
- 框架：TSRPC
- 数据库：MySQL (Prisma ORM)
- 缓存：Redis

## 项目结构

```
NLteachers/
├── frontend/                 # 前端目录
│   ├── pages/               # 页面文件
│   │   ├── index/          # 首页（消息列表）
│   │   ├── chat/           # 聊天页面
│   │   ├── agents/         # 智能体页面
│   │   ├── my/             # 个人中心
│   │   └── login/          # 登录页面
│   ├── components/         # 组件文件夹
│   │   └── firstui/       # UI组件库
│   ├── static/            # 静态资源
│   │   ├── images/        # 图片资源
│   │   └── styles/        # 样式文件
│   ├── store/             # 状态管理
│   ├── utils/             # 工具函数
│   ├── src/              # 源代码
│   │   └── shared/       # 共享代码
│   ├── App.vue           # 应用入口
│   ├── main.js           # 主入口文件
│   ├── manifest.json     # 应用配置
│   └── pages.json        # 页面配置
│
└── backend/                 # 后端目录
    ├── src/               # 源代码
    │   ├── api/          # API接口
    │   ├── models/       # 数据模型
    │   ├── services/     # 业务逻辑
    │   └── shared/       # 共享代码
    ├── prisma/           # 数据库相关
    │   └── schema.prisma # 数据库模型
    ├── test/             # 测试文件
    ├── .env              # 环境变量
    └── tsrpc.config.ts   # TSRPC配置
```

## 开始使用

1. 环境准备
```bash
# 确保安装了以下工具
- Node.js >= 16
- pnpm
- HBuilderX
- MySQL
- Redis
```

2. 克隆项目
```bash
git clone https://github.com/xuelinf/NLteachers.git
cd NLteachers
```

3. 前端启动
```bash
cd frontend
pnpm install
# 使用HBuilderX打开项目并运行
```

4. 后端启动
```bash
cd backend
pnpm install
pnpm run dev
```

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

## 联系方式

- 项目维护者：xuelinf
- GitHub：[https://github.com/xuelinf/NLteachers](https://github.com/xuelinf/NLteachers)

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
