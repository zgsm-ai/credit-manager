import { getT } from './i18n'

/**
 * copy util
 * @param text
 * @param messageHandler
 * @returns
 */
export const copyToClipboard = async (
    text: string,
    messageHandler?: {
        success?: (content: string) => void
        error?: (content: string) => void
    },
): Promise<boolean> => {
    const t = getT()

    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text)
            messageHandler?.success?.(t('utils.copySuccess'))
            return true
        }

        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        document.body.appendChild(textarea)
        textarea.select()

        const success = document.execCommand('copy')
        document.body.removeChild(textarea)

        if (success) {
            messageHandler?.success?.(t('utils.copySuccess'))
        } else {
            messageHandler?.error?.(t('utils.copyFailed'))
        }
        return success
    } catch (err) {
        console.error('复制失败:', err)
        messageHandler?.error?.(t('utils.copyFailed'))
        return false
    }
}
