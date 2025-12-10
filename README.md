# 深圳中学模拟联合国协会官方网站

深圳中学模拟联合国协会（SMSMUN）官方网站，提供协会信息、活动展示、校友交流等功能。

## 主要功能
- 用户认证系统
- 管理员面板与用户管理
- 校友论坛（仅限成员）
- 多语言支持（中文、英文、法文、西班牙文、俄文、阿拉伯文）
- 响应式设计

## 技术栈
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (数据库)

## 快速开始

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env.local` 文件，参考 `docs/setup/SETUP_ENV.md`

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm start
```

## 文档
- [环境配置指南](docs/setup/SETUP_ENV.md)
- [Supabase 设置](docs/setup/SUPABASE_SETUP.md)
- [数据库脚本](docs/database/)

## 项目结构
```
├── src/
│   ├── app/              # Next.js 应用页面
│   ├── components/       # React 组件
│   └── lib/             # 工具库和上下文
├── public/              # 静态资源
├── messages/            # 国际化翻译文件
└── docs/                # 项目文档
```
