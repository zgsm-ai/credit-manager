<template>
    <div class="flex items-center justify-center h-full w-full">
        <div
            ref="posterRef"
            class="relative max-w-93.75 aspect-375/667 w-full bg-white overflow-hidden"
        >
            <img
                class="block absolute max-w-93.75 z-1 inset-0 w-full h-full object-cover"
                src="../../../assets/summary/result_bg.webp"
                alt="summary_cover"
            />

            <img
                class="block absolute z-2 w-full"
                :src="typeImageSrc"
                :alt="`type_${type}`"
                crossorigin="anonymous"
            />

            <div class="absolute z-2 max-w-67.75 w-full top-107.5 left-0 right-0 mx-auto">
                <p class="text-sm">{{ typeText }}</p>

                <div class="flex mt-8.5 justify-between items-start">
                    <div class="flex flex-col justify-start">
                        <div class="flex items-center">
                            <img
                                src="../../../assets/logo.webp"
                                alt="logo"
                                class="w-3.75"
                                crossorigin="anonymous"
                            />
                            <span class="text-xs ml-0.5 logo-text font-semibold">CoStrict</span>
                        </div>
                        <p class="font-semibold text-[8px] mt-1">
                            {{ t('annualSummary.annualReport') }}
                        </p>
                        <p class="font-semibold text-[8px] mt-0.5">
                            {{ t('annualSummary.scanQRCode') }}
                        </p>
                    </div>

                    <div class="flex flex-col items-center">
                        <img
                            v-if="qrCodeDataUrl"
                            :src="qrCodeDataUrl"
                            alt="invite-qrcode"
                            class="w-10 h-10 block"
                        />
                    </div>
                </div>

                <div data-html2canvas-ignore>
                    <div
                        class="h-10.75 w-full text-center leading-10.75 cursor-pointer mt-4.5 font-semibold save-btn rounded text-white select-none transition-opacity"
                        :class="{ 'opacity-70 pointer-events-none': isGenerating }"
                        @click="handleSavePoster"
                    >
                        {{
                            isGenerating
                                ? t('annualSummary.generating')
                                : t('annualSummary.savePoster')
                        }}
                    </div>
                    <p class="text-[8px] text-center mt-1 text-[#A9A9A9] font-medium">
                        {{ t('annualSummary.saveFailedTip') }}
                    </p>
                    <p
                        class="text-center text-sm mt-2.5 text-[#BCBBBB] cursor-pointer font-medium"
                        @click="handleReset"
                    >
                        {{ t('annualSummary.reviewAgain') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- 导出专用区域：平时 hidden，导出时固定定位渲染以便截图 -->
        <div :class="isExporting ? 'fixed top-0 left-0 -z-[9999] w-[375px]' : 'hidden'">
            <div
                ref="exportWrapperRef"
                class="w-full relative bg-white"
            >
                <AnnualSummaryResultExport
                    :type="type"
                    :invite-code="inviteCode"
                    :login-url="loginUrl"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @file 年度总结结果
 */
import { ref, computed, watch, nextTick } from 'vue';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import { getT } from '@/utils/i18n';
import { TYPE_IMAGE_MAP, TYPE_TEXT_MAP, DEFAULT_RESULT_TYPE } from '../const';
import AnnualSummaryResultExport from './annual-summary-result-export.vue';
import { recordShare } from '@/api/mods/activity.mod';

const t = getT();

const props = withDefaults(
    defineProps<{
        stepId: number;
        type?: string;
        inviteCode?: string;
        loginUrl?: string;
    }>(),
    {
        type: DEFAULT_RESULT_TYPE,
        inviteCode: '',
        loginUrl: '',
    },
);

const emit = defineEmits<{
    reset: [];
}>();

const posterRef = ref<HTMLElement>();
const exportWrapperRef = ref<HTMLElement>();
const isGenerating = ref(false);
const qrCodeDataUrl = ref('');

// 控制导出组件是否渲染
const isExporting = ref(false);

const typeImageSrc = computed(
    () => TYPE_IMAGE_MAP[props.type] || TYPE_IMAGE_MAP[DEFAULT_RESULT_TYPE],
);
const typeText = computed(() => TYPE_TEXT_MAP[props.type] || TYPE_TEXT_MAP[DEFAULT_RESULT_TYPE]);

const generateQRCode = async (url: string) => {
    if (!url) return;
    try {
        const dataUrl = await QRCode.toDataURL(url, {
            width: 200,
            margin: 1,
            color: { dark: '#000000', light: '#FFFFFF' },
        });
        qrCodeDataUrl.value = dataUrl;
    } catch (error) {
        console.error(error);
    }
};

watch(
    () => props.loginUrl,
    (newUrl) => {
        if (newUrl) generateQRCode(newUrl);
    },
    { immediate: true },
);

const handleReset = () => emit('reset');

const handleSavePoster = async () => {
    if (isGenerating.value) return;

    console.log('Login URL:', props.loginUrl);

    if (!qrCodeDataUrl.value && props.loginUrl) {
        await generateQRCode(props.loginUrl);
    }

    // 调用埋点接口记录分享
    try {
        await recordShare();
    } catch (error) {
        console.error('error:', error);
    }

    isGenerating.value = true;

    // 开启导出渲染
    isExporting.value = true;

    try {
        // 等待 Vue 响应式更新 DOM
        await nextTick();

        // 关键：浏览器解码 base64 图片需要时间，必须等待确保图片已渲染
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (!exportWrapperRef.value) return;

        const targetNode = exportWrapperRef.value;
        const contentHeight = targetNode.scrollHeight || 667;

        const dataUrl = await toPng(targetNode, {
            cacheBust: true,
            pixelRatio: 3,
            backgroundColor: '#ffffff',
            width: 375, // 强制宽度
            height: contentHeight,
            style: {
                transform: 'none', // 防止父级样式影响
                margin: '0',
                width: '375px',
            },
        });

        const link = document.createElement('a');
        link.download = `${t('annualSummary.yearlySummary')}${new Date().getTime()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('海报生成失败:', error);
    } finally {
        // 恢复隐藏状态
        isExporting.value = false;
        isGenerating.value = false;
    }
};
</script>

<style scoped lang="less">
.logo-text {
    background: linear-gradient(0deg, #2b7df7 25%, rgba(47, 130, 255, 0.83) 70%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}
.save-btn {
    background: linear-gradient(0deg, #2b7df7 25%, rgba(47, 130, 255, 0.83) 70%);
}
</style>
