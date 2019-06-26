import Vue from 'vue'
import App from './App.vue'
import globalToast from '@/components/global-toast/globalToast' // 全局toast
Vue.config.productionTip = false
Vue.use(globalToast)
new Vue({
  render: h => h(App),
}).$mount('#app')
