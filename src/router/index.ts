import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Films from '../views/Films.vue'
import Series from '../views/Series.vue'
import Music from '../views/Music.vue'
import Recettes from '../views/Recettes.vue'
import About from '../views/About.vue'
import Recette from '../components/recette/Recette.vue'
import RecetteForm from '../components/recette/RecetteForm.vue'
import FilmsForm from '../components/films/FilmsForm.vue'
import SeriesForm from '../components/series/SeriesForm.vue'
import MusicForm from '../components/music/MusicForm.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/films',
        name: 'Films',
        component: Films,
    },
    {
        path: '/series',
        name: 'Séries',
        component: Series,
    },
    {
        path: '/films/add',
        name: 'Ajout Film',
        component: FilmsForm,
    },
    {
        path: '/films/edit/:id',
        name: 'Editer Film',
        component: FilmsForm,
    },
    {
        path: '/series/add',
        name: 'Ajout Série',
        component: SeriesForm,
    },
    {
        path: '/series/edit/:id',
        name: 'Editer Série',
        component: SeriesForm,
    },
    {
        path: '/music',
        name: 'Musique',
        component: Music,
    },
    {
        path: '/music/add',
        name: 'Ajout Musique',
        component: MusicForm,
    },
    {
        path: '/music/edit/:id',
        name: 'Editer Musique',
        component: MusicForm,
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
        path: '/recettes/add',
        name: 'Ajout Recette',
        component: RecetteForm,
    },
    {
        path: '/recettes/edit/:id',
        name: 'Editer Recette',
        component: RecetteForm,
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
