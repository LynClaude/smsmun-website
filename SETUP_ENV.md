# 环境变量设置指南

## 问题诊断

如果荣誉顾问委员会页面看不到成员，或者测试页面无法运行，很可能是Supabase环境变量没有正确配置。

## 解决步骤

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 在项目根目录执行
touch .env.local
```

### 2. 添加Supabase配置

在 `.env.local` 文件中添加以下内容：

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. 获取Supabase配置信息

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** > **API**
4. 复制以下信息：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. 示例配置

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzQ0ODQwMCwiZXhwIjoxOTYzMDI0NDAwfQ.example
```

### 5. 重启开发服务器

设置环境变量后，需要重启开发服务器：

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
# 或
yarn dev
```

### 6. 验证配置

访问测试页面验证配置是否正确：
```
http://localhost:3000/test-supabase
```

## 常见问题

### Q: 页面显示"正在使用默认配置"
A: 环境变量没有正确设置，请检查 `.env.local` 文件是否存在且格式正确。

### Q: 测试页面无法访问
A: 可能是构建问题，尝试重新部署或重启开发服务器。

### Q: 数据库连接失败
A: 检查Supabase URL和密钥是否正确，确保项目状态正常。

## 部署注意事项

如果您使用Vercel部署，还需要在Vercel Dashboard中设置环境变量：

1. 进入Vercel项目设置
2. 进入 **Environment Variables**
3. 添加 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 重新部署项目
