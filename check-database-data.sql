-- 检查数据库数据的简单脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 检查用户表
SELECT 'Users table:' as info;
SELECT id, username, email, is_admin, is_alumni, is_honor_advisor 
FROM users 
LIMIT 10;

-- 2. 检查荣誉顾问表
SELECT 'Honor advisors table:' as info;
SELECT id, name, email, status, created_at 
FROM honor_advisors 
ORDER BY created_at DESC 
LIMIT 10;

-- 3. 检查已批准的荣誉顾问
SELECT 'Approved honor advisors:' as info;
SELECT id, name, email, status, created_at 
FROM honor_advisors 
WHERE status = 'approved'
ORDER BY created_at DESC;

-- 4. 检查用户状态
SELECT 'Users with honor advisor status:' as info;
SELECT id, username, email, is_honor_advisor, honor_advisor_approved_at 
FROM users 
WHERE is_honor_advisor = true;

-- 5. 统计信息
SELECT 'Statistics:' as info;
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM honor_advisors) as total_applications,
  (SELECT COUNT(*) FROM honor_advisors WHERE status = 'approved') as approved_applications,
  (SELECT COUNT(*) FROM users WHERE is_honor_advisor = true) as honor_advisors;
