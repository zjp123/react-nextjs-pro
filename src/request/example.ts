import { get, post, put, del } from './index';
import type { PaginatedData } from './types';

// 用户接口示例
interface User {
  id: string;
  name: string;
  email: string;
}

// 登录参数
interface LoginParams {
  username: string;
  password: string;
}

// 登录响应
interface LoginResponse {
  token: string;
  user: User;
}

/**
 * 用户登录
 */
export const login = (params: LoginParams) => {
  return post<LoginResponse>('/auth/login', params);
};

/**
 * 获取用户信息
 */
export const getUserInfo = (userId: string) => {
  return get<User>(`/users/${userId}`);
};

/**
 * 获取用户列表（分页）
 */
export const getUserList = (page: number = 1, pageSize: number = 10) => {
  return get<PaginatedData<User>>('/users', { page, pageSize });
};

/**
 * 更新用户信息
 */
export const updateUser = (userId: string, data: Partial<User>) => {
  return put<User>(`/users/${userId}`, data);
};

/**
 * 删除用户
 */
export const deleteUser = (userId: string) => {
  return del(`/users/${userId}`);
};

/**
 * 使用自定义请求头的示例
 */
export const getWithCustomHeaders = () => {
  return get('/some-endpoint', null, {
    headers: {
      'X-Custom-Header': 'custom-value',
    },
  });
};

/**
 * 上传文件示例
 */
export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * 取消请求示例
 */
export const cancelableRequest = () => {
  const controller = new AbortController();

  const promise = get('/long-running-request', null, {
    signal: controller.signal,
  });

  // 返回请求Promise和取消函数
  return {
    promise,
    cancel: () => controller.abort(),
  };
};
