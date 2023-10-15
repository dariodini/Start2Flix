import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import mitt from 'mitt'
import * as helpers from './helpers/helpers';



const emitter = mitt()
const app = createApp(App)

app.use(router)
app.use(store)

app.config.globalProperties.emitter = emitter
app.config.globalProperties.$helpers = helpers;

app.mount('#app')
