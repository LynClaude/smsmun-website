// 检查用户状态的脚本
// 在浏览器控制台中运行

async function checkUserStatus() {
  const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
  
  const supabaseUrl = 'https://your-project.supabase.co'; // 替换为实际的URL
  const supabaseKey = 'your-anon-key'; // 替换为实际的anon key
  
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
    
    console.log('当前用户:', user);
    
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
    
    console.log('用户数据:', userData);
    
    // 检查荣誉顾问申请状态
    const { data: honorData, error: honorError } = await supabase
      .from('honor_advisors')
      .select('*')
      .eq('user_id', user.id);
    
    if (honorError) {
      console.error('查询荣誉顾问数据错误:', honorError);
      return;
    }
    
    console.log('荣誉顾问申请数据:', honorData);
    
  } catch (error) {
    console.error('检查用户状态时出错:', error);
  }
}

// 运行检查
checkUserStatus();
