-- 检查数据库状态的脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 检查表是否存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'honor_advisors', 'messages', 'questions', 'answers');

-- 2. 检查用户表数据
SELECT 
  username, 
  email, 
  is_alumni, 
  is_honor_advisor,
  honor_advisor_approved_at
FROM users 
LIMIT 5;

-- 3. 检查荣誉顾问表结构
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'honor_advisors' 
ORDER BY ordinal_position;

-- 4. 检查荣誉顾问表数据
SELECT 
  id,
  name, 
  email, 
  status, 
  created_at
FROM honor_advisors 
ORDER BY created_at DESC 
LIMIT 10;

-- 5. 统计信息
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

-- 6. 检查RLS策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename IN ('users', 'honor_advisors');
