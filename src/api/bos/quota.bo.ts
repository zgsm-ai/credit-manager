/**
 * @file quota types
 */

export interface QuotaList {
    amount: number;
    expiry_date: string;
}

export interface UsageConsumptionRecord {
    id: number;
    user_id: string;
    model: string;
    mode: string;
    tokens: number;
    credits_used: number;
    package: string;
    record_time: string;
    create_time: string;
    update_time: string;
}

export interface GetUsageStatisticsReq {
    page: number;
    page_size: number;
    start_time?: string;
    end_time?: string;
    time_range?: string;
}

export interface GetUsageStatisticsRes {
    records: Array<UsageConsumptionRecord>;
    total: number;
    page: number;
    page_size: number;
}

export interface GetUserQuotaRes {
    total_quota: number;
    used_quota: number;
    quota_list: Array<QuotaList>;
    is_star?: string;
}

export interface GetQuotaAuditRecordsReq {
    page: number;
    page_size: number;
}

export interface DetailItems {
    amount: number;
    expiry_date: string;
    status: string;
}

interface RecordDetail {
    operation: string;
    items: Array<DetailItems>;
}

export interface QuotaAuditRecord {
    amount: number;
    operation: string;
    voucher_code: string;
    related_user: string;
    strategy_name: string;
    expiry_date: string;
    create_time: string;
    details: RecordDetail;
}

export interface GetQuotaAuditRecordsRes {
    total: number;
    records: Array<QuotaAuditRecord>;
}

export interface PostQuotaTransferOutReq {
    receiver_id: string;
    quota_list: Array<QuotaList>;
}

export interface PostQuotaTransferOutRes {
    voucher_code: string;
    related_user: string;
    operation: string;
    quota_list: Array<QuotaList>;
}

export interface PostQuotaTransferInReq {
    voucher_code: string;
}

export interface QuotaTransferInQuotaList extends QuotaList {
    is_expired: boolean;
    success: boolean;
}

export interface PostQuotaTransferInRes {
    giver_id: string;
    giver_name: string;
    giver_phone: string;
    giver_github: string;
    receiver_id: string;
    quota_list: Array<QuotaTransferInQuotaList>;
    voucher_code: string;
    operation: string;
    status: string;
    message: string;
}

export interface GetUserTokenRes {
    access_token: string;
    message: string;
    state: string;
    success: boolean;
}

export interface UserInfoData {
    email: string;
    githubID: string;
    githubName: string;
    phone: string;
    username: string;
    uuid: string;
    employee_number?: string;
    isPrivate?: boolean;
}

export type GetUserInfoRes = UserInfoData;

export interface GetBindAccountReq {
    bindType: string;
    state: string;
}

export interface GetBindAccountRes {
    url: string;
    message: string;
    success: boolean;
}

export interface GetInviteCodeRes {
    invite_code: string;
}

export interface GetLoginUrlReq {
    inviter_code: string;
}

export interface GetLoginUrlRes {
    url: string;
}

export interface GetOrdersReq {
    page: number;
    page_size: number;
}

export interface Order {
    id: number;
    order_id: string;
    user_id: string;
    amount: number;
    status: string;
    quota_type: string;
    order_source: string;
    credit_count: number;
    credit_expire_date: string;
    created_at: string;
    updated_at: string;
}

export interface GetOrdersRes {
    orders: Array<Order>;
    total: number;
    limit: number;
    offset: number;
}
