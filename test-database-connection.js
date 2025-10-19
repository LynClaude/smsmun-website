// 测试数据库连接的脚本
// 在浏览器控制台中运行

async function testDatabaseConnection() {
  console.log('=== 开始测试数据库连接 ===');
  
  try {
    // 使用您的Supabase配置
    const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
    
    // 从环境变量获取配置（在浏览器中可能无法直接访问，所以我们需要硬编码）
    const supabaseUrl = 'https://xjeqpsicutiwkxjoqvls.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZXFwc2ljdXRpd2t4am9xdmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjIzNjAsImV4cCI6MjA3NjI5ODM2MH0.h1qlkDGz9twJjKxR8ov8v5Hknm_kASyIhsph-aAIAY4';
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Supabase客户端已创建');
    
    // 测试1: 基本连接
    console.log('\n1. 测试基本连接...');
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);
    
    if (usersError) {
      console.error('❌ 连接测试失败:', usersError);
      return;
    }
    
    console.log('✅ Supabase连接正常');
    
    // 测试2: honor_advisors表
    console.log('\n2. 测试honor_advisors表...');
    const { data: honorData, error: honorError } = await supabase
      .from('honor_advisors')
      .select('*')
      .limit(10);
    
    if (honorError) {
      console.error('❌ honor_advisors表查询失败:', honorError);
      console.log('可能的原因:');
      console.log('- 表不存在');
      console.log('- 表名拼写错误');
      console.log('- 权限问题');
      return;
    }
    
    console.log('✅ honor_advisors表存在');
    console.log('表数据:', honorData);
    console.log('数据数量:', honorData?.length || 0);
    
    // 测试3: 状态查询
    console.log('\n3. 测试状态查询...');
    const { data: statusData, error: statusError } = await supabase
      .from('honor_advisors')
      .select('status')
      .limit(10);
    
    if (statusError) {
      console.error('❌ 状态查询失败:', statusError);
    } else {
      console.log('✅ 状态查询成功');
      console.log('所有状态:', statusData?.map(item => item.status));
    }
    
    // 测试4: 已批准查询
    console.log('\n4. 测试已批准查询...');
    const { data: approvedData, error: approvedError } = await supabase
      .from('honor_advisors')
      .select('*')
      .eq('status', 'approved');
    
    if (approvedError) {
      console.error('❌ 已批准查询失败:', approvedError);
    } else {
      console.log('✅ 已批准查询成功');
      console.log('已批准数据:', approvedData);
      console.log('已批准数量:', approvedData?.length || 0);
    }
    
    // 测试5: 插入测试数据
    console.log('\n5. 测试插入数据...');
    const testInsertData = {
      user_id: 'test-user-id',
      name: '测试顾问',
      email: 'test@example.com',
      phone: '13800138000',
      wechat: 'test_wx',
      graduation_year: '2023',
      position: '测试顾问',
      achievements: '这是一个测试数据',
      motivation: '测试动机',
      availability: '每周1小时',
      additional_info: '测试附加信息',
      status: 'approved'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('honor_advisors')
      .insert([testInsertData])
      .select();
    
    if (insertError) {
      console.error('❌ 插入测试失败:', insertError);
    } else {
      console.log('✅ 插入测试成功');
      console.log('插入的数据:', insertData);
      
      // 删除测试数据
      if (insertData && insertData.length > 0) {
        const { error: deleteError } = await supabase
          .from('honor_advisors')
          .delete()
          .eq('id', insertData[0].id);
        
        if (deleteError) {
          console.error('删除测试数据失败:', deleteError);
        } else {
          console.log('✅ 测试数据已清理');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ 测试过程中出错:', error);
  }
  
  console.log('\n=== 测试完成 ===');
}

// 运行测试
testDatabaseConnection();
