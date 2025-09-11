/**
 * @file home const
 */

export const BING_TYPE = {
    github: 'github',
    sms: 'sms',
} as const;

export const STATUS = {
    success: 'success',
    error: 'error',
    undefined: undefined,
} as const;

export const TRANSFER_TYPE = {
    out: 'out',
    in: 'in',
} as const;

export const TRANSFER_IN_STATUS = {
    success: 'SUCCESS',
    partialSuccess: 'PARTIAL_SUCCESS',
    alreadyRedeemed: 'ALREADY_REDEEMED',
} as const;
