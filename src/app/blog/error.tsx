// 博客相关的错误页面
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">出错了！</h1>
      <p className="text-gray-600 mb-8">加载博客内容时发生了错误，请稍后重试。</p>

      <div className="space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          重试
        </button>
        <Link
          href="/blog"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors inline-block"
        >
          返回博客列表
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8 text-left">
          <summary className="cursor-pointer text-gray-600">错误详情（开发模式）</summary>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">{error.message}</pre>
        </details>
      )}
    </div>
  );
}
