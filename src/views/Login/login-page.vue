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
import { ref } from 'vue';
import { getLoginUrl } from '@/api/mods/quota.mod';
import { NEmpty, NButton } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isLoggingIn = ref(false);

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
