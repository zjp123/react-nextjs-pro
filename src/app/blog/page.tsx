// 博客列表页面
import Link from 'next/link';
import { getAllBlogPosts, getBlogPostExcerpt, type BlogPost } from '@/lib/blog-data';

// 博客文章卡片组件
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold mb-3">
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      <div className="flex items-center gap-4 text-gray-600 mb-3">
        <span>作者：{post.author}</span>
        <span>发布时间：{post.publishDate}</span>
      </div>

      <p className="text-gray-700 mb-4">{post.excerpt || getBlogPostExcerpt(post.content)}</p>

      <div className="flex gap-2">
        {post.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function BlogList() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">技术博客</h1>

      <div className="space-y-6">
        {blogPosts.map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}

export const metadata = {
  title: '技术博客 - generateStaticParams 示例',
  description: '演示 Next.js generateStaticParams 功能的博客示例',
  openGraph: {
    title: '技术博客',
    description: '演示 Next.js generateStaticParams 功能的博客示例',
    type: 'website',
  },
};
