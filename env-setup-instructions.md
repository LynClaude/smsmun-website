# Supabase 环境变量设置说明

## 步骤1：创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 在项目根目录执行
touch .env.local
```

## 步骤2：获取Supabase配置信息

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** > **API**
4. 复制以下信息：
   - **Project URL** → 这是您的 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → 这是您的 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 步骤3：编辑.env.local文件

在 `.env.local` 文件中添加以下内容：

```env
NEXT_PUBLIC_SUPABASE_URL=您的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=您的anon密钥
```

## 步骤4：重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

## 步骤5：测试连接

访问测试页面验证配置：
```
http://localhost:3000/test-supabase
```

## 步骤6：设置数据库

如果连接成功，运行数据库脚本：

1. 登录Supabase Dashboard
2. 进入 **SQL Editor**
3. 运行 `database-rebuild.sql` 文件中的SQL命令

## 示例配置

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzQ0ODQwMCwiZXhwIjoxOTYzMDI0NDAwfQ.example
```

## 部署注意事项

如果您使用Vercel部署，还需要在Vercel Dashboard中设置环境变量：

1. 进入Vercel项目设置
2. 进入 **Environment Variables**
3. 添加 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 重新部署项目
