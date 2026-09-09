import type { CreditMaintenance } from '@/api/bos/announcement.bo';
import { getStaticJson } from '@/utils/request';

export function getCreditMaintenance(): Promise<CreditMaintenance> {
    return getStaticJson('/costrict-static/announcement/credit-maintain.json');
}
