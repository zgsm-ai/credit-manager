import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './locales';
import { setupAuthGuard } from './router/guards/auth';
import { createHead } from '@vueuse/head';

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(head);

// 在Pinia初始化后设置路由守卫
setupAuthGuard(router);

app.mount('#app');
