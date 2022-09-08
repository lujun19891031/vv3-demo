<template>
        <el-result
            icon="error"
            title="404"
            sub-title="不好意思，页面走丢了"
            class="min-h-screen"
        >
            <template #extra>
            <el-button type="primary" @click="$router.push('/login')">返回登录页</el-button>
            </template>
        </el-result>
</template>