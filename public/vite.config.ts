import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // vueDevTools(),
    ],
    base: '/credit/manager',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@public': fileURLToPath(new URL('./public', import.meta.url)),
        },
    },
    server: {
        host: true,
        proxy: {
            '/api': {
                target: 'http://10.48.19.1:9080',
                changeOrigin: true,
            },
            '/oidc_auth': {
                target: 'http://10.48.19.1:9080',
                changeOrigin: true,
            },
        }
    },
})
