import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'

import './assets/styles/tokens.css'
import './assets/styles/base.css'
import './assets/styles/effects.css'

import { createApp } from 'vue'

import App from './App.vue'
import { initTheme } from './composables/useTheme'
import router from './router'

initTheme()

const app = createApp(App)
app.use(router)
router.isReady().then(() => app.mount('#app'))
