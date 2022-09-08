import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login.vue')
    },{
        name: 'index',
        path: '/index',
        component: () => import('@/views/Index.vue'),
        children:[
            {
                name: "files",
                path: "/files",
                component: () => import('@/components/siderComponents/Files.vue')
            },
            {
                name: "user",
                path: "/user",
                component: () => import('@/components/siderComponents/User.vue')
            },
            {
                name: "miss",
                path: "/miss",
                component: () => import('@/components/siderComponents/Miss.vue')
            },
            {
                name: "manger",
                path: "/manger",
                component: () => import('@/components/siderComponents/Manger.vue')
            },
        ],
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: ()=>import('@/views/NotFound.vue') 
    },
]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router