<template>
    <div class="subscription-section relative">
        <img
            class="absolute top-36 left-[-10px] w-55"
            src="../../../assets/subscription/bg_1.png"
            alt=""
        />
        <img
            class="absolute top-60 left-124 w-55"
            src="../../../assets/subscription/bg_2.png"
            alt=""
        />
        <img
            class="absolute top-37 left-155 w-28"
            src="../../../assets/subscription/bg_3.png"
            alt=""
        />
        <img
            class="absolute top-60 left-233 w-55"
            src="../../../assets/subscription/bg_4.png"
            alt=""
        />
        <img
            class="absolute top-37 left-264 w-28"
            src="../../../assets/subscription/bg_5.png"
            alt=""
        />
        <!-- 订阅信息 -->
        <div class="subscription-title flex items-center">
            <span class="text-base">{{ t('subscriptionSection.subscriptionTitle') }}</span>
            <span
                class="billing-btn cursor-pointer ml-2.5"
                @click="toBillingDocs"
                >{{ t('subscriptionSection.billingDescription') }}</span
            >
        </div>
        <div class="mt-4">{{ t('homePageUi.tips') }}</div>
        <div class="subscription-content mt-4">
            <div class="content-version grid grid-cols-4 gap-5">
                <div
                    v-for="(plan, index) in pricingPlans"
                    :key="index"
                    class="content-version__item min-88 px-5 py-6 relative"
                >
                    <div
                        v-if="plan.showTrafficLabel"
                        class="absolute right-0 top-[-4px]"
                    >
                        <img
                            src="../../../assets/label-bg.webp"
                            alt=""
                        />
                        <span class="absolute top-1 left-7 label-text">{{
                            t('subscriptionSection.trafficLabel')
                        }}</span>
                    </div>
                    <div class="content-version__item-title text-base">{{ plan.title }}</div>
                    <div class="content-version__item-price flex items-center text-3xl mt-3">
                        <span class="price-unit ml-[-8px]">￥</span>
                        <span class="price">{{ plan.price }}</span>
                        <span
                            v-if="plan.originalPrice"
                            class="original-price text-line-through text-base ml-2.5 mt-0.5"
                        >
                            ￥{{ plan.originalPrice }}
                        </span>
                    </div>
                    <div class="content-version__item-desc mt-2.5 text-xs">
                        {{ plan.description }}
                    </div>
                    <div
                        class="content-version__item-btn h-10 text-center leading-10 mt-6 rounded-sm"
                        :class="{
                            'btn-purchase': plan.buttonType === 'purchase',
                        }"
                        @click="plan.clickEvent"
                    >
                        {{ plan.buttonText }}
                    </div>
                    <ul class="content-version__item-features text-xs mt-4">
                        <li
                            v-for="(feature, featureIndex) in plan.features"
                            :key="featureIndex"
                            class="mb-4"
                        >
                            <div class="flex items-start">
                                <img
                                    v-if="feature.available"
                                    src="../../../assets/icon/y.svg"
                                    alt="available"
                                    class="mt-1"
                                />
                                <img
                                    v-else
                                    src="../../../assets/icon/x.svg"
                                    alt="unavailable"
                                    class="mt-1"
                                />
                                <p class="ml-2">{{ feature.text }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 操作指引 -->
        <div class="subscription-operation mt-2.5">
            <n-collapse
                :default-expanded-names="[]"
                arrow-placement="right"
            >
                <n-collapse-item name="operation-guide">
                    <template #header>
                        <div class="flex items-center">
                            <img
                                src="../../../assets/price/light.svg"
                                alt=""
                                class="w-4"
                            />
                            <span class="ml-1">{{ t('subscriptionSection.operationGuide') }}</span>
                        </div>
                    </template>
                    <!-- 展开的内容后续补充 -->
                    <div class="operation-content">
                        <!-- 这里后续添加操作指引的具体内容 -->
                        <n-timeline :icon-size="20">
                            <n-timeline-item
                                v-for="(step, index) in guideSteps"
                                :key="index"
                                :title="typeof step.title === 'function' ? undefined : step.title"
                                line-type="dashed"
                                color="#4083E8"
                            >
                                <template #icon>
                                    <div class="timeline-icon">{{ index + 1 }}</div>
                                </template>
                                <template
                                    #header
                                    v-if="typeof step.title === 'function'"
                                >
                                    <component :is="step.title" />
                                </template>
                                <div class="step-wrapper">
                                    <div class="step-content-area">
                                        <div
                                            class="step-content"
                                            v-if="step.content"
                                        >
                                            <component
                                                v-if="typeof step.content === 'function'"
                                                :is="step.content"
                                            />
                                            <template v-else>{{ step.content }}</template>
                                        </div>
                                    </div>
                                    <div
                                        v-if="step.imageTextPairs && step.imageTextPairs.length > 0"
                                        class="image-text-pairs"
                                    >
                                        <div
                                            v-for="(pair, pairIndex) in step.imageTextPairs"
                                            :key="pairIndex"
                                            class="image-text-item"
                                        >
                                            <component
                                                v-if="pair.imgUrl"
                                                :is="
                                                    typeof pair.imgUrl === 'function'
                                                        ? pair.imgUrl
                                                        : 'img'
                                                "
                                                :src="
                                                    typeof pair.imgUrl === 'string'
                                                        ? pair.imgUrl
                                                        : undefined
                                                "
                                                :alt="
                                                    typeof pair.text === 'function'
                                                        ? undefined
                                                        : pair.text
                                                "
                                                class="step-image"
                                            />
                                            <div class="image-text">
                                                <component
                                                    v-if="typeof pair.text === 'function'"
                                                    :is="pair.text"
                                                />
                                                <template v-else>{{ pair.text }}</template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </n-timeline-item>
                        </n-timeline>
                    </div>
                </n-collapse-item>
            </n-collapse>
        </div>
        <!-- 开通记录 -->
        <div class="subscription-records mt-9">
            <common-card :title="t('subscriptionSection.recordsTitle')">
                <n-data-table
                    :columns="recordColumns"
                    :data="recordsData"
                    :bordered="false"
                    :max-height="240"
                    size="small"
                    :loading="loading"
                    :pagination="paginationConfig"
                    remote
                />
            </common-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @file subscription-section.vue
 * @description 订阅管理组件 - 显示订阅管理的基本信息
 */
import { computed, ref } from 'vue';
import { getPricingPlans, getGuideSteps } from '../const';
import { NCollapse, NCollapseItem, NTimeline, NTimelineItem, NDataTable } from 'naive-ui';
import { formatDate } from '@/utils/date';
import CommonCard from '@/components/common-card.vue';
import type { Order } from '@/api/bos/quota.bo';
import { useI18n } from 'vue-i18n';

// 国际化
const { t } = useI18n();

// 计算国际化的价格计划
const pricingPlans = computed(() => getPricingPlans(t));

// 计算国际化的引导步骤
const guideSteps = computed(() => getGuideSteps(t));

// Props 定义
const props = withDefaults(
    defineProps<{
        recordsData: Order[];
        total?: number;
        page?: number;
        pageSize?: number;
        loading?: boolean;
    }>(),
    {
        recordsData: () => [],
        total: 0,
        page: 1,
        pageSize: 10,
        loading: false,
    },
);

// 分页相关状态
const currentPage = ref(props.page);
const pageSizeRef = ref(props.pageSize);

// 定义事件
const emit = defineEmits<{
    'update:page': [page: number];
    'update:pageSize': [pageSize: number];
}>();

// 分页配置
const paginationConfig = computed(() => ({
    page: currentPage.value,
    pageSize: pageSizeRef.value,
    pageCount: Math.ceil(props.total / pageSizeRef.value),
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    prefix: () => t('subscriptionSection.totalItems', { total: props.total }),
    onChange: (page: number) => {
        currentPage.value = page;
        emit('update:page', page);
    },
    onUpdatePageSize: (pageSize: number) => {
        pageSizeRef.value = pageSize;
        currentPage.value = 1; // 重置到第一页
        emit('update:pageSize', pageSize);
    },
}));

// 开通记录表格列配置
const recordColumns = computed(() => [
    {
        title: t('subscriptionSection.orderNumber'),
        key: 'order_id',
        width: 180,
    },
    {
        title: t('subscriptionSection.orderType'),
        key: 'quota_type',
        width: 120,
    },
    {
        title: t('subscriptionSection.orderSource'),
        key: 'order_source',
        width: 120,
    },
    {
        title: t('subscriptionSection.purchaseCount'),
        key: 'credit_count',
        width: 100,
    },
    {
        title: t('subscriptionSection.orderAmount'),
        key: 'amount',
        width: 120,
        render: (row: Order) => `￥${row.amount}`,
    },
    {
        title: t('subscriptionSection.orderTime'),
        key: 'created_at',
        width: 180,
        render: (row: Order) => formatDate(row.created_at),
    },
    {
        title: t('subscriptionSection.validityPeriod'),
        key: 'credit_expire_date',
        width: 180,
        render: (row: Order) => formatDate(row.credit_expire_date),
    },
]);

const toBillingDocs = () => {
    window.open('https://docs.costrict.ai/billing/purchase');
};
</script>

<style scoped lang="less">
.subscription-section {
    color: white;
    .subscription-title {
        .billing-btn {
            background: linear-gradient(95deg, #2a7fff 5%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }
    }
    .content-version {
        @media (max-width: 1320px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        &__item {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 10px;
            z-index: 0;
            padding: 24px 20px;

            &-btn {
                background: rgba(255, 255, 255, 0.2);
                cursor: pointer;
                transition: all 0.3s ease;

                &.btn-download {
                    background: rgba(0, 102, 255, 0.3);
                    border: 1px solid rgba(0, 102, 255, 0.5);

                    &:hover {
                        background: rgba(0, 102, 255, 0.5);
                        box-shadow: 0 0 10px rgba(0, 102, 255, 0.3);
                    }
                }

                &.btn-purchase {
                    background: linear-gradient(91deg, #005eff -9%, #00ffb7 104%);
                }
            }

            .original-price {
                text-decoration: line-through;
                color: rgba(255, 255, 255, 0.7);
            }

            .label-text {
                background: linear-gradient(185deg, #005eff 35%, #00ffb7 93%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }

        &__item::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 1px;
            border-radius: 10px;
            background: linear-gradient(
                176deg,
                #0066ff -7%,
                #00ffb7 16%,
                rgba(247, 255, 253, 0.51) 51%,
                rgba(0, 94, 255, 0.09) 99%
            );
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            z-index: -1;
        }
    }
}

.subscription-operation {
    .operation-content {
        .timeline-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            font-size: 12px;
            color: #fff;
            background: #4083e8;
        }

        .step-wrapper {
            .step-content-area {
                width: 100%;
            }

            .step-image {
                width: 100%;
                height: auto;
            }

            .image-text-pairs {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-top: 16px;
            }
        }

        :deep(.n-timeline-item) {
            .n-timeline-item-content__title {
                color: #f4f8ff;
                font-size: 12px;
                margin-top: 2px;
                line-height: 20px;
            }

            .n-timeline-item-timeline__line {
                --n-color-start: #4083e8;
            }

            .n-timeline-item-timeline__circle {
                background: #4083e8;
            }
        }
    }
}

.subscription-records {
    :deep(.n-data-table) {
        background: transparent;

        .n-data-table-thead {
            background: rgba(255, 255, 255, 0.1);
        }

        .n-data-table-tbody {
            background: transparent;
        }

        .n-data-table-tr {
            background: transparent;
            color: #fff;

            &:hover {
                background: rgba(255, 255, 255, 0.05);
            }
        }

        .n-data-table-td {
            color: #fff;
            opacity: 0.8;
        }

        .n-data-table-th {
            color: #fff;
            opacity: 0.9;
            font-weight: 500;
        }

        .n-base-loading__icon {
            color: #1876f2;
        }
    }
}
/deep/.jd-step {
    @media (max-width: 968px) {
        flex-direction: column;

        img {
            align-self: start;
        }

        img:last-of-type {
            margin-top: 10px;
            margin-left: 0;
        }
    }

    @media (max-width: 768px) {
        img {
            height: 300px;
        }
    }
}
</style>
