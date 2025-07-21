// 博客加载状态组件
export default function BlogLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 标题骨架屏 */}
      <div className="h-10 bg-gray-200 rounded mb-8 animate-pulse"></div>

      {/* 文章列表骨架屏 */}
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="border border-gray-200 rounded-lg p-6">
            {/* 文章标题 */}
            <div className="h-8 bg-gray-200 rounded mb-3 animate-pulse"></div>

            {/* 元信息 */}
            <div className="flex gap-4 mb-3">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* 内容摘要 */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            {/* 标签 */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-18 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
