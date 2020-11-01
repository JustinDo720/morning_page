import {createWebHistory, createRouter} from 'vue-router'
import home_page from '@/components/Home'
import todo from '@/components/todo-list'


let history = createWebHistory()
let routes = [
    {path:'/', component: home_page},
    {path:'/todo', component: todo},
]

const router = createRouter({
    history,
    routes
})

export default router