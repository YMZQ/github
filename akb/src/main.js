// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./router";
import { i18n } from "@/assets/lang/index";
import Vuex from "vuex"


// 挂载原型上
Vue.use(Toast,);
Vue.use(Loading);
Vue.use(Vuex) 


















const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

































import "./assets/css/base.css";    //加载全局公共样式
import "./assets/js/rem"; //适配
import {Toast,Loading} from './common/assembly.js'; //自定义组件 提示框 加载中
































Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  components: { App },
  template: "<App/>"
});
