import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/home-page.vue'),
        },
		{
			path: '/credits',
			name: 'credits',
			component: () => import('@/views/Credits/credits-page.vue'),
		},
    ],
})

export default router
