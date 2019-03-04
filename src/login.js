import Vue from 'vue'
import router from './router'
import Login from './Login.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'


Vue.config.productionTip = false

console.log(store)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(Login),
}).$mount('#login')
