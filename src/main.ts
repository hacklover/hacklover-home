import { createApp } from 'vue'

import App from './App.vue'

import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'

const app = createApp(App)

// assets
import './assets/styles/app.scss'

// plugins
app.use(router)
app.use(store)
app.use(vuetify)

// launch
app.mount('#app')