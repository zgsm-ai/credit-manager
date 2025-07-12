import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteCompression(),
        // vueDevTools(),
    ],
    base: '/credit/manager',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: true,
        proxy: {
            '/quota-manager': {
                target: 'https://zgsm.sangfor.com',
                // target: 'http://10.48.19.1:9080',
                changeOrigin: true,
            },
            '/oidc-auth': {
                target: 'https://zgsm.sangfor.com',
                // target: 'http://10.48.19.11:8080',
                changeOrigin: true,
            },
        }
    },
})
