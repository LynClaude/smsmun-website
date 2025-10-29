-- 添加您的账号
-- 在 Supabase SQL Editor 中运行此脚本

INSERT INTO users (username, email, password, is_alumni, graduation_year, is_admin, is_honor_advisor) 
VALUES 
  ('甘楚涵', 'smsmun.ganch@outlook.com', 'Lyn_Claude15', true, '2024', false, false)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  is_alumni = EXCLUDED.is_alumni,
  graduation_year = EXCLUDED.graduation_year;

-- 验证账号是否创建成功
SELECT 
  username, 
  email, 
  is_alumni, 
  graduation_year, 
  is_admin,
  is_honor_advisor
FROM users 
WHERE email = 'smsmun.ganch@outlook.com';

SELECT '账号创建成功！现在可以使用邮箱 smsmun.ganch@outlook.com 和密码 Lyn_Claude15 登录' as message;
