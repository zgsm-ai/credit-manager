<template>
    <div class="common-content">
        <router-view />
        <common-footer />
    </div>
</template>

<script setup lang="ts">
import CommonFooter from '@/components/common-footer.vue'
import { setI18nComposer } from '@/utils/i18n'
import { setMessageInstance } from '@/utils/request'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const message = useMessage()
setMessageInstance(message)
setI18nComposer(useI18n())

</script>
