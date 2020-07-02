import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import qs from "qs";

import App from "./App.vue";

axios.defaults.baseURL = "localhost:9000";
Vue.prototype.$axios = axios;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";
axios.defaults.withCredentials = true;
Vue.prototype.qs = qs;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount("#app");
