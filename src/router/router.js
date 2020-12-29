import {createWebHistory, createRouter} from 'vue-router'
import home_page from '@/components/Home'
import todo from '@/components/todo-list'
import login from '@/components/login.vue'
import register from '@/components/register.vue'

let history = createWebHistory()
let routes = [
    {path:'/', component: home_page},
    {path:'/todo', component: todo},
    {path:'/login', component: login},
    {path:'/register', component: register},
]

const router = createRouter({
    history,
    routes
})

export default router