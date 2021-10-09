import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import mitt from 'mitt';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const emitter = mitt();

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.config.globalProperties.emitter = emitter;
app.mount('#app');