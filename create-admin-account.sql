-- 创建管理员账户
-- 在 Supabase SQL Editor 中运行此脚本

-- 创建管理员账户（如果不存在）
INSERT INTO users (username, email, password, is_alumni, graduation_year, is_admin) 
VALUES 
  ('管理员', 'admin@smsmun.com', 'smsmun2025', true, '2024', true)
ON CONFLICT (email) DO UPDATE SET
  username = EXCLUDED.username,
  password = EXCLUDED.password,
  is_admin = true;

-- 验证管理员账户是否创建成功
SELECT 
  username, 
  email, 
  is_alumni, 
  graduation_year, 
  is_admin,
  is_honor_advisor
FROM users 
WHERE email = 'admin@smsmun.com';

SELECT '管理员账户创建成功！现在可以使用用户名 admin 和密码 smsmun2025 登录管理员界面' as message;

