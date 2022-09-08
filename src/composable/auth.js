import { useCookies, } from '@vueuse/integrations/useCookies'
const tokeKey = 'admin-token'
const cookie = useCookies()

// 获取token
export function getToken(){
    return cookie.get(tokeKey)
}

// 设置token
export function setToken(token){
    cookie.set(tokeKey, token)
}

// 移除token
export function removeToken(){
    cookie.remove(tokeKey)
}