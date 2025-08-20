<template>
    <div class="common-header">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            <span>{{ t('common.header.appName') }}</span>
        </div>
        <div class="menu">
            <div class="user-menu" v-if="!isLoginPage && !isCreditMdPage">
                <n-popover trigger="click" :show="isUserMenuOpen" @update:show="isUserMenuOpen = $event"
                    :show-arrow="false" style="padding: 0" placement="bottom-end">
                    <template #trigger>
                        <img src="../assets/user.png" alt="">
                    </template>
                    <div class="user-name">{{ userName }}</div>
                    <div class="user-menu-options">
                        <div class="option-item" @click="toCredit">{{ t('common.header.accountAndUsage') }}</div>
                    </div>
                </n-popover>
            </div>
            <div class="header-lang-switcher">
                <n-popover trigger="click" :show="isPopoverOpen" @update:show="isPopoverOpen = $event"
                    :show-arrow="false" style="padding: 0" placement="bottom-end">
                    <template #trigger>
                        <div class="lang-trigger">
                            {{ currentLangLabel }}
                            <span class="arrow" :class="{ 'arrow-up': isPopoverOpen }">▼</span>
                        </div>
                    </template>
                    <div class="lang-options">
                        <div v-for="option in languageOptions" :key="option.key" class="lang-option"
                            :class="{ active: locale === option.key }" @click="handleSelectLang(option.key)">
                            {{ option.label }}
                        </div>
                    </div>
                </n-popover>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NPopover } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { t, locale } = useI18n()

const isLoginPage = computed(() => router.currentRoute.value.path === '/login')

const isCreditMdPage = computed(() => router.currentRoute.value.path === '/credit-md-preview')

const languageOptions = ref([
    { label: t('common.langZh'), key: 'zh' },
    { label: 'English', key: 'en' },
])

const currentLangLabel = computed(() => {
    return (
        languageOptions.value.find((item) => item.key === locale.value)?.label ||
        languageOptions.value[0].label
    )
})

const handleSelectLang = (key: string) => {
    locale.value = key
    // 保存语言设置到 localStorage
    try {
        localStorage.setItem('app-language', key)
    } catch (error) {
        console.warn('Failed to save language to localStorage:', error)
    }
    isPopoverOpen.value = false
}

const isPopoverOpen = ref(false)
const isUserMenuOpen = ref(false)

const toCredit = () => {
    window.open('/credit/manager/credits')
    isUserMenuOpen.value = false
}

const userStore = useUserStore()

const { userName } = storeToRefs(userStore)

</script>

<style scoped lang="less">
.common-header {
    display: flex;
    padding: 16px 48px 20px;
    justify-content: space-between;
    box-sizing: border-box;

    .logo {
        display: flex;
        align-items: center;

        img {
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }
    }

    .menu {
        display: flex;
        align-items: center;

        .user-menu {
            display: flex;
            cursor: pointer;
        }

        .header-lang-switcher {
            margin-left: 12px;
            display: flex;
            align-items: center;

            .lang-trigger {
                padding: 4px 8px;
                color: #fff;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }

                .arrow {
                    margin-left: 8px;
                    font-size: 12px;
                    transition: transform 0.2s ease;

                    &.arrow-up {
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}

.lang-options {
    width: 200px;

    .lang-option {
        padding: 10px 12px;
        cursor: pointer;
        color: #fff;
        background: #000;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.2);
        border-width: 1px 1px 0 1px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
        }
    }

    .lang-option:last-child {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
}

.user-name {
    padding: 10px 12px;
    background: #000;
    color: #fff;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.2);
    border-width: 1px 1px 0 1px;
}

.user-menu-options {
    width: 200px;

    .option-item {
        padding: 10px 12px;
        cursor: pointer;
        background: #000;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
}
</style>
