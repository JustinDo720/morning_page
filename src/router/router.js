import {createWebHistory, createRouter} from 'vue-router'
import home_page from '@/components/Home'


let history = createWebHistory()
let routes = [
    {path:'/', component: home_page}
]

const router = createRouter({
    history,
    routes
})

export default router