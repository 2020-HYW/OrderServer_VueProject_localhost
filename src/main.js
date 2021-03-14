import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setHtmlFontSize from './config/rem'
setHtmlFontSize()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
