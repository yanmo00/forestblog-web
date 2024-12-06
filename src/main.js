import 'uno.css';
import '@unocss/reset/normalize.css';
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/custom.scss'
import App from './App.vue'
import router from './router'
import { ElMessage } from 'element-plus'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

window.$message = ElMessage

app.mount('#app')
