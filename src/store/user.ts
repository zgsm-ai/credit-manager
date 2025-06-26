import { defineStore } from 'pinia'

interface UserInfo {
    phoneNumber: string
    userId: string
    githubName: string
    employeeNumber: string
    userName: string
    isPrivate: boolean
}

export const useUserStore = defineStore('counter', {
    state: () => ({
        phoneNumber: '',
        userId: '',
        githubName: '',
        employeeNumber: '',
        userName: '',
        isPrivate: false,
    }),

    actions: {
        updateUserInfo({
            phoneNumber,
            userId,
            githubName,
            employeeNumber,
            userName,
            isPrivate,
        }: UserInfo) {
            this.$patch({
                phoneNumber,
                userId,
                githubName,
                employeeNumber,
                userName,
                isPrivate,
            })
        },
    },
})
