<template>
    <div class="common-footer">
        <div class="community">
            <div class="community-item">
                <p class="item-desc">
                    <span class="label">{{ t('common.footer.emailContactLabel') }}</span>
                    <span class="divider">|</span>
                    <span class="contact">zgsm@sangfor.com.cn</span>
                </p>
            </div>
        </div>
        <div class="copyright">
            <p>{{ t('common.footer.copyright') }}</p>
            <template v-if="isZh">
                <p>
                    <img src="@/assets/copyright_btn.png" />
                    <span>粤ICP备08126214号</span>
                </p>
                <p>
                    <img src="@/assets/copyright_btn.png" />
                    <span>粤公网安备44030502002384号</span>
                </p>
                <p>合字B1.B2-20220041</p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, t } = useI18n()

const isZh = computed(() => locale.value === 'zh');
</script>

<style scoped lang="less">
.common-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;

    .community {
        .community-item {
            .item-desc {
                display: flex;
                align-items: center;
                .label {
                    color: #A1A7B3;
                }
                .divider {
                    margin: 0 12px;
                }
                .conteact {
                    font-weight: 500;
                }
            }
        }
    }


    .copyright {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #a1a7b3;
        margin-bottom: 20px;
        margin-top: 12px;

        p {
            display: flex;
            align-items: center;
            margin: 0 12px;

            img {
                width: 16px;
                height: 16px;
            }
        }
    }
}
</style>
