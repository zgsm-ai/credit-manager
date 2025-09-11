<template>
    <n-card class="common-card">
        <template #header>
            <slot name="header">
                <div class="card-header">{{ title }}</div>
            </slot>
        </template>

        <template #header-extra>
            <slot name="header-extra"></slot>
        </template>

        <slot></slot>

        <template #footer>
            <slot name="footer"></slot>
        </template>

        <template #action>
            <slot name="action"></slot>
        </template>
    </n-card>
</template>

<script lang="ts" setup>
import { NCard } from 'naive-ui';

defineProps({
    title: {
        type: String,
        default: '',
    },
});

defineSlots<{
    default?: (props: Record<string, unknown>) => unknown;
    header?: (props: Record<string, unknown>) => unknown;
    'header-extra'?: (props: Record<string, unknown>) => unknown;
    footer?: (props: Record<string, unknown>) => unknown;
    action?: (props: Record<string, unknown>) => unknown;
}>();
</script>

<style lang="less" scoped>
.common-card {
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;

    .card-header {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>
