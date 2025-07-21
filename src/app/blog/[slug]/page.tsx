// 博客文章页面 - 演示 generateStaticParams 的使用
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPost, type BlogPost } from '@/lib/blog-data';

// 🔥 关键函数：generateStaticParams
// 这个函数告诉 Next.js 需要为哪些 slug 生成静态页面
export async function generateStaticParams() {
  // 在实际项目中，这里通常会从 API 或数据库获取数据
  // const posts = await fetch('https://api.myblog.com/posts').then(res => res.json())

  const posts = getAllBlogPosts();

  // 返回所有需要静态生成的参数
  return posts.map(post => ({
    slug: post.slug, // 对应文件名中的 [slug]
  }));
}

// 页面组件
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 根据 slug 查找对应的文章
  const post = getBlogPost(slug);

  // 如果文章不存在，显示 404 页面
  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose lg:prose-xl max-w-none">
        {/* 文章标题 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* 文章元信息 */}
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>作者：{post.author}</span>
          <span>发布时间：{post.publishDate}</span>
        </div>

        {/* 标签 */}
        <div className="flex gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* 文章内容 */}
        <div className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</div>

        {/* 返回链接 */}
        <div className="mt-8 pt-8 border-t">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← 返回博客列表
          </Link>
        </div>
      </article>
    </div>
  );
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} | 技术博客`,
    description: post.excerpt || post.content.substring(0, 160) + '...',
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160) + '...',
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
  };
}
