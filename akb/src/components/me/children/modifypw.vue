<template>
<div class="modifypw">
    <header>
         <a href="javascript:void(0)" onclick="history.go(-1)"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t('modifypw.a')}}</div>
    </header>
    <main class="mainbg">
   		<!-- <div class="phone">
           <span> :</span><p id="phonenum">{{mobile}}</p>
        </div> -->
        <div class="content lt  rb">
            <i class="lb"></i>
            <i class="rt"></i>
            <ul>
                <li><input type="text" :placeholder="$t('modifypw.c')"  class="againpassword code" v-model.trim="code"><button @click="Whether()" v-if="!ishowcode">{{$t('message.c')}}</button><validate v-if="ishowcode" SMST="G"  @isend="isend"></validate></li>
                <li><input type="password" :placeholder="$t('modifypw.d')" class="user loginpwd" v-model.trim="password" ></li>
                <li><input type="password":placeholder="$t('modifypw.e')" class="password paypwd" v-model.trim="loginpwd" ></li>
                <li><input type="text" :placeholder="$t('modifypw.f')" class="password googlecode" v-model.trim="googlecode" ></li>
            </ul>
        </div>
        <div class="btn-purple-img confirm" @click="confirm">{{$t('modifypw.g')}}</div>
    </main>
  </div>
</template>

<script>
import validate from "@/components/subcomponents/validate";
export default {
  data() {
    return {
      code: null,
      password: null,
      loginpwd: null,
      googlecode: null,
      mobile: null,
      ishowcode:false
    };
  },
  created() {
    this.mobile = localStorage.getItem("mobile");
  },
  components: {
    validate
  },
  methods: {
      Whether() {
      this.ishowcode=true;
    },
    isend(isend){
        this.ishowcode=false;
    },
    confirm() {
      if (this.code == "" || this.code == null || this.code == undefined) {
       this.$toast(this.$t("modifypw.c"));
       return;
      }
      if (  this.password == "" ||  this.password == null ||  this.password == undefined ||  this.loginpwd == "" ||  this.loginpwd == null ||  this.loginpwd == undefined) {
      this.$toast(this.$t("modifypw.j"));
        return;
      } 
      if (  this.googlecode == "" ||  this.googlecode == null ||  this.googlecode == undefined) {
        this.$toast(this.$t("modifypw.f"));
        return;
      }
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10014");
      params.append("loginpwd", this.loginpwd);
      params.append("paypwd", this.password);
      params.append("code", this.code);
      params.append("googlecode", this.googlecode);
      this.$axios({
        data: params
      }).then(ret => {
         this.$Loading("false");;
        if (ret.data.respCode == "99999" ||ret.data.respCode == "99990" ||ret.data.respCode == "1") {
          location.href = "login.html";
        } else if (ret.data.respCode == "00000") {
          this.detail = ret.data.page.pageItems[0];
          this.content = this.detail.content;
          this.$toast(this.$t("modifypw.h"));
          this.$router.push("/me")
        } else {
          this.$toast(ret.data.respMsg);
        }
      });
    }
  }
};
</script>


<style scoped>
.modifypw {
  height: 100%;
  width: 100%;
}
.phone {
  height: 1rem;
  line-height: 1rem;
  background-color: rgba(4, 12, 20, 0.8);
  color: #00ffff;
  padding: 0 0.6rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.phone span {
  display: inline-block;
  font-size: 0.26rem;
}

.content {
  width: 6.87rem;
  height: 4.5rem;
  margin: 0.54rem auto 1rem;
  padding: 0.2rem 0.51rem;
  box-sizing: border-box;
  position: relative;
}
.content ul li {
  height: 0.92rem;
  border-bottom: 1px solid #0c323a;
  position: relative;
}
.content ul li input {
  font-size: .3rem;
  position: absolute;
  background-color: transparent;
  height: 100%;
  padding-left: 0.1rem;
}
.content ul li button {
  height: 100%;
  line-height: 0.92rem;
  display: inline-block;
  color: #00ffff;
  float: right;
}

.btn-purple-img {
  width: 5.97rem;
  height: 0.91rem;
  line-height: 0.91rem;
}
</style>
