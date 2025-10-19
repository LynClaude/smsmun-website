-- 插入测试数据的简化脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 插入测试用户（如果不存在）
INSERT INTO users (username, email, password, is_alumni, graduation_year, is_admin, is_honor_advisor, honor_advisor_approved_at) 
VALUES 
  ('admin', 'admin@smsmun.com', 'admin123', true, '2020', true, false, null),
  ('Claude', 'claude@example.com', 'claude123', true, '2023', false, true, NOW())
ON CONFLICT (email) DO UPDATE SET
  is_honor_advisor = EXCLUDED.is_honor_advisor,
  honor_advisor_approved_at = EXCLUDED.honor_advisor_approved_at;

-- 2. 插入测试荣誉顾问申请（如果不存在）
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
  (SELECT id FROM users WHERE email = 'claude@example.com' LIMIT 1),
  'Claude',
  'claude@example.com',
  '13800138000',
  'claude_wx',
  '2023',
  '技术顾问',
  '在深中模联期间担任技术部长，负责网站开发和维护',
  '希望为协会提供技术支持和指导',
  '每周2-3小时',
  '熟悉React、Next.js等技术栈',
  'approved',
  NOW()
)
ON CONFLICT DO NOTHING;

-- 3. 确保用户状态正确
UPDATE users 
SET is_honor_advisor = true, honor_advisor_approved_at = NOW()
WHERE email = 'claude@example.com';

-- 4. 验证数据
SELECT 'Verification:' as info;
SELECT 
  u.username, 
  u.email, 
  u.is_honor_advisor, 
  u.honor_advisor_approved_at,
  ha.name as advisor_name,
  ha.status as advisor_status
FROM users u
LEFT JOIN honor_advisors ha ON u.id = ha.user_id
WHERE u.email IN ('admin@smsmun.com', 'claude@example.com');

SELECT 'Test data inserted successfully!' as message;
