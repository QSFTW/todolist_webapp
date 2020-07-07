import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

import axios from "axios";
import qs from "qs";
import VueRouter from "vue-router";

import store from "./stores/store";

import App from "./App.vue";
import Login from "./components/Auth.vue";
import ToDoList from "./components/ToDoList.vue";
import UserTodoList from "./components/UserTodo.vue";
import Register from "./components/Register.vue";
// config axios
axios.defaults.baseURL = "http://localhost:9000";
Vue.prototype.$axios = axios;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";

Vue.prototype.qs = qs;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueToast);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/public"
  },
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/register",
    component: Register,
    name: "register"
  },
  {
    path: "/public",
    component: ToDoList,
    name: "todo"
  },
  {
    path: "/personal",
    component: UserTodoList,
    name: "usertodo"
  }
];
const router = new VueRouter({
  mode: "history",
  routes,
  base: "/"
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
