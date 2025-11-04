/**
 * @description home页面菜单hook
 */
import { ref, watch, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { type MenuOption } from 'naive-ui';
import MenuIcons from '../components/menu-icons.vue';

// 定义菜单键的类型
export type MenuKey = 'profile' | 'subscription' | 'usage' | 'activity';

export function useMenu() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    // 菜单相关数据
    const activeMenuKey = ref<MenuKey>('profile');

    // 为每个菜单项添加加载状态
    const menuLoadingStates = ref<Record<MenuKey, boolean>>({
        profile: false,
        subscription: false,
        usage: false,
        activity: false,
    });

    // 存储每个菜单项是否已加载过，避免重复请求
    const menuLoadedStates = ref<Record<MenuKey, boolean>>({
        profile: false,
        subscription: false,
        usage: false,
        activity: false,
    });

    // 从URL参数初始化菜单状态
    const initMenuFromRoute = () => {
        const tab = route.query.tab as string;
        if (
            tab &&
            ['profile', 'subscription', 'usage', 'usage-consumption', 'activity'].includes(tab)
        ) {
            activeMenuKey.value = tab as MenuKey;
        }
    };

    // 监听路由变化
    watch(
        () => route.query.tab,
        (newTab) => {
            if (
                newTab &&
                ['profile', 'subscription', 'usage', 'usage-consumption', 'activity'].includes(
                    newTab as string,
                )
            ) {
                activeMenuKey.value = newTab as MenuKey;
            }
        },
    );

    // 渲染菜单图标
    const renderMenuIcon = (name: MenuKey) => {
        return () => h(MenuIcons, { name });
    };

    // 菜单选项
    const menuOptions: MenuOption[] = [
        {
            label: t('homePage.menu.profile'),
            key: 'profile',
            icon: renderMenuIcon('profile'),
        },
        {
            label: t('homePage.menu.subscription'),
            key: 'subscription',
            icon: renderMenuIcon('subscription'),
        },
        {
            label: t('homePage.menu.usage'),
            key: 'usage',
            icon: renderMenuIcon('usage'),
        },
        {
            label: t('homePage.menu.activity'),
            key: 'activity',
            icon: renderMenuIcon('activity'),
        },
    ];

    // 处理菜单选择
    const handleMenuSelect = (key: string) => {
        activeMenuKey.value = key as MenuKey;
        // 更新URL参数
        router.replace({
            query: { ...route.query, tab: key },
        });
    };

    // 根据菜单设置加载状态
    const setMenuLoading = (menuKey: MenuKey, loading: boolean) => {
        menuLoadingStates.value[menuKey] = loading;
    };

    // 标记菜单为已加载
    const markMenuAsLoaded = (menuKey: MenuKey) => {
        menuLoadedStates.value[menuKey] = true;
    };

    // 检查菜单是否已加载
    const isMenuLoaded = (menuKey: MenuKey) => {
        return menuLoadedStates.value[menuKey];
    };

    // 重置usage菜单的加载状态（允许根据时间范围重新加载）
    const resetUsageMenuLoadedState = () => {
        menuLoadedStates.value.usage = false;
    };

    // 初始化菜单状态
    initMenuFromRoute();

    return {
        activeMenuKey,
        menuOptions,
        handleMenuSelect,
        menuLoadingStates,
        menuLoadedStates,
        setMenuLoading,
        markMenuAsLoaded,
        isMenuLoaded,
        resetUsageMenuLoadedState,
    };
}
