# Supabase 云端数据库设置指南

## 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 注册/登录账户
3. 点击 "New Project"
4. 填写项目信息：
   - Project Name: `smsmun-website`
   - Database Password: 设置一个强密码
   - Region: 选择离您最近的区域

## 2. 获取项目配置

1. 在项目仪表板中，点击左侧菜单的 "Settings" → "API"
2. 复制以下信息：
   - Project URL
   - anon/public key

## 3. 配置环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥
```

## 4. 设置数据库表

1. 在 Supabase 仪表板中，点击左侧菜单的 "SQL Editor"
2. 复制 `database-setup.sql` 文件中的所有内容
3. 粘贴到 SQL 编辑器中并运行

## 5. 更新代码

1. 将 `src/lib/auth-context.tsx` 重命名为 `src/lib/auth-context-local.tsx`
2. 将 `src/lib/auth-context-supabase.tsx` 重命名为 `src/lib/auth-context.tsx`
3. 更新 `src/app/layout.tsx` 中的导入（如果需要）

## 6. 测试

1. 运行 `npm run dev`
2. 测试用户注册、登录功能
3. 测试管理员面板查看用户功能

## 优势

- ✅ 真正的云端数据共享
- ✅ 实时数据同步
- ✅ 自动备份
- ✅ 可扩展性
- ✅ 安全性（生产环境可配置更严格的权限）

## 注意事项

- 当前设置为演示模式，所有用户都有读写权限
- 生产环境建议配置更严格的行级安全策略
- 密码应该使用哈希存储（可以使用 Supabase Auth）
- 建议启用 Supabase Auth 进行更安全的用户认证
