# MeowTalk 🐱

一个现代化的AI聊天应用，提供智能对话、代码高亮、Markdown渲染等功能。

## 📖 项目简介

MeowTalk 是一个基于 React + Node.js 的全栈聊天应用，集成了AI对话功能，支持代码高亮显示、Markdown渲染、用户认证等特性。项目采用前后端分离架构，提供流畅的用户体验。

## ✨ 主要功能

### 🤖 AI 对话
- 智能AI对话功能
- 支持多轮对话
- 实时响应

### 💻 代码高亮
- 支持多种编程语言的语法高亮
- 自定义代码高亮主题
- 代码块复制功能

### 📝 Markdown 渲染
- 完整的Markdown支持
- 实时预览
- 安全的内容渲染

### 🔐 用户系统
- 用户注册和登录
- JWT身份验证
- 会话管理

### 💾 历史记录
- 对话历史保存
- 历史记录查看
- 卡片式历史展示

### 🎨 现代化UI
- 响应式设计
- 美观的界面
- 流畅的动画效果

## 🛠️ 技术栈

### 前端 (Frontend)
- **React 19** - 现代化的React框架
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **Ant Design** - 企业级UI组件库
- **React Router** - 客户端路由
- **Axios** - HTTP客户端
- **Markdown-it** - Markdown解析器
- **Highlight.js** - 代码语法高亮
- **DOMPurify** - XSS防护

### 后端 (Backend)
- **Node.js** - JavaScript运行时
- **Express.js** - Web应用框架
- **TypeScript** - 类型安全的JavaScript
- **MySQL** - 关系型数据库
- **JWT** - JSON Web Token认证
- **bcryptjs** - 密码加密
- **CORS** - 跨域资源共享
- **Cookie Parser** - Cookie解析

### 开发工具
- **pnpm** - 快速、节省磁盘空间的包管理器
- **ESLint** - 代码质量检查
- **Jest** - 单元测试框架
- **Nodemon** - 开发环境自动重启

## 📦 安装说明

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MySQL >= 8.0

### 快速开始

1. **克隆项目**
```bash
git clone git@github.com:Babytiann/MeowTalk.git
cd MeowTalk
```

2. **安装依赖**
```bash
# 安装根目录依赖
pnpm install

# 安装前端依赖
cd frontend
pnpm install

# 安装后端依赖
cd ../backend
pnpm install
```

3. **配置数据库**
```bash
# 在backend目录下创建.env文件
cp .env.example .env
```

编辑 `.env` 文件，配置数据库连接信息：
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=meowtalk
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

4. **启动开发服务器**
```bash
# 在项目根目录
pnpm start
```

这将同时启动前端和后端开发服务器：
- 前端: http://localhost:5173
- 后端: http://localhost:5927

## 🚀 使用指南

### 开发模式

```bash
# 启动完整开发环境
pnpm start

# 仅启动前端
cd frontend && pnpm dev

# 仅启动后端
cd backend && pnpm dev
```

### 构建生产版本

```bash
# 构建前端
cd frontend && pnpm build

# 构建后端
cd backend && pnpm build
```

### 代码检查

```bash
# 前端代码检查
cd frontend && pnpm lint

# 后端测试
cd backend && pnpm test
```

## 📁 项目结构

```
MeowTalk/
├── frontend/                 # 前端应用
│   ├── src/
│   │   ├── components/      # React组件
│   │   │   ├── Base/       # 基础布局组件
│   │   │   ├── Dialog/     # 对话相关组件
│   │   │   └── Sider/      # 侧边栏组件
│   │   ├── service/        # API服务
│   │   ├── style/          # 样式文件
│   │   ├── App.tsx         # 主应用组件
│   │   └── main.tsx        # 应用入口
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # 后端应用
│   ├── src/
│   │   ├── API/           # API路由
│   │   ├── Services/      # 业务服务
│   │   ├── ApiFunction/   # API功能函数
│   │   └── index.ts       # 服务器入口
│   └── package.json
├── package.json            # 根目录配置
└── README.md
```

## 🔧 配置说明

### 前端配置
- 开发服务器端口: 5173
- 构建输出目录: `frontend/dist`
- 支持热重载

### 后端配置
- 服务器端口: 5927
- 数据库: MySQL
- CORS配置: 支持本地开发和生产环境

### 环境变量
```env
# 数据库配置
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=meowtalk
DB_PORT=3306

# JWT配置
JWT_SECRET=your_jwt_secret

# 服务器配置
PORT=5927
NODE_ENV=development
```

## 🧪 测试

```bash
# 运行后端测试
cd backend && pnpm test

# 运行前端代码检查
cd frontend && pnpm lint
```

## 📝 API 文档

### 认证相关
- `POST /login` - 用户登录
- `POST /register` - 用户注册
- `POST /logout` - 用户登出

### 对话相关
- `POST /askai` - AI对话请求
- `GET /history` - 获取对话历史
- `GET /cardhistory` - 获取卡片式历史

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

⭐ 如果这个项目对你有帮助，请给它一个星标！ 