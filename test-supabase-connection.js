// 测试Supabase连接和数据的简单脚本
// 在浏览器控制台中运行

async function testSupabaseConnection() {
  console.log('=== 测试Supabase连接 ===');
  
  try {
    // 使用您的Supabase配置
    const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
    
    // 请替换为您的实际Supabase URL和密钥
    const supabaseUrl = 'https://your-project.supabase.co';
    const supabaseKey = 'your-anon-key';
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Supabase客户端已创建');
    
    // 测试基本连接
    console.log('1. 测试基本连接...');
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);
    
    if (testError) {
      console.error('连接测试失败:', testError);
      return;
    }
    
    console.log('✅ Supabase连接正常');
    
    // 测试honor_advisors表是否存在
    console.log('\n2. 测试honor_advisors表...');
    const { data: honorData, error: honorError } = await supabase
      .from('honor_advisors')
      .select('*')
      .limit(5);
    
    if (honorError) {
      console.error('honor_advisors表查询失败:', honorError);
      console.log('可能的原因:');
      console.log('- 表不存在');
      console.log('- 表名拼写错误');
      console.log('- 权限问题');
      return;
    }
    
    console.log('✅ honor_advisors表存在');
    console.log('表数据:', honorData);
    
    // 测试状态查询
    console.log('\n3. 测试状态查询...');
    const { data: statusData, error: statusError } = await supabase
      .from('honor_advisors')
      .select('status')
      .limit(10);
    
    if (statusError) {
      console.error('状态查询失败:', statusError);
    } else {
      console.log('所有状态:', statusData?.map(item => item.status));
    }
    
    // 测试已批准查询
    console.log('\n4. 测试已批准查询...');
    const { data: approvedData, error: approvedError } = await supabase
      .from('honor_advisors')
      .select('*')
      .eq('status', 'approved');
    
    if (approvedError) {
      console.error('已批准查询失败:', approvedError);
    } else {
      console.log('已批准数据:', approvedData);
      console.log('已批准数量:', approvedData?.length || 0);
    }
    
  } catch (error) {
    console.error('测试过程中出错:', error);
  }
  
  console.log('\n=== 测试完成 ===');
}

// 运行测试
testSupabaseConnection();
