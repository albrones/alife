import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recettes from '../views/Recettes.vue'
import About from '../views/About.vue'
import Recette from '../components/recette/Recette.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // // which is lazy-loaded when the route is visited.
        // component: () =>
        //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
        component: About,
    },
    {
        path: '/recettes',
        name: 'Recettes',
        component: Recettes,
    },
    {
        path: '/recettes/:id',
        name: 'Recette',
        component: Recette,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
