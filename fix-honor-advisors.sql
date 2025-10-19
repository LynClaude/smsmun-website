-- 修复荣誉顾问数据 - 在Supabase SQL Editor中运行

-- 1. 检查当前数据状态
SELECT 'Current Data Status' as info;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_advisors FROM honor_advisors;
SELECT COUNT(*) as approved_advisors FROM honor_advisors WHERE status = 'approved';

-- 2. 插入测试用户（如果不存在）
INSERT INTO users (id, username, email, is_alumni, is_honor_advisor, graduation_year, is_admin, join_date)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Claude', 'claude@example.com', true, true, '2023', false, NOW())
ON CONFLICT (id) DO UPDATE SET
  is_honor_advisor = true,
  graduation_year = '2023';

-- 3. 插入荣誉顾问数据
INSERT INTO honor_advisors (
  id, user_id, name, email, graduation_year, position, achievements, 
  motivation, availability, additional_info, status, created_at
)
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Claude', 'claude@example.com', '2023', '技术顾问', 
   '在深中模联期间担任技术部长，负责网站开发和维护', 
   '希望为协会提供技术支持和指导', 
   '每周2-3小时，可参与线上指导会议', 
   '熟悉Web开发、数据库管理等技术领域', 
   'approved', NOW()),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '张三', 'zhangsan@example.com', '2022', '学术顾问', 
   '在模联领域有丰富经验，多次获得最佳代表奖', 
   '愿意分享模联经验和学术见解', 
   '每周1-2小时，可参与培训活动', 
   '专长于国际关系、外交谈判等领域', 
   'approved', NOW())
ON CONFLICT (id) DO UPDATE SET
  status = 'approved';

-- 4. 验证结果
SELECT 'Final Results' as info;
SELECT name, email, status, created_at FROM honor_advisors WHERE status = 'approved' ORDER BY created_at DESC;
