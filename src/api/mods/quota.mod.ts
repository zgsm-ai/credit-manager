/**
 * @file quota api
 */

import { get, post } from '@/utils/request';
import type {
    GetBindAccountReq,
    GetBindAccountRes,
    GetQuotaAuditRecordsReq,
    GetQuotaAuditRecordsRes,
    GetUserInfoRes,
    GetUserQuotaRes,
    GetUserTokenRes,
    PostQuotaTransferInReq,
    PostQuotaTransferInRes,
    PostQuotaTransferOutReq,
    PostQuotaTransferOutRes,
} from '../bos/quota.bo';

export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}

export const getUserQuota = (): Promise<ApiResponse<GetUserQuotaRes>> => {
    return get('/quota-manager/api/v1/quota');
};

export const getQuotaAuditRecords = (
    params: GetQuotaAuditRecordsReq,
): Promise<ApiResponse<GetQuotaAuditRecordsRes>> => {
    return get('/quota-manager/api/v1/quota/audit', params);
};

export const postQuotaOut = (
    params: PostQuotaTransferOutReq,
): Promise<ApiResponse<PostQuotaTransferOutRes>> => {
    return post('/quota-manager/api/v1/quota/transfer-out', params);
};

export const postQuotaIn = (
    params: PostQuotaTransferInReq,
): Promise<ApiResponse<PostQuotaTransferInRes>> => {
    return post('/quota-manager/api/v1/quota/transfer-in', params);
};

export const getUserToken = (): Promise<ApiResponse<GetUserTokenRes>> => {
    return get('/oidc-auth/api/v1/manager/token');
};

export const getUserInfo = (): Promise<ApiResponse<GetUserInfoRes>> => {
    return get('/oidc-auth/api/v1/manager/userinfo');
};

export const getBindAccount = (
    params: GetBindAccountReq,
): Promise<ApiResponse<GetBindAccountRes>> => {
    return get('/oidc-auth/api/v1/manager/bind/account', params);
};
