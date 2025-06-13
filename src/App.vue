<template>
	<div class="app-container">
		<common-header />
		<div class="content">
			<n-config-provider :theme-overrides="themeOverrides">
				<n-message-provider>
					<common-content />
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

const hashToken = getHashToken()

if (hashToken) {
	setToken(hashToken)

	getUserToken().then(res => {
		if (!res.access_token) {
			return
		}
		
		setToken(res.access_token)
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
