import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios'
import type { MessageApi } from 'naive-ui'
import { getT } from './i18n'

let messageInstance: MessageApi | null = null

export const setMessageInstance = (instance: MessageApi) => {
    messageInstance = instance
}


const service: AxiosInstance = axios.create({
    timeout: 3000,
})

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization =
            'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJvd25lciI6ImJ1aWx0LWluIiwibmFtZSI6InN0b25lSGVhcnROZXciLCJjcmVhdGVkVGltZSI6IjIwMjUtMDUtMjdUMjA6NDA6MTNaIiwidXBkYXRlZFRpbWUiOiIyMDI1LTA1LTI5VDExOjUyOjQxWiIsImRlbGV0ZWRUaW1lIjoiIiwiaWQiOiI4NTA1NDcxMiIsInR5cGUiOiJub3JtYWwtdXNlciIsInBhc3N3b3JkIjoiIiwicGFzc3dvcmRUeXBlIjoicGxhaW4iLCJkaXNwbGF5TmFtZSI6InN0b25lSGVhcnROZXciLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImF2YXRhciI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS84NTA1NDcxMj92PTQiLCJhdmF0YXJUeXBlIjoiIiwicGVybWFuZW50QXZhdGFyIjoiIiwiZW1haWwiOiIyMjMyMDc4MjQ5QHFxLmNvbSIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6IiIsImNvdW50cnlDb2RlIjoiIiwicmVnaW9uIjoiIiwibG9jYXRpb24iOiIiLCJhZGRyZXNzIjpbXSwiYWZmaWxpYXRpb24iOiIiLCJ0aXRsZSI6IiIsImlkQ2FyZFR5cGUiOiIiLCJpZENhcmQiOiIiLCJob21lcGFnZSI6IiIsImJpbyI6IiIsImxhbmd1YWdlIjoiIiwiZ2VuZGVyIjoiIiwiYmlydGhkYXkiOiIiLCJlZHVjYXRpb24iOiIiLCJzY29yZSI6MjAwMCwia2FybWEiOjAsInJhbmtpbmciOjAsImlzRGVmYXVsdEF2YXRhciI6ZmFsc2UsImlzT25saW5lIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzRm9yYmlkZGVuIjpmYWxzZSwic2lnbnVwQXBwbGljYXRpb24iOiJhcHBsaWNhdGlvbl90M3djZ2wiLCJoYXNoIjoiIiwicHJlSGFzaCI6IiIsImFjY2Vzc0tleSI6IiIsImFjY2Vzc1NlY3JldCI6IiIsImdpdGh1YiI6Ijg1MDU0NzEyIiwiZ29vZ2xlIjoiIiwicXEiOiIiLCJ3ZWNoYXQiOiIiLCJmYWNlYm9vayI6IiIsImRpbmd0YWxrIjoiIiwid2VpYm8iOiIiLCJnaXRlZSI6IiIsImxpbmtlZGluIjoiIiwid2Vjb20iOiIiLCJsYXJrIjoiIiwiZ2l0bGFiIjoiIiwiY3JlYXRlZElwIjoiIiwibGFzdFNpZ25pblRpbWUiOiIiLCJsYXN0U2lnbmluSXAiOiIiLCJwcmVmZXJyZWRNZmFUeXBlIjoiIiwicmVjb3ZlcnlDb2RlcyI6bnVsbCwidG90cFNlY3JldCI6IiIsIm1mYVBob25lRW5hYmxlZCI6ZmFsc2UsIm1mYUVtYWlsRW5hYmxlZCI6ZmFsc2UsImxkYXAiOiIiLCJwcm9wZXJ0aWVzIjp7Im5vIjoiMyIsIm9hdXRoX0dpdEh1Yl9hdmF0YXJVcmwiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODUwNTQ3MTI_dj00Iiwib2F1dGhfR2l0SHViX2VtYWlsIjoiMjIzMjA3ODI0OUBxcS5jb20iLCJvYXV0aF9HaXRIdWJfaWQiOiI4NTA1NDcxMiIsIm9hdXRoX0dpdEh1Yl91c2VybmFtZSI6InN0b25lSGVhcnROZXcifSwicm9sZXMiOltdLCJwZXJtaXNzaW9ucyI6W10sImdyb3VwcyI6W10sImxhc3RTaWduaW5Xcm9uZ1RpbWUiOiIiLCJzaWduaW5Xcm9uZ1RpbWVzIjowLCJtYW5hZ2VkQWNjb3VudHMiOm51bGwsInRva2VuVHlwZSI6ImFjY2Vzcy10b2tlbiIsInRhZyI6IiIsInNjb3BlIjoicmVhZCIsImF6cCI6IjFhOGI0ZmZjNjgwZWY0ZTcxNjM5IiwicHJvdmlkZXIiOiJnaXRodWIiLCJpc3MiOiJodHRwOi8vMTAuNDguMTkuMTE6ODAwMCIsInN1YiI6Ijg1MDU0NzEyIiwiYXVkIjpbIjFhOGI0ZmZjNjgwZWY0ZTcxNjM5Il0sImV4cCI6MTc0OTEyNDM2MSwibmJmIjoxNzQ4NTE5NTYxLCJpYXQiOjE3NDg1MTk1NjEsImp0aSI6ImFkbWluLzY5ZWM2NzI5LWIyMTQtNGNkZC05ODdkLTg3Mjc3ZWMzYWMyNiJ9.sAzFMzN3vqErclka975DfRrXb5Yn4BSk8laMm7zGSFx0JgdVaWDWZ6Irrk-NaWdJK5HFGYlzc2jErzuX_0WyMM3mI1vUqbbrINYT90tiCoVESFO9m6VYJFVMrBRfQHLvAIxK9qeViO8M7mRsz062j5LN03iepWLYL2BsUEBWQDH6_IIt85w7Dh_18t9sr3hNkKRCYM5yDmJEz9EEGLEFwxWWzyCevi7Lk2nd0feLi_2kBwo8a1d7xF1_Z9okTfSqJ29LPdm6VYEGbFIU94g8YBTPNAwbpDNnxOWpcROSnCNPAYn4q2r8yEp-ikMWXYomz4SYFRqZRTu8SU8auanh4-d5i7D4TtWJwSZ3OD5EWPbh_ud6xHY973nPQu3Zg5iZDsOaO6_UMR9kTOcxo5JWPAbZ-gg175u073zj0rtEEBtgglrNxdU8X1uTmQnEnMEH3on1rZ57xAlS93HnthWrt66YkkVUlkr6tWTaF7pMjGZFJ7vHED4ei9d4Bw1pN9-82K2BZsGGG_lUDwIRfgZiRKipz7ACdDT-4ScnxuB6dByMRyJAmF-dkoQv1h7wNnr7vuH_sVwejGsB3d6XZ6FJUobb6bh8NJlS4y4UCq2uGJZkqaCTp1CTfuArJlWQp5lBR9Wh5tCD9VD9-SWGVGO-Z_TCR8ZEogk4MmG_PjAde9M'
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (!messageInstance) {
            console.warn(
                'Message instance is not available. Please ensure it is set up in App.vue.',
            )
            return response
        }

        const t = getT()

        const res = response.data
        if (res.code !== 0 && response.status !== 200) {
            messageInstance.error(res.message || t('common.request.requestFailed'))
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res
    },
    (error) => {
        if (!messageInstance) {
            console.warn('Message instance is not available for error handling.')
            return Promise.reject(error)
        }

        const t = getT()

        let messageText = ''
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    messageText = t('common.request.unauthorized')
                    break
            }
        } else if (error.message.includes('timeout')) {
            messageText = t('common.request.requestTimeout')
        } else if (error.message === 'Network Error') {
            messageText = t('common.request.networkConnectionError')
        }
        messageInstance.error(messageText || error.message || t('common.request.networkError'))
        return Promise.reject(new Error(messageText || error.message))
    },
)

export const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
    return service(config)
}

export const get = <T = unknown>(url: string, params?: unknown): Promise<T> => {
    return request({ method: 'GET', url, params })
}

export const post = <T = unknown>(url: string, data?: unknown): Promise<T> => {
    return request({ method: 'POST', url, data })
}

export const put = <T = unknown>(url: string, data?: unknown): Promise<T> => {
    return request({ method: 'PUT', url, data })
}

export const del = <T = unknown>(url: string, params?: unknown): Promise<T> => {
    return request({ method: 'DELETE', url, params })
}
