// 测试数据库连接和用户名加载
// 在浏览器控制台中运行此代码来测试

async function testDatabaseConnection() {
  console.log('开始测试数据库连接...')
  
  try {
    // 测试留言查询
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    
    console.log('留言查询结果:', { messagesData, messagesError })
    
    if (messagesData && messagesData.length > 0) {
      const userIds = Array.from(new Set(messagesData.map(msg => msg.user_id)))
      console.log('提取的用户ID:', userIds)
      
      // 测试用户查询
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, username, is_honor_advisor, is_alumni')
        .in('id', userIds)
      
      console.log('用户查询结果:', { usersData, usersError })
      
      if (usersData) {
        const nameMap = {}
        usersData.forEach(u => {
          if (u.id && u.username) {
            nameMap[u.id] = u.username
          }
        })
        console.log('用户名映射:', nameMap)
      }
    }
  } catch (error) {
    console.error('测试失败:', error)
  }
}

// 运行测试
testDatabaseConnection()

