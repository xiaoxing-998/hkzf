import axios from 'axios'

// 后端接口基础路径
const BASE_URL = 'http://api-haoke-dev.itheima.net';
// 创建全局axios实例
const request = axios.create({
    baseURL: BASE_URL
});

// 请求拦截器
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器  请求成功后
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const {status,body,description}= response.data;
    const data = {
        status,
        data:body,
        description
    }
    return data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export { BASE_URL };
export default request;