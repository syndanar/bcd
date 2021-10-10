import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';

Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
