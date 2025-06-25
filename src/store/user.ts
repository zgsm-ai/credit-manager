import { defineStore } from 'pinia'

interface UserInfo {
    phoneNumber: string
    userId: string
    githubName: string
    employeeNumber: string
    userName: string
}

export const useUserStore = defineStore('counter', {
    state: () => ({
        phoneNumber: '',
        userId: '',
        githubName: '',
        employeeNumber: '',
        userName: '',
    }),

    actions: {
        updateUserInfo({
            phoneNumber,
            userId,
            githubName,
            employeeNumber,
            userName,
        }: UserInfo) {
            this.$patch({
                phoneNumber,
                userId,
                githubName,
                employeeNumber,
                userName,
            })
        },
    },
})
