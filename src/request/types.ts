import { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

// 通用响应结构
export interface ApiResponse<T = any> {
  data: T;
  code: number;
  message: string;
}

// 分页数据结构
export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 自定义请求配置，扩展AxiosRequestConfig
export interface RequestConfig extends AxiosRequestConfig {
  skipErrorHandler?: boolean; // 是否跳过默认的错误处理
  showLoading?: boolean; // 是否显示加载提示
}

// 请求方法类型
export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

// 请求函数类型
export type RequestFunction = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
) => Promise<T>;

// 可取消的请求结果
export interface CancelableRequest<T> {
  promise: Promise<T>;
  cancel: (message?: string) => void;
  source: CancelTokenSource;
}

// 可取消的请求函数类型
export type CancelableRequestFunction = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
) => CancelableRequest<T>;
