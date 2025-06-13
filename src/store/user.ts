import { defineStore } from 'pinia'

interface UserInfo {
    githubAccount: string
    phoneNumber: string
    userId: string
    githubName: string
    employeeNumber: string
}

export const useUserStore = defineStore('counter', {
    state: () => ({
        githubAccount: '',
        phoneNumber: '',
        userId: '',
        githubName: '',
        employeeNumber: '',
    }),

    getters: {
        displayName: (state) => {
            return (
                state.githubAccount ||
                state.phoneNumber ||
                state.githubName ||
                state.employeeNumber ||
                '-'
            )
        },
    },

    actions: {
        updateUserInfo({
            githubAccount,
            phoneNumber,
            userId,
            githubName,
            employeeNumber,
        }: UserInfo) {
            this.$patch({
                githubAccount,
                phoneNumber,
                userId,
                githubName,
                employeeNumber,
            })
        },
    },
})
