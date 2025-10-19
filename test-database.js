// 简单的数据库测试脚本
// 在浏览器控制台中运行此脚本来测试数据库连接

async function testDatabase() {
  console.log('开始测试数据库连接...');
  
  try {
    // 测试查询 honor_advisors 表
    const { data, error } = await supabase
      .from('honor_advisors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('数据库查询错误:', error);
      return;
    }

    console.log('查询成功！找到', data.length, '条记录:');
    console.log(data);

    if (data.length === 0) {
      console.log('表中没有数据，这可能是问题的原因。');
    }

  } catch (err) {
    console.error('测试过程中发生错误:', err);
  }
}

// 运行测试
testDatabase();
