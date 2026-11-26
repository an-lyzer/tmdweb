import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }

        return { top: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../components/Home.vue'),
        },
        {
            path: '/servicios',
            name: 'servicios',
            component: () => import('../components/ServiciosPage.vue'),
        },
        {
            path: '/nosotros',
            name: 'nosotros',
            component: () => import('../components/Nosotros.vue'),
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('../components/blog.vue'),
        },
        {
            path: '/blog/:slug',
            name: 'publicacion-blog',
            component: () => import('../components/publicacionblog.vue'),
        },
        {
            path: '/contacto',
            name: 'contacto',
            component: () => import('../components/Contacto.vue'),
        },
        {
            path: '/terminos-de-servicio',
            name: 'terminos-de-servicio',
            component: () => import('../components/TerminosServicio.vue'),
        },
        {
            path: '/legal',
            name: 'legal',
            component: () => import('../components/AvisoLegal.vue'),
        },
        {
            path: '/politica-de-privacidad',
            name: 'politica-de-privacidad',
            component: () => import('../components/PoliticaPrivacidad.vue'),
        },
    ],
})

export default router
