import axios from 'axios';
import { addr_config as config } from '../../config'

// request link: front server address
const basicHost = config.FORWARDING_HOST;

// interceptors of reuqest
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// interceptors of response
axios.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// delete slash of host
function deleteSlash(host) {
    return host.replace(/\/$/, '');
}

// add slash to path
function addSlash(path) {
    return /^\//.test(path) ? path : `/${path}`;
}

// separate params of url
function separateParams(url) {
    const [path = '', paramsLine = ''] = url.split('?');

    let params = {};

    paramsLine.split('&').forEach((item) => {
        const [key, value] = item.split('=');
        params[key] = value;
    });

    return { path, params };
}

// request methods
export default function request(config) {
    let {
        method, url, data = {}, host, headers = {
           // 'Content-Type': 'multipart/form-data',
           'Content-Type': "application/x-www-form-urlencoded",
        }
    } = config;

    method = (method && method.toUpperCase()) || 'GET';

    const { path, params } = separateParams(url);

    url = host
        ? `${deleteSlash(host)}${addSlash(path)}`
        : `${deleteSlash(basicHost)}${addSlash(path)}`;

    // axios object
    var req = axios({
        url,
        method,
        headers,
        // send requests with cookies
        withCredentials: false,
        // cross domain requests
        crossDomain: true,
        data,
        params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
    }).catch(err => {
        // error requests
        return Promise.reject(err);
    });

    return req;
}

export const get = (url, params) => request({ url, params });
export const post = (url, data) => request({ method: 'POST', url, data });
