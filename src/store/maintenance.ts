import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { getCreditMaintenance } from '@/api/mods/announcement.mod';
import type { CreditMaintenance } from '@/api/bos/announcement.bo';

export function isMaintenanceActive(config: CreditMaintenance | null, now: number): boolean {
    if (config?.maintain !== true) return false;
    const parse = (value: string): number => {
        if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) return NaN;
        const timestamp = Date.parse(value.replace(' ', 'T') + '+08:00');
        if (!Number.isFinite(timestamp)) return NaN;
        const normalized = new Date(timestamp + 8 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');
        return normalized === value ? timestamp : NaN;
    };
    const start = parse(config.start_time);
    const end = parse(config.end_time);
    return now >= start && now < end;
}

export const useMaintenanceStore = defineStore('maintenance', () => {
    const announcement = ref<CreditMaintenance | null>(null);
    const now = ref(Date.now());
    const ready = ref(false);
    let pending: Promise<void> | null = null;
    const active = computed(() => isMaintenanceActive(announcement.value, now.value));
    const quotaAffected = computed(
        () => active.value && announcement.value?.impacts?.quota?.affected === true,
    );
    const orderAffected = computed(
        () => active.value && announcement.value?.impacts?.order?.affected === true,
    );

    function isTabBlocked(tab: unknown): boolean {
        return (
            (quotaAffected.value && (tab === 'usage' || tab === 'usage-consumption')) ||
            (orderAffected.value && tab === 'subscription')
        );
    }

    async function refresh(): Promise<void> {
        if (pending) return pending;
        pending = (async () => {
            try {
                announcement.value = await getCreditMaintenance();
            } catch (error) {
                // 首次失败不阻断系统，刷新失败保留上次公告并继续按时间判断。
                console.error('Failed to load maintenance announcement:', error);
            } finally {
                now.value = Date.now();
                ready.value = true;
            }
        })();
        try {
            await pending;
        } finally {
            pending = null;
        }
    }

    return {
        announcement,
        now,
        ready,
        active,
        quotaAffected,
        orderAffected,
        isTabBlocked,
        refresh,
    };
});
