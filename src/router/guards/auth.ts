import type { Router } from 'vue-router';
import { authService } from '@/services/auth';
import { PUBLIC_ROUTES } from '@/router';
import { tokenManager } from '@/utils/token';

// 保存重定向路径的键名
const REDIRECT_KEY = 'auth_redirect_path';

export function setupAuthGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        try {
            // 检查是否为公开路由
            if (PUBLIC_ROUTES.includes(to.path)) {
                next();
                return;
            }

            // 检查是否已经认证过
            const isAuthenticated = await authService.isAuthenticated();

            if (isAuthenticated) {
                // 已经认证，检查是否有重定向路径
                const redirectPath = getRedirectPath();
                if (redirectPath && redirectPath !== to.path) {
                    // 有重定向路径且不是当前路径，则跳转到重定向路径
                    clearRedirectPath();
                    next(redirectPath);
                    return;
                }
                // 已经认证，直接放行
                next();
                return;
            }

            // 未认证的情况
            if (to.path === '/login') {
                // 如果是登录页面，直接放行
                next();
                return;
            }

            // 保存当前访问的路径，用于登录后重定向
            saveRedirectPath(to.fullPath);

            // 对于非公开路由，先放行让页面渲染，然后在后台进行认证
            next();

            // 在后台进行认证，不阻塞页面渲染
            authService
                .authenticate()
                .then((authResult) => {
                    if (!authResult.success) {
                        // 认证失败，重定向到登录页
                        router.replace('/login');
                    } else {
                        // 认证成功，检查是否有重定向路径
                        const redirectPath = getRedirectPath();
                        if (redirectPath && redirectPath !== window.location.pathname) {
                            // 有重定向路径且不是当前路径，则跳转到重定向路径
                            clearRedirectPath();
                            router.replace(redirectPath);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Background authentication error:', error);
                    router.replace('/login');
                });
        } catch (error) {
            console.error('Authentication error:', error);
            // 确保在出错时也保存重定向路径
            if (to.path !== '/login' && !PUBLIC_ROUTES.includes(to.path)) {
                saveRedirectPath(to.fullPath);
            }
            next('/login');
        }
    });

    router.afterEach((to) => {
        // 在路由导航完成后，检查并清理URL中的state参数
        // 这确保了即使在其他地方有导航操作，state参数也会被清理
        if (to.query.state !== undefined) {
            tokenManager.cleanUrlState();
        }

        // 只有在成功导航到非登录页面且不是从登录页面重定向过来时才清除重定向路径
        // 这样可以避免在跳转到登录页面时就清除了重定向路径
        if (to.path !== '/login' && to.path !== '/') {
            // 检查是否有重定向路径，如果有且当前路径不是重定向目标，则不清除
            const redirectPath = getRedirectPath();
            if (redirectPath && redirectPath !== to.fullPath) {
                return;
            }
            clearRedirectPath();
        }
    });
}

// 保存重定向路径
function saveRedirectPath(path: string): void {
    try {
        localStorage.setItem(REDIRECT_KEY, path);
    } catch (error) {
        console.warn('Failed to save redirect path:', error);
    }
}

// 获取重定向路径
function getRedirectPath(): string | null {
    try {
        return localStorage.getItem(REDIRECT_KEY);
    } catch (error) {
        console.warn('Failed to get redirect path:', error);
        return null;
    }
}

// 清除重定向路径
function clearRedirectPath(): void {
    try {
        localStorage.removeItem(REDIRECT_KEY);
    } catch (error) {
        console.warn('Failed to clear redirect path:', error);
    }
}

// 导出工具函数，供其他地方使用
export { saveRedirectPath, getRedirectPath, clearRedirectPath };
