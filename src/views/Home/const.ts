/**
 * @file home const
 */

import type { Router } from 'vue-router';
import type { PricingPlan } from './interface';

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

// 发票状态值常量
export const INVOICE_STATUS = {
    PENDING: 0, // 待开票
    PROCESSING: 1, // 开票中
    COMPLETED: 2, // 已开票
    CANCELLED: 3, // 已作废
} as const;

// 发票相关常量生成函数，使用国际化
export const getInvoiceConstants = (t: (key: string) => string) => ({
    // 抬头类型
    HEADER_TYPE: {
        COMPANY: 'company',
        PERSONAL: 'personal',
    },
    // 发票类型
    INVOICE_TYPE: {
        VAT: 'vat',
        SPECIAL: 'special',
    },
    // 发票状态
    STATUS: INVOICE_STATUS,
    // 发票状态颜色
    STATUS_COLORS: {
        [INVOICE_STATUS.PENDING]: '#FFC300', // 待开票 - 橙色
        [INVOICE_STATUS.PROCESSING]: '#4A90E2', // 开票中 - 蓝色
        [INVOICE_STATUS.COMPLETED]: '#52C41A', // 已开票 - 绿色
        [INVOICE_STATUS.CANCELLED]: '#8C8C8C', // 已作废 - 灰色
    } as Record<number, string>,
    // 发票状态文本
    STATUS_TEXT: {
        [INVOICE_STATUS.PENDING]: t('invoiceStatus.pending'),
        [INVOICE_STATUS.PROCESSING]: t('invoiceStatus.processing'),
        [INVOICE_STATUS.COMPLETED]: t('invoiceStatus.completed'),
        [INVOICE_STATUS.CANCELLED]: t('invoiceStatus.cancelled'),
    } as Record<number, string>,
});

// 套餐配置生成函数，使用国际化
export const getPricingPlans = (t: (key: string) => string, router: Router): PricingPlan[] => [
    {
        title: t('pricingPlans.personalFree.title'),
        price: 0,
        description: t('pricingPlans.personalFree.description'),
        buttonText: t('pricingPlans.personalFree.buttonText'),
        buttonType: 'download',
        showTrafficLabel: false,
        features: [
            {
                text: t('pricingPlans.personalFree.features.newUserCredits'),
                available: true,
            },
            {
                text: t('pricingPlans.personalFree.features.freeCodeCompletion'),
                available: true,
            },
            {
                text: t('pricingPlans.personalFree.features.freeCodeReview'),
                available: true,
            },
            {
                text: t('pricingPlans.personalFree.features.advancedModelUnavailable'),
                available: false,
            },
        ],
        clickEvent() {
            window.open('https://costrict.ai/download');
        },
    },
    {
        title: t('pricingPlans.trafficPackage1.title'),
        price: 25,
        originalPrice: 50,
        description: t('pricingPlans.trafficPackage1.description'),
        buttonText: t('pricingPlans.trafficPackage1.buttonText'),
        buttonType: 'purchase',
        showTrafficLabel: true,
        features: [
            {
                text: t('pricingPlans.trafficPackage1.features.credits'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage1.features.freeCodeCompletion'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage1.features.freeCodeReview'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage1.features.advancedModelAvailable'),
                available: true,
            },
        ],
        clickEvent() {
            router.push({
                path: '/subscribe',
                query: {
                    type: 1,
                },
            });
        },
    },
    {
        title: t('pricingPlans.trafficPackage2.title'),
        price: 98,
        originalPrice: 200,
        description: t('pricingPlans.trafficPackage2.description'),
        buttonText: t('pricingPlans.trafficPackage2.buttonText'),
        buttonType: 'purchase',
        showTrafficLabel: true,
        features: [
            {
                text: t('pricingPlans.trafficPackage2.features.credits'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage2.features.freeCodeCompletion'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage2.features.freeCodeReview'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage2.features.advancedModelAvailable'),
                available: true,
            },
        ],
        clickEvent() {
            router.push({
                path: '/subscribe',
                query: {
                    type: 2,
                },
            });
        },
    },
    {
        title: t('pricingPlans.trafficPackage3.title'),
        price: 248,
        originalPrice: 500,
        description: t('pricingPlans.trafficPackage3.description'),
        buttonText: t('pricingPlans.trafficPackage3.buttonText'),
        buttonType: 'purchase',
        showTrafficLabel: true,
        features: [
            {
                text: t('pricingPlans.trafficPackage3.features.credits'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage3.features.freeCodeCompletion'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage3.features.freeCodeReview'),
                available: true,
            },
            {
                text: t('pricingPlans.trafficPackage3.features.advancedModelAvailable'),
                available: true,
            },
        ],
        clickEvent() {
            router.push({
                path: '/subscribe',
                query: {
                    type: 3,
                },
            });
        },
    },
];
