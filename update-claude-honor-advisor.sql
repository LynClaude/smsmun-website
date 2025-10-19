-- 更新Claude的荣誉顾问信息
-- 这个脚本会真正更新数据库中的信息，让所有人都能看到

-- 首先检查是否存在Claude的用户记录
-- 如果不存在，创建一个
INSERT INTO users (
  id, 
  username, 
  email, 
  is_alumni, 
  is_honor_advisor, 
  graduation_year, 
  is_admin, 
  honor_advisor_approved_at,
  created_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000', 
  'Claude', 
  'claude@example.com', 
  true, 
  true, 
  '2026', 
  false, 
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  is_honor_advisor = true,
  graduation_year = '2026',
  honor_advisor_approved_at = NOW();

-- 更新或插入荣誉顾问记录
INSERT INTO honor_advisors (
  id,
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
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'Claude',
  'claude@example.com',
  '13800138000',
  'claude_wechat',
  '2026',
  '秘书长',
  '在深中模联期间担任技术部长，负责网站开发和维护',
  '希望为协会发展贡献力量',
  '随时可参与指导',
  '技术专长，网站开发经验丰富',
  'approved',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  graduation_year = '2026',
  position = '秘书长',
  status = 'approved';

-- 删除测试数据（李华和王小明）
DELETE FROM honor_advisors WHERE name IN ('李华', '王小明');
DELETE FROM users WHERE username IN ('李华', '王小明');

-- 验证更新结果
SELECT 
  u.username,
  u.graduation_year,
  u.is_honor_advisor,
  ha.position,
  ha.status
FROM users u
LEFT JOIN honor_advisors ha ON u.id = ha.user_id
WHERE u.username = 'Claude';
