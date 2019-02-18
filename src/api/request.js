import axios from 'axios';
import config from '../config'
import '../components/Loading'

// 被代理地址
const basicRequestLink = config.FRONT_ADDR
const basicHost = basicRequestLink;

// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 删除底部 '/'
function deleteSlash(host) {
    return host.replace(/\/$/, '');
}

// 添加头部 '/'
function addSlash(path) {
    return /^\//.test(path) ? path : `/${path}`;
}

// 解析参数
function separateParams(url) {
    const [path = '', paramsLine = ''] = url.split('?');

    let params = {};

    paramsLine.split('&').forEach((item) => {
        const [key, value] = item.split('=');
        params[key] = value;
    });

    return { path, params };
}

// 主要请求方法
export default function request(config) {
    let {
        method, url, data = {}, host, headers
    } = config;

    method = (method && method.toUpperCase()) || 'GET';

    const { path, params } = separateParams(url);

    url = host
        ? `${deleteSlash(host)}${addSlash(path)}`
        : `${deleteSlash(basicHost)}${addSlash(path)}`;

    // 根据参数构造axios
    var req = axios({
        url,
        method,
        headers,
        // 带Cookie请求
        withCredentials: true,
        // 跨域
        crossDomain: true,
        data: method === 'GET' ? undefined : data,
        params: Object.assign(method === 'GET' ? data : {}, params)
    }).catch(err => {
        // 请求出错
        return Promise.reject(err);
    });

    return req;
}

export const get = (url, params) => request({ url, params });
export const post = (url, data) => request({ method: 'POST', url, data });
export const put = (url, data) => request({ method: 'PUT', url, data });
export const del = (url, data) => request({ method: 'DELETE', url, data });