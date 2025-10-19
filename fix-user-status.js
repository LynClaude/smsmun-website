// 修复用户状态的脚本
// 在浏览器控制台中运行

async function fixUserStatus() {
  const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
  
  // 请替换为您的实际Supabase URL和密钥
  const supabaseUrl = 'https://your-project.supabase.co';
  const supabaseKey = 'your-anon-key';
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // 检查当前用户
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('认证错误:', authError);
      return;
    }
    
    if (!user) {
      console.log('用户未登录');
      return;
    }
    
    console.log('当前用户:', user.email);
    
    // 检查用户表中的状态
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (userError) {
      console.error('查询用户数据错误:', userError);
      return;
    }
    
    console.log('当前用户状态:', userData);
    
    // 检查是否有批准的荣誉顾问申请
    const { data: honorData, error: honorError } = await supabase
      .from('honor_advisors')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'approved');
    
    if (honorError) {
      console.error('查询荣誉顾问数据错误:', honorError);
      return;
    }
    
    console.log('荣誉顾问申请数据:', honorData);
    
    // 如果有批准的申请但用户状态不是荣誉顾问，则更新状态
    if (honorData && honorData.length > 0 && !userData.is_honor_advisor) {
      console.log('发现批准的申请，正在更新用户状态...');
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          is_honor_advisor: true,
          honor_advisor_approved_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) {
        console.error('更新用户状态失败:', updateError);
      } else {
        console.log('用户状态已更新为荣誉顾问！请刷新页面查看效果。');
      }
    } else if (!honorData || honorData.length === 0) {
      console.log('没有找到批准的荣誉顾问申请');
    } else {
      console.log('用户状态已经是荣誉顾问');
    }
    
  } catch (error) {
    console.error('修复用户状态时出错:', error);
  }
}

// 运行修复
fixUserStatus();
