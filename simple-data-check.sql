-- 简化的数据检查脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 检查用户表数据
SELECT 'Users Table' as info;
SELECT username, email, is_alumni, is_honor_advisor 
FROM users 
LIMIT 5;

-- 2. 检查荣誉顾问表数据
SELECT 'Honor Advisors Table' as info;
SELECT name, email, status, created_at 
FROM honor_advisors 
ORDER BY created_at DESC 
LIMIT 5;

-- 3. 统计信息
SELECT 'Statistics' as info;
SELECT 
  'Users' as table_name,
  COUNT(*) as total_count,
  SUM(CASE WHEN is_honor_advisor = true THEN 1 ELSE 0 END) as honor_advisors
FROM users
UNION ALL
SELECT 
  'Honor Advisors' as table_name,
  COUNT(*) as total_count,
  SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count
FROM honor_advisors;
