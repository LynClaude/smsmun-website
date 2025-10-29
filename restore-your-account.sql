-- 恢复您的账号数据
-- 在 Supabase SQL Editor 中运行此脚本

-- 1. 创建您的账号（甘楚涵）
INSERT INTO users (
  username, 
  email, 
  password, 
  is_alumni, 
  graduation_year, 
  is_admin, 
  is_honor_advisor,
  honor_advisor_approved_at
) VALUES (
  '甘楚涵',
  'smsmun.ganch@outlook.com', 
  'Lyn_Claude15', 
  true, 
  '2024', 
  false, 
  true,
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  username = EXCLUDED.username,
  is_honor_advisor = true;

-- 2. 创建荣誉顾问申请记录
INSERT INTO honor_advisors (
  user_id,
  name,
  email,
  phone,
  wechat,
  graduation_year,
  position,
  achievements,
  motivation,
  availability,
  additional_info,
  status,
  created_at
) VALUES (
  (SELECT id FROM users WHERE email = 'smsmun.ganch@outlook.com' LIMIT 1),
  '甘楚涵',
  'smsmun.ganch@outlook.com',
  '136-3156-3505',
  NULL,
  '2024',
  '秘书长',
  '在深中模联期间担任秘书长等重要职务',
  '希望继续为协会提供指导和支持',
  '根据需求',
  '荣誉顾问委员会成员',
  'approved',
  NOW()
)
ON CONFLICT DO NOTHING;

-- 3. 验证账号和荣誉顾问状态
SELECT 
  u.username,
  u.email,
  u.is_alumni,
  u.graduation_year,
  u.is_honor_advisor,
  u.honor_advisor_approved_at,
  ha.name as advisor_name,
  ha.position,
  ha.status as advisor_status
FROM users u
LEFT JOIN honor_advisors ha ON u.id = ha.user_id
WHERE u.email = 'smsmun.ganch@outlook.com';

SELECT '✅ 您的账号和荣誉顾问状态已恢复！' as message;
