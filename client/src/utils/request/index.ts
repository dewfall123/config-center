/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import {  codeMessage, defaultMsg} from './constant';
import { isGraphqlQuery, handleGrapgqlResponse } from './gql'

axios.defaults.withCredentials = true;


function checkStatus(response: AxiosResponse) {
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    const url = response.config.url;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
}

function handleResponse(response: AxiosResponse) {
  if (!response?.data?.success) {
    return Promise.reject(response?.data?.msg || defaultMsg)
  }
  return {
    data: response.data.data,
  }
}

export interface IPureAxiosResult {
  data?: unknown,
  error?: string,
}

/**
 * 异常处理程序
 */
axios.interceptors.response.use(
  response => {
    if (isGraphqlQuery(response.config)) {
      return handleGrapgqlResponse(response);
    }
    return handleResponse(response) as any;
  },
  error => {
    const { response } = error;
    checkStatus(response);
    return Promise.reject(error);
  },
);
/**
 * 配置request请求时的默认参数
 */
export const request = axios.request;

export default request;
