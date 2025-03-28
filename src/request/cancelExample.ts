import React from 'react';
import axios from 'axios';
import { getCancelable, postCancelable, cancelAllPendingRequests } from './index';
import type { CancelableRequest } from './types';

// 用户接口示例
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * 可取消的获取用户信息请求示例
 */
export const getUserInfoCancelable = (userId: string): CancelableRequest<User> => {
  return getCancelable<User>(`/users/${userId}`);
};

/**
 * 可取消的登录请求示例
 */
export const loginCancelable = (username: string, password: string) => {
  return postCancelable('/auth/login', { username, password });
};

/**
 * 使用可取消请求的React Hook示例
 */
export const useUserData = (userId: string) => {
  // 在React组件中使用
  React.useEffect(() => {
    // 创建可取消请求
    const request = getUserInfoCancelable(userId);

    // 发起请求
    request.promise
      .then(data => {
        console.log('用户数据:', data);
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          console.error('获取用户数据失败:', error);
        }
      });

    // 组件卸载时取消请求
    return () => {
      request.cancel('组件已卸载');
    };
  }, [userId]);
};

/**
 * 取消所有待处理的请求
 * 可以在路由切换时调用，避免页面切换后仍有请求在进行
 */
export const cancelAllRequests = () => {
  cancelAllPendingRequests();
};

/**
 * 竞态条件处理示例
 * 当快速切换查询条件时，只保留最新的请求结果
 */
export const handleRaceCondition = () => {
  let currentRequest: CancelableRequest<any> | null = null;

  return (searchTerm: string) => {
    // 如果有正在进行的请求，取消它
    if (currentRequest) {
      currentRequest.cancel('新的搜索请求已发起');
    }

    // 创建新的请求
    currentRequest = getCancelable('/search', { q: searchTerm });

    return currentRequest.promise;
  };
};
