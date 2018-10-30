import ToastComponent from "../components/subcomponents/toast.vue";
import LoadingComponent from "../components/subcomponents/loading.vue";

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const Toast = {};
const Loading = {};

// 注册Toast
Toast.install = function(Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const ToastConstructor = Vue.extend(ToastComponent);
  // 生成一个该子类的实例
  const instance = new ToastConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$toast = (msg, url, duration = 2000) => {
    instance.message = msg;
    instance.visible = true;
    setTimeout(() => {
      // this.$router.push(url)
      instance.visible = false;
    }, duration);
  };
};

// 注册Loading
Loading.install = function(Vue) {
  const LoadingConstructor = Vue.extend(LoadingComponent);
  const instance = new LoadingConstructor();
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);
  Vue.prototype.$Loading = hide => {
    instance.hide = hide;
    instance.visible = true;
    if (instance.hide == "false") {
      instance.visible = false;
      return
    }
  };
};

export { Toast, Loading };
