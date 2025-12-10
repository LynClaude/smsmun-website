-- 添加退出原因字段到荣誉顾问表
ALTER TABLE honor_advisors 
ADD COLUMN IF NOT EXISTS resignation_reason TEXT;

-- 为退出申请添加新的状态
-- 确保 status 字段可以接受 'resigned' 值
-- 如果需要，可以添加约束
-- ALTER TABLE honor_advisors ADD CONSTRAINT check_status 
-- CHECK (status IN ('pending', 'approved', 'rejected', 'resigned'));
