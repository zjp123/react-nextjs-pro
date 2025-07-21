// 博客数据类型定义和数据源
export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt?: string;
}

// 模拟博客文章数据
export const blogPosts: BlogPost[] = [
  {
    slug: 'nextjs-tutorial',
    title: 'Next.js 完整教程',
    content: `
      Next.js 是一个基于 React 的全栈框架，它提供了许多开箱即用的功能，包括：
      
      ## 主要特性
      - 服务端渲染 (SSR)
      - 静态站点生成 (SSG)
      - API 路由
      - 自动代码分割
      - 内置 CSS 支持
      
      ## generateStaticParams 的使用
      这个函数是 App Router 中的重要功能，它允许我们在构建时预生成静态页面...
    `,
    author: '张三',
    publishDate: '2024-01-15',
    tags: ['Next.js', 'React', '前端开发'],
    excerpt: '深入了解 Next.js 框架的核心功能和最佳实践',
  },
  {
    slug: 'react-hooks-guide',
    title: 'React Hooks 深入指南',
    content: `
      React Hooks 是 React 16.8 引入的新特性，它让我们可以在函数组件中使用状态和其他 React 特性。
      
      ## 常用 Hooks
      - useState: 管理组件状态
      - useEffect: 处理副作用
      - useContext: 使用 Context
      - useReducer: 复杂状态管理
      
      ## 自定义 Hooks
      自定义 Hooks 是复用状态逻辑的强大方式...
    `,
    author: '李四',
    publishDate: '2024-01-10',
    tags: ['React', 'Hooks', 'JavaScript'],
    excerpt: '掌握 React Hooks 的使用方法和最佳实践',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript 最佳实践',
    content: `
      TypeScript 为 JavaScript 添加了静态类型检查，提高了代码的可维护性和可读性。
      
      ## 类型定义
      - 接口 (Interface)
      - 类型别名 (Type Alias)
      - 泛型 (Generics)
      - 联合类型 (Union Types)
      
      ## 最佳实践
      1. 严格的类型检查
      2. 合理使用泛型
      3. 避免使用 any
      4. 利用类型推断...
    `,
    author: '王五',
    publishDate: '2024-01-05',
    tags: ['TypeScript', '最佳实践', '开发技巧'],
    excerpt: '分享 TypeScript 开发中的最佳实践和常见陷阱',
  },
];

// 根据 slug 获取文章
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// 获取所有文章
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

// 获取文章摘要
export function getBlogPostExcerpt(content: string, maxLength: number = 120): string {
  return content.replace(/\n/g, ' ').trim().substring(0, maxLength) + '...';
}
