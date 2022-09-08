import router from './router'
import {getToken} from './composable/auth'
import { ElNotification } from 'element-plus'
import store from './store'

// 前置路由守卫
router.beforeEach(async (to, from, next) => {
    // console.log("全局前置路由守卫")
    const token = getToken()

    // 没有登录，强制跳转到登录页
    if (!token && to.path !== '/login') {
        ElNotification({
            message: '请先登录',
            type: 'error',
            duration: 3000,
        })
       return next({path: '/login'})
    }

    // 防止用户重复登录
    if (token && to.path === '/login') {
        ElNotification({
            message: '请不要重复登录',
            type: 'error',
            duration: 3000,
        })
        return next({path: from.path ? '/index' : from.path})
    }

    // 如果用户登录了，自动获取用户信息，并存储在vuex中
    if(token){
        await store.dispatch('UserInfo')
    }

    // 已登录，跳转到首页
    next()
    
})