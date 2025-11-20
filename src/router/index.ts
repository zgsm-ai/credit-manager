import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        // 如果有保存的位置（如浏览器前进/后退），则恢复该位置
        if (savedPosition) {
            return savedPosition;
        }
        // 否则，总是滚动到顶部
        return new Promise((resolve) => {
            // 使用更强制的方式滚动到顶部
            setTimeout(() => {
                // 尝试滚动到内容区域的顶部
                const contentEl = document.querySelector('.content');
                if (contentEl) {
                    contentEl.scrollTop = 0;
                }

                // 同时也尝试窗口滚动（以防某些页面使用窗口滚动）
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;

                resolve({ top: 0, left: 0 });
            }, 50); // 增加延迟以确保DOM已更新
        });
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/home-page.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login/login-page.vue'),
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
        {
            path: '/credit-reward-plan',
            name: 'credit-reward-plan',
            component: () => import('@/views/Reward/credit-reward-plan.vue'),
        },
        {
            path: '/subscribe',
            name: 'subscribe',
            component: () => import('@/views/Subscribe/subscribe-page.vue'),
        },
    ],
});

export const PUBLIC_ROUTES = ['/credit-reward-plan', '/credit-md-preview'];

export default router;
