/**
 * @file quota api
 */

import { get, post } from '@/utils/request'
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
} from '../bos/quota.bo'

export const getUserQuota = (): Promise<GetUserQuotaRes> => {
    return get('/quota-manager/api/v1/quota')
}

export const getQuotaAuditRecords = (
    params: GetQuotaAuditRecordsReq,
): Promise<GetQuotaAuditRecordsRes> => {
    return get('/quota-manager/api/v1/quota/audit', params)
}

export const postQuotaOut = (params: PostQuotaTransferOutReq): Promise<PostQuotaTransferOutRes> => {
    return post('/quota-manager/api/v1/quota/transfer-out', params)
}

export const postQuotaIn = (params: PostQuotaTransferInReq): Promise<PostQuotaTransferInRes> => {
    return post('/quota-manager/api/v1/quota/transfer-in', params)
}

export const getUserToken = (): Promise<GetUserTokenRes> => {
    return get('/oidc-auth/api/v1/manager/token')
}

export const getUserInfo = (): Promise<GetUserInfoRes> => {
    return get('/oidc-auth/api/v1/manager/userinfo')
}

export const getBindAccount = (params: GetBindAccountReq): Promise<GetBindAccountRes> => {
    return get('/oidc-auth/api/v1/manager/bind/account', params)
}
