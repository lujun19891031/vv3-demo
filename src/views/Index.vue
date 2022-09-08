<template>
<el-container>
  <el-aside width="300px">

    <Sider></Sider>

  </el-aside>
  <el-container>
    <el-header>
        <Header></Header>
    </el-header>
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
  
</template>


<script setup>
import Header from '@/components/Header.vue'
import Sider from '@/components/Sider.vue'
import {removeToken} from '@/composable/auth'
import { ElNotification } from 'element-plus'
import { getAbout } from '@/api/manager'
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'


const router = useRouter()

components:{
    Header,
    Sider
}



onMounted:{
  getAbout().then(res=>{
    if (res.code == 0 ){
      ElNotification({
            message: res.message,
            type: 'error',
            duration: 3000,
      })
      removeToken()
      router.push("/login")
    }
  }).catch(err =>{

  })
}


</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container .el-aside {
    line-height: 100vh;
  }

</style>