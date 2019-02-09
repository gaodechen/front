import axios from 'axios';

// 被代理地址
const basicRequestLink = 'http://localhost:3001/'
const basicHost = basicRequestLink;

// 带cookie请求
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true

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

    return axios({
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
}

export const get = (url, data) => request({ url, data });
export const post = (url, data) => request({ method: 'POST', url, data });
export const put = (url, data) => request({ method: 'PUT', url, data });
export const del = (url, data) => request({ method: 'DELETE', url, data });