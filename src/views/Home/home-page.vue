<template>
	<n-spin :show="isLoading">
		<div class="home-page">
			<section class="info">
				<common-card :title="t('homePage.basicInfo')">
					<template #default>
						<div class="info-item">
							<div class="item-account" v-if="!isPrivate">
								<div class="label">{{ t('homePage.githubAccount') }}</div>
								<span
									:style="{ color: !githubName ? '#1876F2' : '#fff', cursor: !githubName ? 'pointer' : 'default' }"
									@click="!githubName && bindGithub()">
									{{ githubName || t('homePage.bindText') }}
								</span>
							</div>
							<div class="item-phone" v-if="isZh">
								<div class="label">{{ t('homePage.phoneLabel') }}</div>
								<span
									:style="{ color: !phoneNumber ? '#1876F2' : '#fff', cursor: !phoneNumber ? 'pointer' : 'default' }"
									@click="!phoneNumber && bindPhone()">
									{{ phoneNumber || t('homePage.bindText') }}
								</span>
							</div>
							<div class="item-userId">
								<div class="label">{{ t('homePage.userIdLabel') }}</div>
								<span>{{ userId || '-' }}</span>
							</div>
						</div>
					</template>
				</common-card>
			</section>
			<section class="usage">
				<common-card :title="t('homePage.usageTitle')">
					<template #header-extra>
						<span class="credit-action" @click="transferCredit">{{ t('homePage.creditTransfer') }}</span>
						<span class="usage-credit" @click="toCredits">{{ t('homePage.creditRecords') }}</span>
					</template>
					<template #default>
						<div class="usage-content">
							<div class="content-title">{{ t('homePage.userCredits') }}</div>
							<div class="content-desc">{{ t('homePage.creditDesc') }}</div>
							<div class="content-progress">
								<n-progress type="line" :percentage="percentage" :show-indicator="false" :color="{
									stops: ['rgba(0, 102, 255, 0.7)', 'rgba(0, 255, 183, 0.7)', 'rgba(247, 255, 253, 0.7)', 'rgba(0, 94, 255, 0.7)']
								}" :offset="[0, 47, 65, 99]" :height="6" rail-color="rgba(255, 255, 255, 0.2)" />
							</div>
							<div class="usage-static">
								<div class="static-use">{{ t('homePage.useCredit', {
									used: usedQuota.toFixed(2),
									total: totalQuota.toFixed(2)
								}) }}</div>
								<div class="static-total">{{ t('homePage.restCredit', {
									rest: restCredit
								}) }}</div>
							</div>
							<div class="credit-validity">
								<n-collapse arrow-placement="right" :default-expanded-names="['1']">
									<n-collapse-item :title="t('homePage.creditValidity')" name="1">
										<n-data-table :columns="columns" :data="columnsData" :bordered="false"
											:max-height="120" size="small" />
									</n-collapse-item>
								</n-collapse>
							</div>
						</div>
					</template>
				</common-card>
			</section>
			<section class="activity">
				<common-card>
					<template #header>
						<div class="activity-title">
							<span>{{ t('homePage.activityTitle') }}</span>
							<img src="../../assets/activity.svg" alt="">
						</div>
					</template>
					<template #default>
						<div class="activity-content">
							<div class="content-title">{{ t('homePage.creditPlan') }}</div>
							<div class="content-desc">{{ t('homePage.planDesc') }}</div>
						</div>
						<div class="activity-tips" @click="toGithub">
							<div class="tips-content">{{ t('homePage.githubStar') }}</div>
							<img :src="tag" alt="">
						</div>
					</template>
				</common-card>
			</section>
			<credit-transfer-modal :user-quota-data="columnsData" :show="showCreditTransferModal"
				@update:show="updateCreditModalShow" @update:submit="openCreditCodeModal"
				@update:transferIn="transferInCallBack" />
			<credit-code-modal :show="showCreditCodeModal" @update:show="updateCreditCodeModalShow"
				:voucher-code="voucherCode" />
		</div>
	</n-spin>
</template>

<script setup lang="ts">
/**
 * @file home-page.vue
 */
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NProgress, NCollapse, NCollapseItem, NDataTable, NSpin } from 'naive-ui'
import CommonCard from '@/components/common-card.vue'
import CreditTransferModal from '@/views/Home/credit-transfer-modal.vue'
import CreditCodeModal from './credit-code-modal.vue'
import { getUserQuota, getBindAccount } from '@/api/mods/quota.mod'
import type { QuotaList } from '@/api/bos/quota.bo'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { BING_TYPE } from './const'
import { formatDate } from '@/utils/date'
import enTag from '/images/en/tag.svg'
import zhTag from '/images/zh/tag.svg'

const { t, locale } = useI18n()

const isZh = computed(() => locale.value === 'zh')

const tag = computed(() => isZh.value ? zhTag : enTag)

const bindAction = async (bindType: keyof typeof BING_TYPE) => {
	const { data } = await getBindAccount({
		bindType,
		state: 'state'
	})

	if (!data.url) {
		return
	}

	window.location.href = data.url
}

const bindGithub = () => bindAction(BING_TYPE.github)

const bindPhone = () => bindAction(BING_TYPE.sms)

const voucherCode = ref()

const showCreditCodeModal = ref(false)

const openCreditCodeModal = (code: string) => {
	fetchUserQuota()

	updateCreditModalShow(false)

	showCreditCodeModal.value = true

	voucherCode.value = code
}

const updateCreditCodeModalShow = (status: boolean) => {
	showCreditCodeModal.value = status
}

const showCreditTransferModal = ref(false)

const transferCredit = () => {
	showCreditTransferModal.value = true
}

const updateCreditModalShow = (status: boolean) => {
	showCreditTransferModal.value = status
}

const usedQuota = ref<number>(0)

const totalQuota = ref<number>(0)

const percentage = computed(() => Number(((usedQuota.value / totalQuota.value) * 100).toFixed(0)))

const restCredit = computed(() => (totalQuota.value - usedQuota.value).toFixed(2))

const columns = computed(() => [
	{
		title: t('homePage.expiryDate'),
		key: 'expiry_date',
		width: 280,
		render: (row: QuotaList) => formatDate(row.expiry_date),
	},
	{
		title: t('homePage.creditNum'),
		key: 'amount'
	}
])

const columnsData = ref<QuotaList[]>([])

const toCredits = () => window.open('/credit/manager/credits')

const toGithub = () => window.open('https://github.com/zgsm-ai/zgsm')

const isLoading = ref(false)

const userStore = useUserStore()

const { githubName, phoneNumber, userId, isPrivate, isTokenInitialized } = storeToRefs(userStore)

const fetchUserQuota = async () => {
	const { data } = await getUserQuota()

	if (!data) {
		return
	}

	columnsData.value = data.quota_list || []
	usedQuota.value = data.used_quota || 0
	totalQuota.value = data.total_quota || 0
}

watch(isTokenInitialized, (val) => {
	if (val) {
		isLoading.value = true
		fetchUserQuota().finally(() => {
			isLoading.value = false
		})
	}
}, {
	immediate: true
})

const transferInCallBack = () => {
	fetchUserQuota()
}

</script>

<style scoped lang="less">
.home-page {
	margin: auto;
	width: 65%;
	padding-top: 24px;

	.usage,
	.activity {
		margin-top: 24px;

		.activity-title {
			font-size: 16px;
			font-weight: 600;
		}
	}

	.info {
		.info-item {
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.item-account,
			.item-phone {
				display: flex;
				align-items: center;
				margin-right: 40px;

				.label {
					opacity: 0.7;
				}

				span {
					margin-left: 4px;
					font-weight: 600;
					color: #1876F2;
				}
			}

			.item-userId {
				display: flex;
				align-items: center;
				margin-right: 40px;

				.label {
					opacity: 0.7;
				}
			}
		}
	}

	.usage {
		.usage-credit {
			color: #1876F2;
			cursor: pointer;
		}

		.credit-action {
			width: 130px;
			height: 24px;
			text-align: center;
			line-height: 24px;
			border-radius: 20px;
			background: rgba(255, 255, 255, 0.2);
			box-sizing: border-box;
			color: rgba(255, 255, 255, 0.9);
			font-size: 14px;
			margin-right: 12px;
			cursor: pointer;
		}

		.credit-action::before {
			content: "";
			position: absolute;
			inset: 0;
			border-radius: inherit;
			padding: 1px;
			background: linear-gradient(101deg, #0066FF 1%, #00FFB7 43%, #F7FFFD 55%, #FFFFFF 62%, #005EFF 101%);
			mask:
				linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			mask-composite: exclude;
			-webkit-mask-composite: destination-out;
			pointer-events: none;
			opacity: 0.5;
		}

		.usage-content {
			display: flex;
			flex-direction: column;

			.content-title {
				font-size: 14px;
			}

			.content-desc {
				opacity: 0.7;
				margin-top: 8px;
			}
		}

		.content-progress {
			margin-top: 24px;
		}

		.usage-static {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
		}

		.credit-validity {
			margin-top: 30px;
		}
	}

	.activity {
		&-title {
			display: flex;
			align-items: center;

			span {
				color: #fff;
			}

			img {
				margin-left: 10px;
			}
		}

		&-content {
			display: flex;
			flex-direction: column;

			.content-desc {
				opacity: 0.7;
				margin-top: 8px;
			}
		}

		&-tips {
			margin-top: 16px;
			padding: 7px 8px 7px 12px;
			box-sizing: border-box;
			border-radius: 20px;
			display: flex;
			align-items: center;
			background: url("../../assets/tips-bg.png") no-repeat;
			background-size: cover;
			cursor: pointer;

			.tips-content {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.enter-code {
				margin-left: 10px;
				color: #1876F2;
				cursor: pointer;
				font-weight: 600;
				white-space: nowrap;
			}

			img {
				margin-left: 20px;
			}
		}
	}
}

.modal-title {
	font-size: 14px;
	text-align: center;
}
</style>
