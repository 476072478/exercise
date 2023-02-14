import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = localStorage.getItem('admintoken')
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instance