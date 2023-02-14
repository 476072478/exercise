import axios from 'axios'
import { store } from '../redux/store'
axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.request.use(function (config) {
    store.dispatch({
        type: 'changeutil',
        title: true
    })
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    store.dispatch({
        type: 'changeutil',
        title: false
    })
    return response;
}, function (error) {
    return Promise.reject(error);
});