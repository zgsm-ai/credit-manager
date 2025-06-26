<template>
	<div class="app-container">
		<common-header />
		<div class="content">
			<n-config-provider :theme-overrides="themeOverrides">
				<n-message-provider>
					<common-content v-if="isTokenInitialized" />
				</n-message-provider>
			</n-config-provider>
		</div>
	</div>
</template>

<script setup lang="ts">
import { NMessageProvider, NConfigProvider } from 'naive-ui'
import CommonHeader from '@/components/common-header.vue'
import CommonContent from '@/components/common-content.vue'
import { themeOverrides } from '@/theme-overrides'
import { getHashToken, setToken } from '@/utils/token'
import { getUserToken } from './api/mods/quota.mod'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/api/mods/quota.mod'
import { onMounted, ref } from 'vue'

const hashToken = getHashToken()
const isTokenInitialized = ref(false)

onMounted(async () => {
	if (hashToken) {
		setToken(hashToken)

		getUserToken().then(res => {
			const { data: { data: { access_token } } } = res
			if (!access_token) {
				return
			}

			return new Promise<void>((resolve) => {
				setToken(access_token)
				resolve()
			})
		}).then(async () => {
			await fetchUserInfo()
			isTokenInitialized.value = true
		})
	} else {
		fetchUserInfo()
		isTokenInitialized.value = true
	}
})

const { updateUserInfo } = useUserStore()

const fetchUserInfo = async () => {
	const { data: { data } } = await getUserInfo()

	if (!data) {
		return
	}

	updateUserInfo({
		phoneNumber: data.phone || '',
		userId: data.uuid || '',
		employeeNumber: data.employee_number || '',
		githubName: data.githubName || '',
		userName: data.username || '',
		isPrivate: data.isPrivate || false,
	})
}
</script>

<style lang="less" scoped>
.app-container {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	background-color: #000;

	.content {
		flex: 1;
		overflow: auto;
		padding: 0 48px;
		box-sizing: border-box;
	}
}
</style>
