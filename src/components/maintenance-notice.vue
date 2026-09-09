<template>
    <NAlert
        v-if="maintenance.active && announcement"
        type="warning"
        :title="announcement.title || t('maintenance.title')"
        class="maintenance-notice"
        role="status"
    >
        <p>
            {{
                t('maintenance.time', {
                    start: announcement.start_time,
                    end: announcement.end_time,
                })
            }}
        </p>
        <p v-if="maintenance.quotaAffected">
            {{ t('maintenance.quota', { description: announcement.impacts.quota.description }) }}
        </p>
        <p v-if="maintenance.orderAffected">
            {{ t('maintenance.order', { description: announcement.impacts.order.description }) }}
        </p>
        <p v-if="!maintenance.quotaAffected && !maintenance.orderAffected">
            {{ t('maintenance.noImpact') }}
        </p>
    </NAlert>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NAlert } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { useMaintenanceStore } from '@/store/maintenance';

const { t } = useI18n();
const maintenance = useMaintenanceStore();
const { announcement } = storeToRefs(maintenance);
</script>

<style scoped lang="less">
.maintenance-notice {
    margin: 20px auto;
    max-width: 1300px;
    p {
        margin: 6px 0;
        overflow-wrap: anywhere;
    }
}
</style>
