<template>
    <div class="credit-reward-plan mt-10">
        <div class="text-center text-[28px] font-semibold">{{ t('rewardPlan.title') }}</div>

        <reward-card
            :title="t('rewardPlan.invitationCode')"
            class="mt-15"
            :text="t('rewardPlan.invitationCodeText')"
        >
            <template #label>
                <div class="flex items-center">
                    {{ t('rewardPlan.invitationCodeLabel') }}
                    <span class="text-[#12FFBB]">{{ invateCode }}</span>
                    <n-icon
                        size="14"
                        class="ml-2 cursor-pointer text-[#197DFF]"
                        @click="copyCode"
                    >
                        <copy-outline />
                    </n-icon>
                </div>
            </template>
        </reward-card>

        <reward-card
            :title="t('rewardPlan.rulesTitle')"
            class="mt-10"
            :content="rulesContent"
        />

        <reward-card
            class="mt-10"
            content-class="mt-5"
        >
            <template #header>
                <div class="flex opertion-rule self-start items-end">
                    <span class="text-xl">{{ t('rewardPlan.operationGuideTitle') }}</span>
                    <span class="text-sm">{{ t('rewardPlan.operationGuideSubtitle') }}</span>
                </div>
            </template>

            <template #content>
                <div
                    v-for="(item, index) in operationGuide"
                    :key="item.title"
                    :class="{ 'mt-4': index }"
                >
                    <operation-card :title="item.title" />

                    <n-timeline
                        class="mt-4"
                        size="large"
                    >
                        <n-timeline-item
                            v-for="step in item.steps"
                            :key="step.index"
                            :title="step.header"
                            line-type="dashed"
                        >
                            <template
                                #header
                                v-if="step.headerRender"
                            >
                                <component :is="step.headerRender()"></component>
                            </template>
                            <template #icon>
                                <div class="custom-timeline-icon">{{ step.index }}</div>
                            </template>
                            <template #default>
                                <div class="text-white leading-5 font-medium">
                                    <p>{{ step.content }}</p>
                                    <p
                                        v-if="step.tips"
                                        class="font-normal text-white/70"
                                    >
                                        {{ step.tips }}
                                    </p>
                                </div>
                                <img
                                    v-if="step.image"
                                    class="mt-4 mb-10"
                                    :src="step.image"
                                    alt=""
                                />
                            </template>
                        </n-timeline-item>
                    </n-timeline>
                </div>
            </template>
        </reward-card>

        <reward-card
            :title="t('rewardPlan.aboutCreditsTitle')"
            class="mt-12.5"
        >
            <template #content>
                <template
                    v-for="(item, index) in qaContent"
                    :key="index"
                >
                    <credit-qa-card
                        :question="item.question"
                        :answer="item.answer"
                        :class="{ 'mt-12': !!index }"
                    />
                </template>
            </template>
        </reward-card>

        <reward-card
            :title="t('rewardPlan.contactUsTitle')"
            :description="t('rewardPlan.contactUsDescription')"
            class="mt-12.5 mb-35"
            contentClass="mt-5"
        >
            <template #content>
                <div class="flex items-center mt-4">
                    <div class="flex flex-col items-center">
                        <img
                            class="w-25 h-25"
                            src="../../assets/qrcode/official_account.png"
                            alt=""
                        />
                        <span class="mt-3">{{ t('rewardPlan.officialAccount') }}</span>
                    </div>

                    <div class="flex flex-col ml-20 items-center">
                        <img
                            class="w-25 h-25"
                            src="../../assets/qrcode/communication_group.png"
                            alt=""
                        />
                        <span class="mt-3">{{ t('rewardPlan.joinGroup') }}</span>
                    </div>
                </div>
            </template>
        </reward-card>

        <!-- 复制链接按钮 -->
        <div
            v-if="isInvite"
            class="fixed bottom-4 right-10 z-50"
        >
            <n-button
                type="info"
                @click="copyInviteLink"
                size="large"
            >
                {{ t('rewardPlan.copyLink') }}
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @file credit-reward-plan.vue
 * Credit奖励计划页面
 */
import { copyToClipboard } from '@/utils/copy';
import RewardCard from './reward-card.vue';
import CreditQaCard from './credit-qa-card.vue';
import { CopyOutline } from '@vicons/ionicons5';
import { NIcon, useMessage, NTimeline, NTimelineItem, NButton } from 'naive-ui';
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import OperationCard from './operation-card.vue';
import { createOperationGuide, createRulesContent, createQaContent } from './const';

const { t } = useI18n();
const message = useMessage();
const route = useRoute();

const invateCode = ref('6ER2');
const isInvite = ref(false);

// 从 URL 获取参数
onMounted(() => {
    const invite = route.query.invite as string;
    const code = route.query.code as string;

    isInvite.value = !!invite;
    invateCode.value = code;
});

const copyCode = () => {
    copyToClipboard(invateCode.value, {
        success: message.success,
        error: message.error,
    });
};

const copyInviteLink = () => {
    const currentUrl = window.location.origin + window.location.pathname;
    const inviteUrl = `${currentUrl}?invite=true&code=${invateCode.value}`;
    // copyToClipboard(inviteUrl, {
    //     success: () => message.success('邀请链接已复制'),
    //     error: message.error,
    // });
    console.log(inviteUrl);
};

// 创建翻译后的数据
const operationGuide = computed(() => createOperationGuide(t));
const rulesContent = computed(() => createRulesContent(t));
const qaContent = computed(() => createQaContent(t));
</script>

<style lang="less" scoped>
.credit-reward-plan {
    // Credit奖励计划页面样式
    width: 1105px;
    margin: auto;
}

.opertion-rule {
    span {
        background: linear-gradient(91deg, #005eff -9%, #00ffb7 95%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
}

.custom-timeline-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #00ca90;
    border: 2px solid #00ca90;
    font-size: 12px;
    color: #ffffff;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
