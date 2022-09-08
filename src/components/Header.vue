<template>
    <div class="header">
        <div class="header-left">
            header-left
        </div>
        <div class="header-right">
            <el-dropdown>
                <el-button round size="large" style="background-image: url('/public/images/14.jpg');background-size:100% 100%">
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    
</template>

<script setup>

import {ElNotification}  from 'element-plus'
import {useRouter} from 'vue-router'
import {removeToken} from '@/composable/auth'

const router = useRouter()

// 用户退出
function logout(){
    // console.log('logout')
    removeToken()
    // 跳转到登录页面
    router.push('/login')
    // 页面刷新
    ElNotification({
        message: "退出成功",
        type: 'success',
        duration: 3000,
    })
}

</script>

<style scoped>

.header-left {
   display: inline-block;
   margin-left: 300px;
   position: fixed;
   left: 10px;
}


.header-right {
    display: inline-block;
    position: fixed;
    right: 30px;
    top: 10px;
}
</style>
