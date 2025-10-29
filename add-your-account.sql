-- 添加您的账号
-- 在 Supabase SQL Editor 中运行此脚本

-- 只更新密码，保留其他所有数据
UPDATE users 
SET password = 'Lyn_Claude15',
    username = '甘楚涵'
WHERE email = 'smsmun.ganch@outlook.com';

-- 如果用户不存在，则创建
INSERT INTO users (username, email, password, is_alumni, graduation_year, is_admin) 
VALUES 
  ('甘楚涵', 'smsmun.ganch@outlook.com', 'Lyn_Claude15', true, '2024', false)
ON CONFLICT (email) DO NOTHING;

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
