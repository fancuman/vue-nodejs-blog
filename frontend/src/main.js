import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';

const baseURL = process.env.VUE_APP_BACKEND_URL ? process.env.VUE_APP_BACKEND_URL : 'http://localhost:3010/todos';
const http = axios.create({
  baseURL,
});

Vue.prototype.$http = http;
console.log("backend_url:" + baseURL);



Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
