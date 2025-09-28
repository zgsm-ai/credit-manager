/**
 * @file 运营活动模块常量文件
 */

import { h } from 'vue';
import type { OperationGuide, QaContent, RuleItem } from './interface';
import task1_step1_2xImg from '../../assets/operation/task1_step1@2x.png';
import task1_step2Img from '../../assets/operation/task1_step2@2x.png';
import task2_step1Img from '../../assets/operation/task2_step1@2x.png';
import task3_step1Img from '../../assets/operation/task3_step1@2x.png';
import task3_step2Img from '../../assets/operation/task3_step2@2x.png';
import task3_step3Img from '../../assets/operation/task3_step3@2x.png';
import en_task1_step1Img from '../../assets/operation/task1_step1_en@2x.png';
import en_task1_step2Img from '../../assets/operation/task1_step2_en@2x.png';
import en_task2_step1Img from '../../assets/operation/task2_step1_en@2x.png';
import en_task3_step1Img from '../../assets/operation/task3_step1_en@2x.png';
import en_task3_step2Img from '../../assets/operation/task3_step2_en@2x.png';

const origin = window.location.origin;

const homePageUrl = `${origin}/credit/manager`;

const renderCreditsText = (part: string) => {
    if (/^\d+\s+Credits$/.test(part)) {
        const number = part.match(/(\d+)/)?.[0] || '';
        const creditsText = ' Credits';
        return [
            h('span', { style: { color: 'rgba(18, 255, 187, 1)' } }, `${number}${creditsText}`),
        ];
    }
    return part;
};

// 创建翻译函数，接收 t 函数作为参数
export const createOperationGuide = (
    t: (key: string) => string,
    url: string,
    isZh: boolean,
): OperationGuide[] => [
    {
        title: t('rewardPlan.operationGuide.task1Title'),
        steps: [
            {
                index: 1,
                headerRender: () =>
                    h('p', {}, [
                        t('rewardPlan.operationGuide.pleaseLoginFirst'),
                        h(
                            'a',
                            { class: 'text-[#4394FF] cursor-pointer', href: url, target: '_blank' },
                            t('rewardPlan.operationGuide.loginNow'),
                        ),
                        t('rewardPlan.qa.leftParenthesis'),
                        t('rewardPlan.operationGuide.linkAddress'),
                        h(
                            'a',
                            { class: 'text-[#4394FF] cursor-pointer', href: url, target: '_blank' },
                            url,
                        ),
                        t('rewardPlan.qa.rightParenthesis'),
                    ]),
                content: t('rewardPlan.operationGuide.step1Content'),
                tips: t('rewardPlan.operationGuide.step1Tips'),
                image: isZh ? task1_step1_2xImg : en_task1_step1Img,
                imageClass: 'w-200',
            },
            {
                index: 2,
                header: t('rewardPlan.operationGuide.step2Header'),
                image: isZh ? task1_step2Img : en_task1_step2Img,
                imageClass: 'w-191',
            },
        ],
    },
    {
        title: t('rewardPlan.operationGuide.task2Title'),
        steps: [
            {
                index: 1,
                headerRender: () =>
                    h('p', {}, [
                        t('rewardPlan.operationGuide.visitGithub'),
                        h(
                            'a',
                            {
                                class: 'text-[#4394FF] cursor-pointer',
                                href: 'https://github.com/zgsm-ai/costrict',
                                target: '_blank',
                            },
                            t('rewardPlan.operationGuide.goNow'),
                        ),
                        t('rewardPlan.qa.leftParenthesis'),
                        t('rewardPlan.operationGuide.linkAddress'),
                        h(
                            'a',
                            {
                                class: 'text-[#4394FF] cursor-pointer',
                                href: 'https://github.com/zgsm-ai/costrict',
                                target: '_blank',
                            },
                            'https://github.com/zgsm-ai/costrict',
                        ),
                        t('rewardPlan.qa.rightParenthesis'),
                    ]),
                tips: t('rewardPlan.operationGuide.step2Tips'),
                image: isZh ? task2_step1Img : en_task2_step1Img,
                imageClass: 'w-200',
            },
        ],
    },
    {
        title: t('rewardPlan.operationGuide.task3Title'),
        steps: [
            {
                index: 1,
                headerRender: () =>
                    h('p', {}, [
                        t('rewardPlan.operationGuide.completePluginInstall'),
                        h(
                            'a',
                            {
                                class: 'text-[#4394FF] cursor-pointer',
                                href: 'https://docs.costrict.ai/category/getting-started',
                                target: '_blank',
                            },
                            t('rewardPlan.operationGuide.viewDocs'),
                        ),
                        t('rewardPlan.qa.leftParenthesis'),
                        t('rewardPlan.operationGuide.linkAddress'),
                        h(
                            'a',
                            {
                                class: 'text-[#4394FF] cursor-pointer',
                                href: 'https://docs.costrict.ai/category/getting-started',
                                target: '_blank',
                            },
                            'https://docs.costrict.ai/category/getting-started',
                        ),
                        t('rewardPlan.qa.rightParenthesis'),
                    ]),
            },
        ],
    },
];

// 创建规则内容数据
export const createRulesContent = (t: (key: string) => string): RuleItem[] => [
    {
        key: 1,
        label: t('rewardPlan.rules.inviterLabel'),
        text: [t('rewardPlan.rules.inviterText1'), t('rewardPlan.rules.inviterText2')],
        descriptionRender: () => {
            const description = t('rewardPlan.rules.inviterDescription');
            const parts = description.split(/(\d+\s+Credits)/);

            return h('span', {}, parts.map(renderCreditsText));
        },
    },
    {
        key: 2,
        label: t('rewardPlan.rules.newUserLabel'),
        text: [t('rewardPlan.rules.newUserText1'), t('rewardPlan.rules.newUserText2')],
        descriptionRender: () => {
            const description = t('rewardPlan.rules.newUserDescription');
            const parts = description.split(/(\d+\s+Credits)/);

            return h('span', {}, parts.map(renderCreditsText));
        },
    },
];

// 创建QA内容
export const createQaContent = (t: (key: string) => string, isZh: boolean): QaContent[] => [
    {
        question: t('rewardPlan.qa.question1'),
        answer: [
            () =>
                h('p', {}, [
                    t('rewardPlan.qa.answer1'),
                    h(
                        'a',
                        {
                            class: 'text-[#4394FF] cursor-pointer',
                            href: homePageUrl,
                            target: '_blank',
                        },
                        t('rewardPlan.qa.goNow'),
                    ),
                    t('rewardPlan.qa.leftParenthesis'),
                    t('rewardPlan.qa.linkAddress'),
                    h(
                        'a',
                        {
                            class: 'text-[#4394FF] cursor-pointer',
                            href: homePageUrl,
                            target: '_blank',
                        },
                        homePageUrl,
                    ),
                    t('rewardPlan.qa.rightParenthesis'),
                ]),
            () => h('img', { src: isZh ? task3_step1Img : en_task3_step1Img, class: 'mt-4 w-200' }),
            () => h('img', { src: isZh ? task3_step2Img : en_task3_step2Img, class: 'mt-3 w-200' }),
        ],
    },
    {
        question: t('rewardPlan.qa.question2'),
        answer: [
            () =>
                h('p', {}, [
                    "Credits are typically deposited within a few minutes. If you haven't received them after an extended period, please contact us via email: ",
                    h(
                        'a',
                        {
                            class: 'text-[#4394FF] cursor-pointer',
                            href: 'mailto:zgsm@sangfor.com.cn',
                        },
                        'zgsm@sangfor.com.cn',
                    ),
                    '. We will respond as soon as possible.',
                ]),
            () =>
                h(
                    'p',
                    { class: 'mt-2' },
                    isZh
                        ? [
                              t('rewardPlan.qa.accountBinding'),
                              t('rewardPlan.qa.leftParenthesis'),
                              t('rewardPlan.qa.linkAddress'),
                              h(
                                  'a',
                                  {
                                      class: 'text-[#4394FF] cursor-pointer',
                                      href: homePageUrl,
                                      target: '_blank',
                                  },
                                  homePageUrl,
                              ),
                              t('rewardPlan.qa.basicInfoModule'),
                          ]
                        : [],
                ),
            isZh ? () => h('img', { src: task3_step3Img, class: 'mt-4 w-200' }) : '',
        ],
    },
];
