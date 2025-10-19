-- 直接插入荣誉顾问数据
-- 在 Supabase SQL Editor 中运行

-- 首先确保用户表中有测试用户
INSERT INTO users (id, username, email, is_alumni, is_honor_advisor, graduation_year, is_admin, join_date)
VALUES 
  ('claude-user-id', 'Claude', 'claude@example.com', true, true, '2023', false, NOW())
ON CONFLICT (id) DO UPDATE SET
  is_honor_advisor = true,
  graduation_year = '2023';

-- 插入荣誉顾问数据
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
)
VALUES 
  (
    'claude-advisor-1', 
    'claude-user-id', 
    'Claude', 
    'claude@example.com', 
    '13800138000', 
    'claude_wechat', 
    '2023', 
    '技术顾问', 
    '在深中模联期间担任技术部长，负责网站开发和维护，具有丰富的技术经验', 
    '希望为协会提供技术支持和指导，传承模联精神', 
    '每周2-3小时，可参与线上指导会议', 
    '熟悉Web开发、数据库管理等技术领域', 
    'approved', 
    NOW()
  ),
  (
    'test-advisor-2', 
    'claude-user-id', 
    '张三', 
    'zhangsan@example.com', 
    '13800138001', 
    'zhangsan_wechat', 
    '2022', 
    '学术顾问', 
    '在模联领域有丰富经验，多次获得最佳代表奖，具备优秀的学术指导能力', 
    '愿意分享模联经验和学术见解，帮助新成员成长', 
    '每周1-2小时，可参与培训活动', 
    '专长于国际关系、外交谈判等领域', 
    'approved', 
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  status = 'approved';

-- 验证插入结果
SELECT '插入结果验证' as info;
SELECT name, email, status, created_at FROM honor_advisors WHERE status = 'approved';
