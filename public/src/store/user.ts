import { defineStore } from 'pinia'

interface UserInfo {
    phoneNumber: string
    userId: string
    githubName: string
    employeeNumber: string
}

export const useUserStore = defineStore('counter', {
    state: () => ({
        phoneNumber: '',
        userId: '',
        githubName: '',
        employeeNumber: '',
    }),

    getters: {
        displayName: (state) => {
            return (
                state.githubName ||
                state.phoneNumber ||
                state.employeeNumber ||
                '-'
            )
        },
    },

    actions: {
        updateUserInfo({
            phoneNumber,
            userId,
            githubName,
            employeeNumber,
        }: UserInfo) {
            this.$patch({
                phoneNumber,
                userId,
                githubName,
                employeeNumber,
            })
        },
    },
})
