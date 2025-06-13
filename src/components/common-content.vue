<template>
    <div class="common-content">
        <router-view />
        <common-footer />
    </div>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/mods/quota.mod'
import CommonFooter from '@/components/common-footer.vue'
import { useUserStore } from '@/store/user'
import { setI18nComposer } from '@/utils/i18n'
import { setMessageInstance } from '@/utils/request'
import { useMessage } from 'naive-ui'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const message = useMessage()
setMessageInstance(message)
setI18nComposer(useI18n())

const { updateUserInfo } = useUserStore()

const fetchUserInfo = async () => {
	const { data } = await getUserInfo()

	if (!data) {
		return
	}

	updateUserInfo({
		githubAccount: data.email || '',
		phoneNumber: data.phone || '',
		userId: data.uuid || '',
		employeeNumber: data.employee_number || '',
		githubName: data.githubName || ''
	})
}

onMounted(fetchUserInfo)
</script>
