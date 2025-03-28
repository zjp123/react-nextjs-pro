import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useUserStore } from '../store/useUserStore';
import {
  addPendingRequest,
  removePendingRequest,
  cancelDuplicateRequest,
  cancelAllRequests,
} from './utils';

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // 默认API地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 获取用户token（如果有的话）
    const { user } = useUserStore.getState();

    // 如果有token，添加到请求头
    if (user?.id) {
      config.headers['Authorization'] = `Bearer ${user.id}`;
    }

    // 检查并取消重复请求
    cancelDuplicateRequest(config);
    // 添加请求到待处理Map
    addPendingRequest(config);

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 从待处理Map中移除请求
    removePendingRequest(response.config);
    // 直接返回响应数据
    return response.data;
  },
  (error: AxiosError) => {
    // 如果不是取消请求导致的错误，则从待处理Map中移除请求
    if (!axios.isCancel(error) && (error as AxiosError).config) {
      removePendingRequest((error as AxiosError).config as AxiosRequestConfig);
    }

    const { response } = error;

    // 根据状态码处理错误
    if (response) {
      switch (response.status) {
        case 401: // 未授权
          // 清除用户信息
          useUserStore.getState().clearUser();
          break;
        case 403: // 禁止访问
          console.error('没有权限访问该资源');
          break;
        case 404: // 资源不存在
          console.error('请求的资源不存在');
          break;
        case 500: // 服务器错误
          console.error('服务器错误');
          break;
        default:
          console.error(`请求错误: ${response.status}`);
      }
    } else {
      // 网络错误或请求被取消
      console.error('网络错误或请求被取消');
    }

    return Promise.reject(error);
  }
);

// 创建可取消的请求
export const createCancelableRequest = <T = any>(requestFn: () => Promise<T>) => {
  const source = axios.CancelToken.source();

  const promise = requestFn().catch(error => {
    if (axios.isCancel(error)) {
      console.log('请求已取消:', error.message);
    }
    return Promise.reject(error);
  });

  return {
    promise,
    cancel: (message: string = '请求已取消') => source.cancel(message),
    source,
  };
};

// 封装GET请求
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) => {
  return instance.get<any, T>(url, { params, ...config });
};

// 封装可取消的GET请求
export const getCancelable = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();
  const promise = instance.get<any, T>(url, {
    params,
    ...config,
    cancelToken: source.token,
  });

  return {
    promise,
    cancel: (message: string = '请求已取消') => source.cancel(message),
    source,
  };
};

// 封装POST请求
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return instance.post<any, T>(url, data, config);
};

// 封装可取消的POST请求
export const postCancelable = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();
  const promise = instance.post<any, T>(url, data, {
    ...config,
    cancelToken: source.token,
  });

  return {
    promise,
    cancel: (message: string = '请求已取消') => source.cancel(message),
    source,
  };
};

// 封装PUT请求
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return instance.put<any, T>(url, data, config);
};

// 封装可取消的PUT请求
export const putCancelable = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();
  const promise = instance.put<any, T>(url, data, {
    ...config,
    cancelToken: source.token,
  });

  return {
    promise,
    cancel: (message: string = '请求已取消') => source.cancel(message),
    source,
  };
};

// 封装DELETE请求
export const del = <T = any>(url: string, config?: AxiosRequestConfig) => {
  return instance.delete<any, T>(url, config);
};

// 封装可取消的DELETE请求
export const delCancelable = <T = any>(url: string, config?: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();
  const promise = instance.delete<any, T>(url, {
    ...config,
    cancelToken: source.token,
  });

  return {
    promise,
    cancel: (message: string = '请求已取消') => source.cancel(message),
    source,
  };
};

// 取消所有请求
export const cancelAllPendingRequests = () => {
  cancelAllRequests();
};

// 导出axios实例，以便可以进行更高级的自定义
export default instance;
