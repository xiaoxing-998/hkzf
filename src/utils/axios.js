import axios from 'axios'

import { Toast } from 'antd-mobile'

// 后端接口基础路径
const BASE_URL = 'http://api-haoke-dev.itheima.net';
// 创建全局axios实例
const request = axios.create({
    baseURL: BASE_URL
});

// 请求拦截器
request.interceptors.request.use(function (config) {

    Toast.loading('加载中...', 0)
    return config;

}, function (error) {

    return Promise.reject(error);
});

// 响应拦截器  请求成功后
request.interceptors.response.use(function (response) {
    Toast.hide()
    // 返回简化所需数据
    const { status, body, description } = response.data;
    const data = {
        status,
        data: body,
        description
    }

    return data;
}, function (error) {

    return Promise.reject(error);
});

export { BASE_URL };
export default request;