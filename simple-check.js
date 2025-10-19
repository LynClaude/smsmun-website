// 简单的状态检查脚本
// 在浏览器控制台中运行

// 1. 检查当前用户状态
console.log('=== 检查用户状态 ===');

// 如果您已经登录，这应该显示您的用户信息
console.log('当前用户对象:', window.__NEXT_DATA__?.props?.pageProps?.user || '未找到用户数据');

// 2. 检查localStorage中的用户数据
console.log('=== 检查localStorage ===');
const userData = localStorage.getItem('supabase.auth.token');
console.log('localStorage用户数据:', userData ? '已存储' : '未存储');

// 3. 检查sessionStorage
console.log('=== 检查sessionStorage ===');
const sessionData = sessionStorage.getItem('supabase.auth.token');
console.log('sessionStorage用户数据:', sessionData ? '已存储' : '未存储');

// 4. 如果您能看到这个输出，说明脚本运行正常
console.log('=== 脚本运行正常 ===');
console.log('如果您看不到荣誉顾问委员会卡片，说明您的is_honor_advisor状态为false');
console.log('请运行fix-user-status.js脚本来修复这个问题');
