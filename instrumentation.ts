// OpenTelemetry 和 Instrumentation 文件
// 这个文件用于配置应用程序的监控和观测性功能

export async function register() {
  // 只在服务器端运行
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 动态导入 OpenTelemetry 配置
    await import('./instrumentation.node');
  }
}

// 使用示例：
// 1. 安装依赖：
// npm install @vercel/otel @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions

// 2. 创建 instrumentation.node.ts 文件进行详细配置

// 3. 在 next.config.ts 中启用：
// experimental: {
//   instrumentationHook: true,
// }

// 主要用途：
// - 自动追踪 API 路由性能
// - 监控页面加载时间
// - 追踪数据库查询
// - 监控外部服务调用
// - 收集错误和异常信息
// - 生成性能报告和分析
