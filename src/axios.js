import axios from 'axios'
import { ElNotification } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'


const service = axios.create({
    baseURL: '/api',
    // timeout: 3000,
    header: {"Content-Type": "application/json;charset=UTF-8"},
    
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 往header头自动添加token
    const cookie = useCookies()
    const token = cookie.get('admin-token')
    if(token){
        config.headers["token"] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    ElNotification({
        message: error.response.data.message || "服务器异常，请稍后再试",
        type: 'error',
        duration: 3000,
    })
    return Promise.reject(error);
  });


export default service