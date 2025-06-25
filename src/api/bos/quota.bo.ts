/**
 * @file quota types
 */

export interface QuotaList {
    amount: number
    expiry_date: string
}

export interface GetUserQuotaRes {
    total_quota: number
    used_quota: number
    quota_list: Array<QuotaList>
}

export interface GetQuotaAuditRecordsReq {
    page: number
    page_size: number
}

export interface DetailItems {
    amount: number
    expiry_date: string
    status: string
}

interface RecordDetail {
    operation: string
    items: Array<DetailItems>
}

export interface QuotaAuditRecord {
    amount: number
    operation: string
    voucher_code: string
    related_user: string
    strategy_name: string
    expiry_date: string
    create_time: string
    details: RecordDetail
}

export interface GetQuotaAuditRecordsRes {
    total: number
    records: Array<QuotaAuditRecord>
}

export interface PostQuotaTransferOutReq {
    receiver_id: string
    quota_list: Array<QuotaList>
}

export interface PostQuotaTransferOutRes {
    voucher_code: string
    related_user: string
    operation: string
    quota_list: Array<QuotaList>
}

export interface PostQuotaTransferInReq {
    voucher_code: string
}

export interface QuotaTransferInQuotaList extends QuotaList {
    is_expired: boolean
    success: boolean
}

export interface PostQuotaTransferInRes {
    giver_id: string
    giver_name: string
    giver_phone: string
    giver_github: string
    receiver_id: string
    quota_list: Array<QuotaTransferInQuotaList>
    voucher_code: string
    operation: string
    status: string
    message: string
}

export interface GetUserTokenRes {
    access_token: string
    message: string
    state: string
    success: boolean
}

export interface UserInfoData {
    email: string
    githubID: string
    githubName: string
    phone: string
    username: string
    uuid: string,
    employee_number?: string
}

export type GetUserInfoRes = UserInfoData

export interface GetBindAccountReq {
    bindType: string
    state: string
}

export interface GetBindAccountRes {
    URL: string
    message: string
    success: boolean
}
