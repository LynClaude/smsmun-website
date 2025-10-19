export default function TestDeploymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            部署测试页面
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            如果您能看到这个页面，说明部署是正常的
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ 部署成功！时间：{new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
