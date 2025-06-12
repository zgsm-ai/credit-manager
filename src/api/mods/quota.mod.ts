/**
 * @file quota api
 */

import { get, post } from '@/utils/request'
import type {
    GetQuotaAuditRecordsReq,
    GetQuotaAuditRecordsRes,
    GetUserQuotaRes,
    PostQuotaTransferInReq,
    PostQuotaTransferInRes,
    PostQuotaTransferOutReq,
    PostQuotaTransferOutRes,
} from '../bos/quota.bo'

export const getUserQuota = (): Promise<GetUserQuotaRes> => {
    return get('/api/v1/quota')
}

export const getQuotaAuditRecords = (
    params: GetQuotaAuditRecordsReq,
): Promise<GetQuotaAuditRecordsRes> => {
    return get('/api/v1/quota/audit', params)
}

export const postQuotaOut = (params: PostQuotaTransferOutReq): Promise<PostQuotaTransferOutRes> => {
    return post('/api/v1/quota/transfer-out', params)
}

export const postQuotaIn = (params: PostQuotaTransferInReq): Promise<PostQuotaTransferInRes> => {
    return post('/api/v1/quota/transfer-in', params)
}
