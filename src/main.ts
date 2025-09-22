import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './locales';
import { setupAuthGuard } from './router/guards/auth.guard';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

// 在Pinia初始化后设置路由守卫
setupAuthGuard(router);

app.mount('#app');
