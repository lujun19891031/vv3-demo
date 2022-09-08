import { createApp } from 'vue'
import { createStore } from 'vuex'
import { getUserInfo } from '@/api/manager'
// import { jwtdecode } from 'webjsontoken'
// import TokenSecert from './composable/conf'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {}
        }
    },
    mutations: {
        SET_USERINFO(state, user) {
            // 记录用户信息
            state.user = user
        }
    },
    actions:{
        UserInfo({commit}){
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    commit('SET_USERINFO', res.permissions)
                    resolve(res)
                }).catch(err => 
                    reject(err)
                )
            })
        }
    }
})

export default store