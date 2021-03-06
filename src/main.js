import Vue from 'vue';
import Example from './Example.vue';

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(Example)
}).$mount('#app');
