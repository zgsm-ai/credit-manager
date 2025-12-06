/**
 * @file 订阅页面逻辑Hook
 */
import { ref, computed, watch, onMounted, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import type { FormInst, FormRules } from 'naive-ui';
import { getPaymentMethods, getPricingPlans, PAY_TYPE, type TPayType } from '../const';
import type { PricingPlan } from '../interface';
import { postCreateOrder, getQuotaTypeById } from '@/api/mods/quota.mod';
import type { PostCreateOrderReq, PostCreateOrderRes } from '@/api/bos/quota.bo';

export function useSubscribe(
    // 支付相关回调函数
    paymentCallbacks: {
        openPaymentModal: () => void;
        startPolling: (orderId: string) => void;
    },
) {
    // 国际化函数
    const { t } = useI18n();
    const route = useRoute();

    // 表单引用
    const formRef = ref<FormInst | null>(null);

    // 响应式数据
    const quantity = ref<number | null>(1);
    const selectedPaymentMethod = ref<TPayType>(PAY_TYPE.alipay);
    const agreeToTerms = ref(false);
    const quantityError = ref(false);
    const currentPlan = ref<PricingPlan | null>(null);
    const allPlans = ref<PricingPlan[]>([]);

    // 协议确认弹窗状态
    const showAgreementModal = ref(false);

    // 订单信息
    const orderInfo = ref<PostCreateOrderRes | null>(null);

    // 购买按钮加载状态
    const isPurchasing = ref(false);

    // 获取 URL 参数中的 type
    const urlType = computed(() => {
        const typeParam = route.query.type as string;
        return typeParam ? parseInt(typeParam, 10) : 1; // 默认为 1
    });

    // 获取套餐数据的异步函数
    const fetchQuotaTypeById = async (id: number) => {
        const { code, data } = await getQuotaTypeById({ id });
        if (code !== 200) {
            return;
        }
        // 将API返回的数据转换为PricingPlan格式
        return {
            id: data.id.toString(),
            title: data.display_name,
            price: data.amount,
            originalPrice: data.original_amount,
            type: data.id,
        } as PricingPlan;
    };

    // 根据 type 获取对应的套餐
    onMounted(async () => {
        const planFromApi = await fetchQuotaTypeById(urlType.value);
        currentPlan.value = planFromApi || getPricingPlans(t)[0];
    });

    // 表单验证规则
    const formRules: ComputedRef<FormRules> = computed(() => ({
        quantity: [
            {
                required: true,
                type: 'number',
                min: 1,
                message: t('subscribePage.quantityRulesMssage'),
                trigger: ['input', 'blur'],
            },
        ],
    }));

    // 套餐单价（使用当前套餐的价格）
    const unitPrice = computed(() => {
        return currentPlan.value ? currentPlan.value.price : 0;
    });

    // 计算总价
    const totalPrice = computed(() => {
        // 如果quantity为null或undefined，返回0
        if (quantity.value === null || quantity.value === undefined) {
            return 0;
        }

        // 如果quantity小于1，返回0
        if (quantity.value < 1) {
            return 0;
        }

        // 否则计算总价
        return quantity.value * unitPrice.value;
    });

    // 表单数据
    const formData = ref({
        quantity,
    });

    // 监听quantity变化，设置错误状态
    watch(
        quantity,
        (newValue: number | null) => {
            if (newValue === null || newValue === undefined || newValue < 1) {
                quantityError.value = true;
            } else {
                quantityError.value = false;
            }
        },
        { immediate: true },
    );

    // 处理数量输入变化
    const handleQuantityChange = (value: number | null) => {
        quantity.value = value;
        formData.value.quantity = value;
    };

    // 获取支付方式数据
    const paymentMethods = computed(() => getPaymentMethods(t));

    // 确认同意协议
    const handleConfirmAgreement = () => {
        agreeToTerms.value = true;
        showAgreementModal.value = false;
    };

    // 取消同意协议
    const handleCancelAgreement = () => {
        showAgreementModal.value = false;
    };

    // 显示协议确认弹窗
    const showAgreementConfirm = () => {
        showAgreementModal.value = true;
    };

    // 继续支付流程
    const proceedToPayment = async () => {
        try {
            // 设置购买状态为加载中
            isPurchasing.value = true;

            if (!currentPlan.value) {
                isPurchasing.value = false;
                return;
            }
            const { type = 1, title } = currentPlan.value;

            // 使用套餐的type作为quota_type
            if (!type) {
                isPurchasing.value = false;
                return;
            }

            // 调用API创建订单
            const orderRequest: PostCreateOrderReq = {
                quota_type: title,
                quantity: Number(formData.value.quantity),
            };

            const response = await postCreateOrder(orderRequest);

            if (response.code === 200) {
                orderInfo.value = response.data;

                // 打开支付弹窗
                paymentCallbacks.openPaymentModal();

                // 开始轮询订单状态
                paymentCallbacks.startPolling(response.data.order_id);
            }

            // 无论成功还是失败，都重置购买状态
            isPurchasing.value = false;
        } catch (error) {
            console.error(error);
            // 发生异常时也要重置购买状态
            isPurchasing.value = false;
        }
    };

    // 购买处理逻辑
    const handlePurchaseWithModal = () => {
        // 如果正在购买中，直接返回
        if (isPurchasing.value) {
            return;
        }

        // 表单验证
        formRef.value?.validate((errors) => {
            if (!errors && !quantityError.value) {
                // 检查是否已同意协议
                if (!agreeToTerms.value) {
                    // 未同意协议，显示确认弹窗
                    showAgreementConfirm();
                } else {
                    // 已同意协议，直接显示支付弹窗
                    proceedToPayment();
                }
            }
        });
    };

    // 确认同意协议并继续支付流程
    const handleConfirmAgreementAndProceed = () => {
        handleConfirmAgreement();
        proceedToPayment();
    };

    return {
        // 表单相关
        formRef,
        formData,
        formRules,

        // 数据状态
        quantity,
        selectedPaymentMethod,
        agreeToTerms,
        quantityError,
        currentPlan,
        allPlans,

        // 计算属性
        unitPrice,
        totalPrice,
        paymentMethods,

        // 方法
        handleQuantityChange,

        // 协议相关
        showAgreementModal,
        handleConfirmAgreement,
        handleCancelAgreement,
        showAgreementConfirm,

        // 购买相关
        orderInfo,
        isPurchasing,
        proceedToPayment,
        handlePurchaseWithModal,
        handleConfirmAgreementAndProceed,
    };
}
