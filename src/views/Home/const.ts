/**
 * @file home const
 */

import { h } from 'vue';
import type { GuideStep, PricingPlan } from './interface';
import guideStep3Img1 from '../../assets/price/guide_step3_1.png';
import guideStep3Img2 from '../../assets/price/guide_step3_2.png';
import qrCode from '../../assets/price/qr_code.png';
import jdService1Img from '../../assets/price/jd_service1.png';
import jdService2Img from '../../assets/price/jd_service2.png';

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

// 套餐配置生成函数，使用国际化
export const getPricingPlans = (t: (key: string) => string): PricingPlan[] => [
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
            window.open('https://item.jd.com/100295277058.html');
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
            window.open('https://item.jd.com/100295277076.html');
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
            window.open('https://item.jd.com/100295277048.html');
        },
    },
];

// 引导步骤配置生成函数，使用国际化
export const getGuideSteps = (t: (key: string) => string): GuideStep[] => [
    {
        title: () =>
            h('div', { class: 'custom-title leading-5' }, [
                h('span', t('guideSteps.step1.title')),
                h(
                    'a',
                    {
                        href: 'https://docs.costrict.ai/billing/purchase',
                        style: 'color: #2A7FFF; margin-left: 4px; text-decoration: none;',
                        target: '_blank',
                    },
                    t('guideSteps.step1.packageLink'),
                ),
            ]),
    },
    {
        title: t('guideSteps.step2.title'),
    },
    {
        title: () =>
            h('div', { class: 'flex' }, [
                h('div', t('guideSteps.step3.contactCustomerService')),
                h('div', { class: 'text-[#00FFC8] ml-1' }, t('guideSteps.step3.userId')),
                h('div', t('guideSteps.step3.userIdKey')),
            ]),
        imageTextPairs: [
            {
                imgUrl: () =>
                    h('div', { class: 'flex mb-7' }, [
                        h('img', { src: jdService1Img, class: 'h-100' }),
                        h('img', { src: jdService2Img, class: 'h-100 ml-2.5' }),
                    ]),
                text: () =>
                    h('div', { class: 'text-white text-xs' }, [
                        h('span', t('guideSteps.step3.title')),
                        h(
                            'a',
                            {
                                href: 'https://zgsm.sangfor.com/credit/manager/',
                                target: '_blank',
                                style: 'color: #2A7FFF; text-decoration: none;',
                            },
                            'https://zgsm.sangfor.com/credit/manager/',
                        ),
                        h('span', t('guideSteps.step3.titleSuffix')),
                    ]),
            },
            {
                imgUrl: guideStep3Img1,
            },
        ],
    },
    {
        title: () =>
            h('div', { class: 'custom-text' }, [
                h(
                    'p',
                    {
                        class: 'text-white text-xs leading-5 flex',
                    },
                    [
                        h('p', t('guideSteps.step3.rechargeComplete')),
                        h(
                            'a',
                            {
                                href: 'https://zgsm.sangfor.com/credit/manager/?tab=usage',
                                target: '_blank',
                                style: 'color: #2A7FFF; text-decoration: none;',
                            },
                            'https://zgsm.sangfor.com/credit/manager/?tab=usage',
                        ),
                        h('span', t('guideSteps.step3.rightParenthesis')),
                    ],
                ),
                h(
                    'p',
                    {
                        class: 'text-white text-xs mt-1 leading-5 opacity-70',
                    },
                    t('guideSteps.step3.text2'),
                ),
            ]),
        imageTextPairs: [
            {
                imgUrl: guideStep3Img2,
                text: () =>
                    h('div', { class: 'custom-text mt-2.5' }, [
                        h(
                            'p',
                            {
                                class: 'text-white text-xs leading-5 opacity-70',
                            },
                            t('guideSteps.step3.text3'),
                        ),
                        h('img', {
                            src: qrCode,
                            class: 'mt-2',
                        }),
                    ]),
            },
        ],
    },
];
