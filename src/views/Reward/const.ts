/**
 * @file 运营活动模块常量文件
 */

import { h } from 'vue';
import type { OperationGuide, QaContent, RuleItem } from './interface';
import task1_step1Img from '../../assets/operation/task1_step1.png';
import task1_step2Img from '../../assets/operation/task1_step2.png';
import task2_step1Img from '../../assets/operation/task2_step1.png';
import task3_step1Img from '../../assets/operation/task3_step1.png';
import task3_step2Img from '../../assets/operation/task3_step2.png';
import task3_step3Img from '../../assets/operation/task3_step3.png';

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
export const createOperationGuide = (t: (key: string) => string): OperationGuide[] => [
    {
        title: t('rewardPlan.operationGuide.task1Title'),
        steps: [
            {
                index: 1,
                headerRender: () =>
                    h('p', {}, [
                        t('rewardPlan.operationGuide.pleaseLoginFirst'),
                        h(
                            'span',
                            { class: 'text-[#4394FF] cursor-pointer' },
                            t('rewardPlan.operationGuide.loginNow'),
                        ),
                        t('rewardPlan.operationGuide.linkAddress'),
                        '（',
                        h('span', { class: 'text-[#4394FF] cursor-pointer' }, 'xxxxxxxxxxxxxxxxxx'),
                        '）',
                    ]),
                content: t('rewardPlan.operationGuide.step1Content'),
                tips: t('rewardPlan.operationGuide.step1Tips'),
                image: task1_step1Img,
            },
            {
                index: 2,
                header: t('rewardPlan.operationGuide.step2Header'),
                image: task1_step2Img,
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
                            'span',
                            { class: 'text-[#4394FF] cursor-pointer' },
                            t('rewardPlan.operationGuide.goNow'),
                        ),
                        t('rewardPlan.operationGuide.linkAddress'),
                        '（',
                        h(
                            'span',
                            { class: 'text-[#4394FF] cursor-pointer' },
                            'https://github.com/zgsm-ai/zgsm',
                        ),
                        '）',
                    ]),
                tips: t('rewardPlan.operationGuide.step2Tips'),
                image: task2_step1Img,
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
                            'span',
                            { class: 'text-[#4394FF] cursor-pointer' },
                            t('rewardPlan.operationGuide.viewDocs'),
                        ),
                        t('rewardPlan.operationGuide.linkAddress'),
                        '（',
                        h(
                            'span',
                            { class: 'text-[#4394FF] cursor-pointer' },
                            'https://docs.costrict.ai/category/getting-started',
                        ),
                        '）',
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
export const createQaContent = (t: (key: string) => string): QaContent[] => [
    {
        question: t('rewardPlan.qa.question1'),
        answer: [
            () =>
                h('p', {}, [
                    t('rewardPlan.qa.answer1'),
                    h('span', { class: 'text-[#4394FF] cursor-pointer' }, t('rewardPlan.qa.goNow')),
                    t('rewardPlan.qa.linkAddress'),
                    '（',
                    h(
                        'span',
                        { class: 'text-[#4394FF] cursor-pointer' },
                        'https://github.com/zgsm-ai/zgsm',
                    ),
                    '）',
                ]),
            () => h('img', { src: task3_step1Img, class: 'mt-4' }),
            () => h('img', { src: task3_step2Img, class: 'mt-3' }),
        ],
    },
    {
        question: t('rewardPlan.qa.question2'),
        answer: [
            t('rewardPlan.qa.answer2'),
            () =>
                h('p', { class: 'mt-2' }, [
                    t('rewardPlan.qa.accountBinding'),
                    t('rewardPlan.qa.linkAddress'),
                    '（',
                    h('span', { class: 'text-[#4394FF] cursor-pointer' }, 'xxxxxxxxxxxx'),
                    t('rewardPlan.qa.basicInfoModule'),
                ]),
            () => h('img', { src: task3_step3Img, class: 'mt-4' }),
        ],
    },
];
