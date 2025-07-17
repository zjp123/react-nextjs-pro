# OpenTelemetry 监控配置说明

## 什么是 instrumentation.ts？

`instrumentation.ts` 是 Next.js 中用于配置应用程序监控和观测性的特殊文件。它与 OpenTelemetry 集成，帮助你：

- 🔍 **追踪性能**：自动监控 API 路由、页面加载时间
- 🐛 **错误追踪**：快速定位问题根源
- 📊 **数据收集**：收集指标、日志和追踪数据
- 🚀 **性能优化**：识别瓶颈和优化机会

## ✅ 依赖包已安装

以下 OpenTelemetry 依赖包已成功安装：

```json
{
  "@opentelemetry/auto-instrumentations-node": "^0.62.0",
  "@opentelemetry/resources": "^2.0.1",
  "@opentelemetry/sdk-node": "^0.203.0",
  "@opentelemetry/semantic-conventions": "^1.36.0",
  "@vercel/otel": "^1.13.0"
}
```

## 文件结构

```
├── instrumentation.ts              # 主配置文件
├── instrumentation.node.ts         # Node.js 具体配置（已优化）
├── next.config.ts                 # 启用 instrumentation hook
├── .env.example                   # 环境变量配置示例
└── src/app/api/telemetry-test/    # 测试 API 路由
    └── route.ts
```

## 🚀 快速开始

### 1. 配置环境变量（可选）

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，自定义服务信息：

```env
OTEL_SERVICE_NAME=my-nextjs-app
OTEL_SERVICE_VERSION=1.0.0
NODE_ENV=development
```

### 2. 启动应用

```bash
npm run dev
```

启动后你会看到：

```
🚀 OpenTelemetry 已启动
📊 服务名称: nextjs-app
🏷️  版本: 1.0.0
🌍 环境: development
📈 开始收集遥测数据...
```

### 3. 测试监控功能

访问测试 API 端点来验证 OpenTelemetry 是否正常工作：

```bash
# GET 请求测试
curl http://localhost:3000/api/telemetry-test

# 带延迟参数的测试
curl http://localhost:3000/api/telemetry-test?delay=200

# POST 请求测试
curl -X POST http://localhost:3000/api/telemetry-test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

或在浏览器中访问：

- http://localhost:3000/api/telemetry-test
- http://localhost:3000/api/telemetry-test?delay=500

## 监控内容

### 自动监控的操作

- ✅ HTTP 请求和响应
- ✅ 数据库查询（MySQL, PostgreSQL, MongoDB）
- ✅ Redis 操作
- ✅ 外部 API 调用
- ✅ Express 路由
- ✅ 自定义业务逻辑

### 收集的数据类型

1. **Traces（追踪）**：请求在系统中的完整路径
2. **Metrics（指标）**：数值型性能指标（响应时间、错误率）
3. **Logs（日志）**：详细的日志信息

## 🔧 高级配置

### 环境变量配置选项

```env
# 基本配置
OTEL_SERVICE_NAME=my-app
OTEL_SERVICE_VERSION=1.0.0
NODE_ENV=production

# 导出器配置
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_EXPORTER_OTLP_HEADERS=api-key=your-api-key

# 采样率配置（生产环境推荐）
OTEL_TRACES_SAMPLER=traceidratio
OTEL_TRACES_SAMPLER_ARG=0.1  # 10% 采样率

# 日志级别
OTEL_LOG_LEVEL=info
```

### 自定义监控配置

在 `instrumentation.node.ts` 中，你可以：

- 启用/禁用特定的监控库
- 添加自定义属性
- 配置采样策略
- 设置错误处理

## 应用场景

### 1. 性能优化

- 找出慢查询和性能瓶颈
- 优化数据库查询
- 减少 API 响应时间

### 2. 错误追踪

- 快速定位问题根源
- 追踪错误传播路径
- 监控错误率变化

### 3. 容量规划

- 了解资源使用情况
- 预测系统负载
- 优化服务器配置

### 4. 用户体验监控

- 追踪关键用户路径
- 监控页面加载性能
- 分析用户行为模式

## 📊 查看监控数据

你可以将数据导出到各种监控平台：

### 开源方案

- **Jaeger**：分布式追踪系统
- **Zipkin**：轻量级追踪系统
- **Grafana + Tempo**：可视化监控

### 商业方案

- **Datadog**：全栈监控平台
- **New Relic**：应用性能监控
- **Honeycomb**：可观测性平台
- **Lightstep**：分布式追踪

### 本地开发

使用 Docker 快速启动本地监控环境：

```bash
# 使用 Jaeger
docker run -d --name jaeger \
  -p 16686:16686 \
  -p 14268:14268 \
  jaegertracing/all-in-one:latest
```

然后访问 http://localhost:16686 查看追踪数据。

## ⚠️ 注意事项

### 性能影响

- 监控会带来 2-5% 的性能开销
- 生产环境建议配置采样率（如 10%）
- 避免监控过于频繁的操作

### 数据隐私

- 确保不收集敏感用户数据
- 注意 PII（个人身份信息）的处理
- 遵守数据保护法规

### 成本控制

- 监控数据量可能很大
- 商业平台按数据量收费
- 合理配置采样和过滤策略

## 🛠️ 故障排除

### 常见问题

1. **OpenTelemetry 未启动**

   - 检查 `next.config.ts` 中是否启用了 `instrumentationHook`
   - 确认依赖包已正确安装

2. **没有看到追踪数据**

   - 检查导出器配置
   - 确认监控平台连接正常
   - 查看控制台错误信息

3. **性能影响过大**
   - 降低采样率
   - 禁用不必要的监控库
   - 优化自定义监控代码

### 调试模式

启用详细日志：

```env
OTEL_LOG_LEVEL=debug
```

## 📚 进一步学习

- [OpenTelemetry 官方文档](https://opentelemetry.io/docs/)
- [Next.js OpenTelemetry 指南](https://nextjs.org/docs/app/guides/open-telemetry)
- [可观测性最佳实践](https://opentelemetry.io/docs/concepts/observability-primer/)
