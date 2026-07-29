import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Servicios from '../components/Servicios.vue'
import Nosotros from '../components/Nosotros.vue'
import Blog from '../components/blog.vue'
import Contacto from '../components/Contacto.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/servicios',
            name: 'servicios',
            component: Servicios,
        },
        {
            path: '/nosotros',
            name: 'nosotros',
            component: Nosotros,
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog,
        },
        {
            path: '/contacto',
            name: 'contacto',
            component: Contacto,
        },
    ],
})

export default router