import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/base.css'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

const app = createApp(App)
app.use(router)
app.use(store)

// 引入第三方插件
app.use(Vant)
app.mount('#app')
