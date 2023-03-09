import { createApp } from 'vue'
import App from './App'
import App1 from './App1'
import 'uno.css'
import router from './router'

const app = createApp(App)

app.use(router).mount('#app')
