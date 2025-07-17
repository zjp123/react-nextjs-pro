import { NextRequest, NextResponse } from 'next/server';

// 模拟数据库查询的异步函数
async function simulateDbQuery(delay: number = 100): Promise<{ id: number; message: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        message: `数据查询完成，延迟 ${delay}ms`,
      });
    }, delay);
  });
}

// 模拟外部 API 调用
async function simulateExternalApiCall(): Promise<{ status: string; timestamp: string }> {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve({
          status: 'success',
          timestamp: new Date().toISOString(),
        });
      },
      Math.random() * 200 + 50
    ); // 50-250ms 随机延迟
  });
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 API 路由被调用 - OpenTelemetry 将自动追踪此请求');

    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const delay = parseInt(searchParams.get('delay') || '100');

    // 模拟数据库查询（OpenTelemetry 会自动追踪）
    const dbResult = await simulateDbQuery(delay);

    // 模拟外部 API 调用（OpenTelemetry 会自动追踪）
    const apiResult = await simulateExternalApiCall();

    // 模拟一些业务逻辑处理时间
    await new Promise(resolve => setTimeout(resolve, 50));

    const response = {
      success: true,
      message: 'OpenTelemetry 测试 API',
      data: {
        database: dbResult,
        externalApi: apiResult,
        requestInfo: {
          method: request.method,
          url: request.url,
          userAgent: request.headers.get('user-agent'),
          timestamp: new Date().toISOString(),
        },
      },
      telemetry: {
        note: '此请求的所有操作都被 OpenTelemetry 自动追踪',
        traces: '查看控制台或配置的监控平台以查看追踪数据',
      },
    };

    console.log('✅ API 请求处理完成');

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API 请求处理失败:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('📝 POST 请求数据:', body);

    // 模拟数据处理
    await simulateDbQuery(150);

    return NextResponse.json({
      success: true,
      message: 'POST 请求处理成功',
      receivedData: body,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ POST 请求处理失败:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Bad Request',
        message: '请求数据格式错误',
      },
      { status: 400 }
    );
  }
}
