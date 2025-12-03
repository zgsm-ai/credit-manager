<template>
    <div class="login-page h-full flex flex-col justify-center">
        <n-empty size="huge">
            <template #icon>
                <img
                    src="../../assets/empty.svg"
                    alt=""
                />
            </template>
            <template #default>
                <p class="text-center text-xs mt-2.5">{{ t('login.notLogged') }}</p>
                <p class="text-center text-xs mt-1 mb-3">{{ t('login.getUserInfoBeforeLogin') }}</p>
            </template>
            <template #extra>
                <n-button
                    type="info"
                    size="medium"
                    :disabled="isLoggingIn"
                    :loading="isLoggingIn"
                    @click="toLogin"
                >
                    {{ t('login.loginImmediatly') }}
                </n-button>
            </template>
        </n-empty>
    </div>
</template>

<script setup lang="ts">
/**
 * @file 登录页
 */
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getLoginUrl } from '@/api/mods/quota.mod';
import { authService } from '@/services/auth';
import { NEmpty, NButton } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { getRedirectPath, clearRedirectPath } from '@/router/guards/auth';

const { t } = useI18n();
const router = useRouter();
const isLoggingIn = ref(false);

// 检查是否有 hashToken，如果有则进行认证
onMounted(async () => {
    const hashToken = new URLSearchParams(window.location.search).get('state');

    if (hashToken) {
        isLoggingIn.value = true;
        try {
            // 直接调用认证服务处理 hashToken
            const authResult = await authService.authenticate();

            if (authResult.success) {
                // 认证成功，检查是否有重定向路径
                const redirectPath = getRedirectPath();
                console.log('redirectPath===>', redirectPath);
                clearRedirectPath();

                if (redirectPath) {
                    router.replace(redirectPath);
                } else {
                    router.replace('/');
                }
            }
        } catch (error) {
            console.error('自动登录失败:', error);
        } finally {
            isLoggingIn.value = false;
        }
    }
});

const toLogin = async () => {
    if (isLoggingIn.value) return;

    isLoggingIn.value = true;
    try {
        const {
            data: { url },
        } = await getLoginUrl();

        window.location.href = url;
    } catch (error) {
        console.error('登录失败:', error);
        isLoggingIn.value = false;
    }
};
</script>
