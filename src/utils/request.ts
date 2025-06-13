import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios'
import type { MessageApi } from 'naive-ui'
import { getT } from './i18n'
import { getToken } from './token'

let messageInstance: MessageApi | null = null

export const setMessageInstance = (instance: MessageApi) => {
    messageInstance = instance
}

const service: AxiosInstance = axios.create({
    timeout: 10000,
})

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken()

        config.headers.Authorization = token
        // config.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6ImJ1aWx0LWluIiwibmFtZSI6InN0b25lSGVhcnROZXciLCJjcmVhdGVkVGltZSI6IjIwMjUtMDUtMjdUMjA6NDA6MTNaIiwidXBkYXRlZFRpbWUiOiIyMDI1LTA1LTI5VDExOjUyOjQxWiIsImRlbGV0ZWRUaW1lIjoiIiwiaWQiOiJiY2Q3Y2VkNC0xZDA5LTQwMmQtYTBiYi0yNDM5ZjEyNmRlOGYiLCJ0eXBlIjoibm9ybWFsLXVzZXIiLCJwYXNzd29yZCI6IiIsInBhc3N3b3JkU2FsdCI6IiIsInBhc3N3b3JkVHlwZSI6InBsYWluIiwiZGlzcGxheU5hbWUiOiJzdG9uZUhlYXJ0TmV3IiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODUwNTQ3MTI_dj00IiwiYXZhdGFyVHlwZSI6IiIsInBlcm1hbmVudEF2YXRhciI6IiIsImVtYWlsIjoiMjIzMjA3ODI0OUBxcS5jb20iLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwicGhvbmUiOiIiLCJjb3VudHJ5Q29kZSI6IiIsInJlZ2lvbiI6IiIsImxvY2F0aW9uIjoiIiwiYWRkcmVzcyI6W10sImFmZmlsaWF0aW9uIjoiIiwidGl0bGUiOiIiLCJpZENhcmRUeXBlIjoiIiwiaWRDYXJkIjoiIiwiaG9tZXBhZ2UiOiIiLCJiaW8iOiIiLCJsYW5ndWFnZSI6IiIsImdlbmRlciI6IiIsImJpcnRoZGF5IjoiIiwiZWR1Y2F0aW9uIjoiIiwic2NvcmUiOjIwMDAsImthcm1hIjowLCJyYW5raW5nIjowLCJpc0RlZmF1bHRBdmF0YXIiOmZhbHNlLCJpc09ubGluZSI6ZmFsc2UsImlzQWRtaW4iOmZhbHNlLCJpc0ZvcmJpZGRlbiI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsInNpZ251cEFwcGxpY2F0aW9uIjoiYXBwbGljYXRpb25fdDN3Y2dsIiwiaGFzaCI6IiIsInByZUhhc2giOiIiLCJhY2Nlc3NLZXkiOiIiLCJhY2Nlc3NTZWNyZXQiOiIiLCJnaXRodWIiOiI4NTA1NDcxMiIsImdvb2dsZSI6IiIsInFxIjoiIiwid2VjaGF0IjoiIiwiZmFjZWJvb2siOiIiLCJkaW5ndGFsayI6IiIsIndlaWJvIjoiIiwiZ2l0ZWUiOiIiLCJsaW5rZWRpbiI6IiIsIndlY29tIjoiIiwibGFyayI6IiIsImdpdGxhYiI6IiIsImNyZWF0ZWRJcCI6IiIsImxhc3RTaWduaW5UaW1lIjoiIiwibGFzdFNpZ25pbklwIjoiIiwicHJlZmVycmVkTWZhVHlwZSI6IiIsInJlY292ZXJ5Q29kZXMiOm51bGwsInRvdHBTZWNyZXQiOiIiLCJtZmFQaG9uZUVuYWJsZWQiOmZhbHNlLCJtZmFFbWFpbEVuYWJsZWQiOmZhbHNlLCJsZGFwIjoiIiwicHJvcGVydGllcyI6eyJubyI6IjMiLCJvYXV0aF9HaXRIdWJfYXZhdGFyVXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91Lzg1MDU0NzEyP3Y9NCIsIm9hdXRoX0dpdEh1Yl9lbWFpbCI6IjIyMzIwNzgyNDlAcXEuY29tIiwib2F1dGhfR2l0SHViX2lkIjoiODUwNTQ3MTIiLCJvYXV0aF9HaXRIdWJfdXNlcm5hbWUiOiJzdG9uZUhlYXJ0TmV3In0sInJvbGVzIjpbXSwicGVybWlzc2lvbnMiOltdLCJncm91cHMiOltdLCJsYXN0U2lnbmluV3JvbmdUaW1lIjoiIiwic2lnbmluV3JvbmdUaW1lcyI6MCwibWFuYWdlZEFjY291bnRzIjpudWxsLCJ0b2tlblR5cGUiOiJhY2Nlc3MtdG9rZW4iLCJ0YWciOiIiLCJzY29wZSI6InJlYWQiLCJhenAiOiIxYThiNGZmYzY4MGVmNGU3MTYzOSIsInByb3ZpZGVyIjoiZ2l0aHViIiwiaXNzIjoiaHR0cDovLzEwLjQ4LjE5LjExOjgwMDAiLCJzdWIiOiI4NTA1NDcxMiIsImF1ZCI6WyIxYThiNGZmYzY4MGVmNGU3MTYzOSJdLCJleHAiOjE3NDkxMjQzNjEsIm5iZiI6MTc0ODUxOTU2MSwiaWF0IjoxNzQ4NTE5NTYxLCJqdGkiOiJhZG1pbi82OWVjNjcyOS1iMjE0LTRjZGQtOTg3ZC04NzI3N2VjM2FjMjYifQ.yW3v5F5sHYgQZlHSo762i5ZARtCgVb5oF5qB058hQ-c'

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
        messageInstance.error(messageText || error.response?.data?.message || error.message ||t('common.request.networkError'))
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
