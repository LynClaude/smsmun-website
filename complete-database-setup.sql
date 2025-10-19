-- 完整的数据库设置脚本
-- 在 Supabase SQL Editor 中运行

-- 1. 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_alumni BOOLEAN DEFAULT false,
  graduation_year TEXT,
  is_admin BOOLEAN DEFAULT false,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_honor_advisor BOOLEAN DEFAULT false,
  honor_advisor_approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建消息表
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  contact TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建问题表
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  author TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建答案表
CREATE TABLE IF NOT EXISTS answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  answer TEXT NOT NULL,
  author TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 创建荣誉顾问申请表
CREATE TABLE IF NOT EXISTS honor_advisors (
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
  resignation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 创建反馈表
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feedback TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 启用行级安全策略
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE honor_advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- 8. 创建策略（允许所有人读取和写入，生产环境应该更严格）
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all operations on questions" ON questions FOR ALL USING (true);
CREATE POLICY "Allow all operations on answers" ON answers FOR ALL USING (true);
CREATE POLICY "Allow all operations on honor_advisors" ON honor_advisors FOR ALL USING (true);
CREATE POLICY "Allow all operations on feedbacks" ON feedbacks FOR ALL USING (true);

-- 9. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);
CREATE INDEX IF NOT EXISTS idx_users_is_alumni ON users(is_alumni);
CREATE INDEX IF NOT EXISTS idx_users_is_honor_advisor ON users(is_honor_advisor);
CREATE INDEX IF NOT EXISTS idx_honor_advisors_user_id ON honor_advisors(user_id);
CREATE INDEX IF NOT EXISTS idx_honor_advisors_status ON honor_advisors(status);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);

-- 10. 插入测试数据（可选）
-- 插入一个测试用户
INSERT INTO users (username, email, password, is_alumni, graduation_year, is_admin) 
VALUES ('admin', 'admin@smsmun.com', 'admin123', true, '2020', true)
ON CONFLICT (email) DO NOTHING;

-- 插入一个测试荣誉顾问申请
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
  status
) VALUES (
  (SELECT id FROM users WHERE email = 'admin@smsmun.com' LIMIT 1),
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
  'approved'
)
ON CONFLICT DO NOTHING;

-- 更新用户状态为荣誉顾问
UPDATE users 
SET is_honor_advisor = true, honor_advisor_approved_at = NOW()
WHERE email = 'claude@example.com' OR email = 'admin@smsmun.com';

-- 完成提示
SELECT 'Database setup completed successfully!' as message;
