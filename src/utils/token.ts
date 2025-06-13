import Cookies from 'js-cookie'

export const getHashToken = () => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const hasToken = params.get('state')

    return hasToken
}

export const getToken = () => {
    return Cookies.get('token')
}

export const setToken = (token: string) => {
    return Cookies.set('token', token)
}

export const clearToken = () => {
    return Cookies.remove('token')
}
