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
        {
            path: '/md-preview',
            name: 'md-preview',
            component: () => import('@/views/Preview/MarkdownPreview.vue'),
        },
        {
            path: '/credit-md-preview',
            name: 'credit-md-preview',
            component: () => import('@/views/Credits/get-credit-md.vue'),
        },
    ],
})

export const PUBLIC_ROUTES = ['/credit/manager/credit-md-preview']

export default router
