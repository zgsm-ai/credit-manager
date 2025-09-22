import type { Router } from 'vue-router';
import { authService } from '@/services/auth.service';
import { PUBLIC_ROUTES } from '@/router';

export function setupAuthGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        try {
            // 检查是否为公开路由或登录页面
            if (PUBLIC_ROUTES.includes(to.path) || to.path === '/login') {
                next();
                return;
            }
            // 检查是否已经认证过
            const isAuthenticated = await authService.isAuthenticated();

            if (isAuthenticated) {
                // 已经认证，直接放行
                next();
                return;
            }

            // 对于非公开路由，先放行让页面渲染，然后在后台进行认证
            next();

            // 在后台进行认证，不阻塞页面渲染
            authService
                .authenticate()
                .then((authResult) => {
                    if (!authResult.success) {
                        // 认证失败，重定向到登录页
                        router.replace('/login');
                    }
                })
                .catch((error) => {
                    console.error('Background authentication error:', error);
                    router.replace('/login');
                });
        } catch (error) {
            console.error('Authentication error:', error);
            next('/login');
        }
    });

    router.afterEach(() => {
        // 可以在这里添加一些后置逻辑，比如页面标题更新等
        // 目前暂时不需要特殊处理
    });
}
