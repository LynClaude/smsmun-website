-- 清理多余的荣誉顾问委员会表
-- 在 Supabase SQL Editor 中运行

-- 1. 检查两个表的数据
SELECT 'honor_advisors 表数据' as info;
SELECT name, email, status, created_at FROM honor_advisors WHERE status = 'approved' ORDER BY created_at DESC;

SELECT 'honor_advisor_committee 表数据' as info;
SELECT name, email, created_at FROM honor_advisor_committee ORDER BY created_at DESC;

-- 2. 删除多余的 honor_advisor_committee 表
-- 注意：这个表没有被使用，所有页面都在查询 honor_advisors 表
DROP TABLE IF EXISTS honor_advisor_committee CASCADE;

-- 3. 验证删除结果
SELECT '删除后的表列表' as info;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%honor%';
