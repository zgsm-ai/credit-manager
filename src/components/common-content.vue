<template>
    <div class="common-content">
        <div class="common-content-view">
            <router-view />
        </div>
        <common-footer />
    </div>
</template>

<script setup lang="ts">
/**
 * @file common-content.vue
 */
import CommonFooter from '@/components/common-footer.vue';
import { setI18nComposer } from '@/utils/i18n';
import { setMessageInstance } from '@/utils/request';
import { useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const message = useMessage();
setMessageInstance(message);
setI18nComposer(useI18n());
</script>

<style lang="less" scoped>
.common-content {
    min-height: calc(100vh - 68px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-view {
        flex: 1;
    }
}
</style>
