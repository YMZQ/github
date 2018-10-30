import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import md5 from "js-md5";  

Vue.use(Router);

Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.baseURL = "http://192.168.1.30:8080/akb/web.php";

axios.defaults.withCredentials = true; //允许携带cookie
axios.defaults.method = "post";

const login=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/login/login" );
const password=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/login/password" );
const home=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/home/home" );
const add=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/add/add" );
const center=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/center/center" );
const me=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/me" );
const Certified=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/Certified" );
const inviting=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/inviting" );
const manage=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/manage" );
const modifypw=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/modifypw" );
const notice=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/notice" );
const real=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/real" );
const relevant=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/relevant" );
const addnode=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/addnode" );
const recom=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/recom" );
const details=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/details" );
const modify=()=>  import( /* webpackChunkName: "group-foo" */  "@/components/me/children/modify" );





var router = new Router({
  routes: [
    {path: "/", name: "login", component : login },
    {path: "/password", component : password },
    {path: "/home", component : home },
    {path: "/add", component : add },
    {path: "/center", component : center },
    {path: "/me", component : me },
    {path: "/Certified", component : Certified },
    {path: "/inviting", component : inviting },
    {path: "/manage", component : manage },
    {path: "/modifypw", component : modifypw },
    {path: "/notice", component : notice },
    {path: "/real", component : real },
    {path: "/relevant", component : relevant },
    {path: "/addnode", component : addnode },
    {path: "/recom/:id", component : recom },
    {path: "/details/:id", component : details },
    {path: "/modify/:id", component : modify  }
  ]
});


export { router };
