// OpenTelemetry Node.js 配置文件
// 使用 @vercel/otel 简化配置，避免版本兼容性问题

import { registerOTel } from '@vercel/otel';

// 环境变量配置
const serviceName = process.env.OTEL_SERVICE_NAME || 'nextjs-app';
const serviceVersion = process.env.OTEL_SERVICE_VERSION || '1.0.0';
const environment = process.env.NODE_ENV || 'development';

// 使用 Vercel 的 OpenTelemetry 配置
// 注意：@vercel/otel 只支持 serviceName 参数
registerOTel({
  serviceName,
  // serviceVersion 需要通过环境变量 OTEL_SERVICE_VERSION 设置
  // 可选：配置导出器
  // traceExporter: 'console', // 开发环境使用控制台输出
});

console.log(`🚀 OpenTelemetry 已启动`);
console.log(`📊 服务名称: ${serviceName}`);
console.log(`🏷️  版本: ${serviceVersion}`);
console.log(`🌍 环境: ${environment}`);
console.log(`📈 开始收集遥测数据...`);

// 监控的内容包括：
// 1. HTTP 请求和响应
// 2. 数据库查询（MySQL, PostgreSQL, MongoDB 等）
// 3. Redis 操作
// 4. 外部 API 调用
// 5. Next.js 路由和页面

// 数据收集类型：
// - Traces: 请求在系统中的完整路径
// - Metrics: 数值型性能指标（响应时间、错误率等）
// - Logs: 详细的日志信息

// 使用场景：
// - 性能优化：找出慢查询和瓶颈
// - 错误追踪：快速定位问题根源
// - 容量规划：了解资源使用情况
// - 用户体验监控：追踪关键用户路径

// 环境变量配置示例：
// OTEL_SERVICE_NAME=my-nextjs-app
// OTEL_SERVICE_VERSION=1.2.0  # 通过环境变量设置版本
// NODE_ENV=production
