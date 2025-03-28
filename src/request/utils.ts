import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

// 存储请求取消令牌的Map
const pendingRequests = new Map<string, CancelTokenSource>();

/**
 * 生成请求的唯一键
 */
export const getRequestKey = (config: AxiosRequestConfig): string => {
  const { url, method, params, data } = config;
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
};

/**
 * 添加请求到待处理Map
 */
export const addPendingRequest = (config: AxiosRequestConfig): void => {
  // 如果配置了不需要取消重复请求，则直接返回
  if (config.headers?.noCancelToken) return;

  const requestKey = getRequestKey(config);
  const source = axios.CancelToken.source();

  config.cancelToken = source.token;

  if (!pendingRequests.has(requestKey)) {
    pendingRequests.set(requestKey, source);
  }
};

/**
 * 移除请求从待处理Map
 */
export const removePendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey = getRequestKey(config);

  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey);
  }
};

/**
 * 取消重复的请求
 */
export const cancelDuplicateRequest = (config: AxiosRequestConfig): void => {
  const requestKey = getRequestKey(config);

  if (pendingRequests.has(requestKey)) {
    const source = pendingRequests.get(requestKey);
    source?.cancel(`取消重复请求: ${requestKey}`);
    pendingRequests.delete(requestKey);
  }
};

/**
 * 取消所有请求
 */
export const cancelAllRequests = (): void => {
  pendingRequests.forEach(source => {
    source.cancel('取消所有请求');
  });
  pendingRequests.clear();
};

/**
 * 格式化URL参数
 */
export const formatUrlParams = (url: string, params: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) return url;

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
};
