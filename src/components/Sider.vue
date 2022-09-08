<template>
  <el-row style="width: 300px; height: 100vh">
    <el-col>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Guide /></el-icon>
            <span>导航栏</span>
          </template>
          <router-link to="/files"><el-menu-item index="1-2">1、文件管理</el-menu-item></router-link>
          <router-link to="/user"><el-menu-item index="1-3">2、用户管理</el-menu-item></router-link>
          <router-link to="/miss"><el-menu-item index="1-4">3、权限管理</el-menu-item></router-link>
          <router-link to="/manger"><el-menu-item index="1-5">4、管理员管理</el-menu-item></router-link>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>

  import {ref} from 'vue'
  const handleOpen = ref(true)



</script>
<style scoped>
</style>