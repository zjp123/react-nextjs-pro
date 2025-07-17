import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `$var: red;`,
  },

  // 注意：在 Next.js 15.2.4+ 中，instrumentation.ts 默认可用
  // 不再需要 experimental.instrumentationHook 配置
};

export default nextConfig;
