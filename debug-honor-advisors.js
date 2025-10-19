// 调试荣誉顾问数据的脚本
// 在浏览器控制台中运行

async function debugHonorAdvisors() {
  console.log('=== 开始调试荣誉顾问数据 ===');
  
  // 使用您的Supabase配置
  const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
  
  // 请替换为您的实际Supabase URL和密钥
  const supabaseUrl = 'https://your-project.supabase.co';
  const supabaseKey = 'your-anon-key';
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // 1. 检查所有荣誉顾问申请
    console.log('1. 检查所有荣誉顾问申请...');
    const { data: allApplications, error: allError } = await supabase
      .from('honor_advisors')
      .select('*');
    
    if (allError) {
      console.error('查询所有申请失败:', allError);
    } else {
      console.log('所有申请数据:', allApplications);
      console.log('申请总数:', allApplications?.length || 0);
    }
    
    // 2. 检查已批准的申请
    console.log('\n2. 检查已批准的申请...');
    const { data: approvedApplications, error: approvedError } = await supabase
      .from('honor_advisors')
      .select('*')
      .eq('status', 'approved');
    
    if (approvedError) {
      console.error('查询已批准申请失败:', approvedError);
    } else {
      console.log('已批准申请数据:', approvedApplications);
      console.log('已批准申请数:', approvedApplications?.length || 0);
    }
    
    // 3. 检查所有状态
    console.log('\n3. 检查所有状态...');
    const { data: statusData, error: statusError } = await supabase
      .from('honor_advisors')
      .select('status, count(*)')
      .group('status');
    
    if (statusError) {
      console.error('查询状态统计失败:', statusError);
    } else {
      console.log('状态统计:', statusData);
    }
    
    // 4. 检查表结构
    console.log('\n4. 检查表结构...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('honor_advisors')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('查询表结构失败:', tableError);
    } else {
      console.log('表结构示例:', tableInfo);
    }
    
  } catch (error) {
    console.error('调试过程中出错:', error);
  }
  
  console.log('\n=== 调试完成 ===');
}

// 运行调试
debugHonorAdvisors();
