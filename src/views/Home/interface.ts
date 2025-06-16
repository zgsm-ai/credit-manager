/**
 * @file home type
 */
import type { QuotaList } from "@/api/bos/quota.bo"

export interface RowData extends QuotaList {
    id: number
    transferAmount: number
}

export interface FormModel {
    receiverId: string
    redeemCode: string
    checkedRowKeys: number[]
}
