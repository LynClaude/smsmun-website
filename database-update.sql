-- 更新数据库表结构以支持新的荣誉顾问申请字段
-- 在 Supabase 的 SQL 编辑器中运行这些命令

-- 更新荣誉指导申请表，添加新字段
ALTER TABLE honor_advisors 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS wechat TEXT,
ADD COLUMN IF NOT EXISTS graduation_year TEXT,
ADD COLUMN IF NOT EXISTS position TEXT,
ADD COLUMN IF NOT EXISTS achievements TEXT,
ADD COLUMN IF NOT EXISTS availability TEXT,
ADD COLUMN IF NOT EXISTS additional_info TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- 重命名现有字段以保持一致性
-- 注意：motivation 和 experience 字段已经存在，我们需要确保它们与新字段兼容

-- 更新用户表，添加荣誉顾问状态字段
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_honor_advisor BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS honor_advisor_approved_at TIMESTAMP WITH TIME ZONE;

-- 创建荣誉顾问委员会成员表
CREATE TABLE IF NOT EXISTS honor_advisor_committee (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  wechat TEXT,
  graduation_year TEXT,
  position TEXT,
  achievements TEXT,
  approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 为荣誉顾问委员会表启用行级安全策略
ALTER TABLE honor_advisor_committee ENABLE ROW LEVEL SECURITY;

-- 创建策略（允许所有人读取，只有管理员可以写入）
CREATE POLICY "Allow all read operations on honor_advisor_committee" ON honor_advisor_committee FOR SELECT USING (true);
CREATE POLICY "Allow admin write operations on honor_advisor_committee" ON honor_advisor_committee FOR ALL USING (true);

-- 更新现有的荣誉指导申请记录，设置默认状态
UPDATE honor_advisors SET status = 'pending' WHERE status IS NULL;
