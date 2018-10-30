<template>
   <div class="modify">
           <header>
        <a href="javascript:void(0)" onclick="history.go(-1)">
            <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t('modify.a')}}</div>
    </header>
    <main class="mainbg">
        <div class="content lt  rb">
            <i class="lb"></i>
            <i class="rt"></i>
            <ul>
                <li><input type="text" :placeholder="$t('modify.b')" class="user username"></li>
                <li><input type="password" :placeholder="$t('modify.c')" class="password loginpwd" v-model.trim="password"></li>
                <li><input type="text" :placeholder="$t('modify.d')" class="againpassword code"  v-model.trim="code"><button @click="Whether()" v-if="!ishowcode">{{$t('message.c')}}</button> <validate v-if="ishowcode"  SMST="S" @isend="isend"></validate></li>
            </ul>
        </div>
        <div class="btn-purple-img confirm" @click="confirm">{{$t('modify.e')}}</div>
    </main>
   </div>
</template>

<script>
import validate from "@/components/subcomponents/validate";
export default {
  data() {
    return {
      password: null,
      code: null,
      ishowcode:false
    };
  },
  created() {
    console.log();
  },
  components: {
    validate
  },
  methods: {
     Whether() {
      if (this.password == "" || this.password == null || this.password == undefined) {
        this.$toast(this.$t("modify.c")) 
        return;
      }
      this.ishowcode=true;
    },
    isend(isend){
        this.ishowcode=false;
    },
    confirm() {
      if (this.password == "" || this.password == null || this.password == undefined) {
        this.$toast(this.$t("modify.c")) 
        return;
      }
      if (this.code == "" || this.code == null || this.code == undefined) {
        this.$toast(this.$t("modify.d")) 
        return;
      }
      var params = new URLSearchParams();
      params.append("transCode", "akb10020");
      params.append("id", this.$route.params.id);
      params.append("loginpwd", this.$md5(this.password));
      params.append("code", this.code);
      this.$axios({
        data: params
      }).then(ret => {
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
          location.href = "login.html";
        } else if (ret.data.respCode == "00000") { 
         this.$toast(this.$t("modify.f"));
          this.$router.push("/relevant");
        } else {
          this.$toast(ret.data.respMsg);
        }
      });
    }
  }
};
</script>

<style scoped>
.modify {
  height: 100%;
  width: 100%;
}
.content {
  width: 6.87rem;
  height: 3.5rem;
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
  position: absolute;
  opacity: 0.6;
  background-color: transparent;
  height: 100%;
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
