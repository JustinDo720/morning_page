import {createWebHistory, createRouter} from 'vue-router'
import home_page from '@/components/Home'
import todo from '@/components/todo-list'
import home_todo from '@/components/home_child_component/home_todo'

let history = createWebHistory()
let routes = [
    {path:'/', component: home_page},
    {path:'/todo', component: todo},
    {path:'/home_todo', component: home_todo},
]

const router = createRouter({
    history,
    routes
})

export default router