-- 确保数据库有测试数据
-- 在 Supabase SQL Editor 中运行此脚本

-- 1. 确保用户表有测试数据
INSERT INTO users (id, username, email, password, is_alumni, graduation_year, is_admin, is_honor_advisor, join_date)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', '张三', 'zhangsan@example.com', 'password123', true, '2022', false, false, NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', '李四', 'lisi@example.com', 'password123', true, '2021', false, true, NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', '王五', 'wangwu@example.com', 'password123', true, '2023', false, false, NOW())
ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  is_honor_advisor = EXCLUDED.is_honor_advisor;

-- 2. 确保留言表有测试数据
INSERT INTO messages (id, user_id, content, created_at)
VALUES 
  ('msg-001', '550e8400-e29b-41d4-a716-446655440001', '学到知识,交到朋友,玩的开心~', '2025-10-19T19:24:23.000Z'),
  ('msg-002', '550e8400-e29b-41d4-a716-446655440002', '是的是的!', '2025-10-19T12:30:58.000Z'),
  ('msg-003', '550e8400-e29b-41d4-a716-446655440003', 'www.smsmun.cn太棒了!', '2025-10-18T16:53:34.000Z')
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content;

-- 3. 确保问题表有测试数据
INSERT INTO questions (id, user_id, title, content, created_at)
VALUES 
  ('q-001', '550e8400-e29b-41d4-a716-446655440001', '如何提高模联技能？', '作为新手，想了解如何快速提升模联技能', '2025-10-19T10:00:00.000Z'),
  ('q-002', '550e8400-e29b-41d4-a716-446655440002', '模联会议准备', '参加模联会议需要做哪些准备？', '2025-10-18T15:30:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- 4. 确保回答表有测试数据
INSERT INTO answers (id, question_id, user_id, content, created_at)
VALUES 
  ('a-001', 'q-001', '550e8400-e29b-41d4-a716-446655440002', '多参加练习会议，熟悉议事规则', '2025-10-19T11:00:00.000Z'),
  ('a-002', 'q-002', '550e8400-e29b-41d4-a716-446655440003', '提前了解议题背景，准备立场文件', '2025-10-18T16:00:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content;

-- 5. 确保荣誉顾问表有测试数据
INSERT INTO honor_advisors (id, user_id, name, email, graduation_year, position, achievements, motivation, status, created_at)
VALUES 
  ('ha-001', '550e8400-e29b-41d4-a716-446655440002', '李四', 'lisi@example.com', '2021', '学术顾问', '多次获得最佳代表奖', '希望分享经验', 'approved', NOW())
ON CONFLICT (id) DO UPDATE SET
  status = 'approved';

-- 6. 验证数据
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Messages', COUNT(*) FROM messages
UNION ALL
SELECT 'Questions', COUNT(*) FROM questions
UNION ALL
SELECT 'Answers', COUNT(*) FROM answers
UNION ALL
SELECT 'Honor Advisors', COUNT(*) FROM honor_advisors;

-- 7. 显示用户名映射测试
SELECT 
  m.id as message_id,
  m.content,
  u.username,
  u.is_honor_advisor,
  u.is_alumni
FROM messages m
LEFT JOIN users u ON m.user_id = u.id
ORDER BY m.created_at DESC
LIMIT 5;




