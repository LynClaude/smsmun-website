-- 重建荣誉顾问申请表以确保所有字段都存在
-- 在 Supabase 的 SQL 编辑器中运行这些命令

-- 首先删除现有的荣誉顾问表（如果存在）
DROP TABLE IF EXISTS honor_advisors CASCADE;

-- 重新创建荣誉顾问申请表
CREATE TABLE honor_advisors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  wechat TEXT,
  graduation_year TEXT NOT NULL,
  position TEXT NOT NULL,
  achievements TEXT NOT NULL,
  motivation TEXT NOT NULL,
  availability TEXT,
  additional_info TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- 为所有表启用行级安全策略
ALTER TABLE honor_advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE honor_advisor_committee ENABLE ROW LEVEL SECURITY;

-- 创建策略（允许所有人读取和写入，生产环境应该更严格）
CREATE POLICY "Allow all operations on honor_advisors" ON honor_advisors FOR ALL USING (true);
CREATE POLICY "Allow all operations on honor_advisor_committee" ON honor_advisor_committee FOR ALL USING (true);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_honor_advisors_user_id ON honor_advisors(user_id);
CREATE INDEX IF NOT EXISTS idx_honor_advisors_status ON honor_advisors(status);
CREATE INDEX IF NOT EXISTS idx_users_is_honor_advisor ON users(is_honor_advisor);
