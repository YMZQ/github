<template>
      <main class="mainbg">
        <div class="lang">
          <div class="title" @click="ishow=!ishow">{{titlelang}}<img src="" alt=""></div>
          <ul v-show="ishow" >
            <li v-for="item in langg" @click="lang(item)">{{item.title}}</li>
          </ul>
        </div>
        <div class="logo">
          <img src="@/assets/img/login-logo.png" alt="logo">
        </div>
        <div class="login edge">
          <div class="user">
            <img src="@/assets/img/login/user.png" alt="">
            <input type="text" :placeholder="$t('login.a')"   class="username"  v-model.trim="username" >
          </div>
          <div class="margint20 pass">
            <img src="@/assets/img/login/password.png" alt="">
            <input type="password" :placeholder="$t('login.b')" class="password" v-model.trim="password">
          </div>
          <div class="forget"><router-link to="password">{{$t("login.c")}}</router-link></div>
          <div class="btn-purple-img purple" @click='login'>{{$t("login.d")}}</div>
        </div>
      </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      ishow: false,
      titlelang: "简体",
      langg: [{title:"简体",type:"zh"},{title:"繁体",type:"ft"},{title:"英文",type:"cn"}, {title:"韩文",type:"hw"}, {title:"日文",type:"rw"}],
      ZH: [{title:"简体",type:"zh"},{title:"繁体",type:"ft"},{title:"英文",type:"cn"}, {title:"韩文",type:"hw"}, {title:"日文",type:"rw"}],
      FT: [{title:"繁體",type:"ft"},{title:"簡體",type:"zh"},{title:"英文",type:"cn"}, {title:"韓文",type:"hw"}, {title:"日文",type:"rw"}],
      EN: [{title:"English",type:"cn"},{title:"Chinese_TW",type:"ft"},{title:"Chinese",type:"zh"}, {title:"Korean",type:"hw"}, {title:"Japanese",type:"rw"}],
      HW: [{title:"한국어",type:"hw"}, {title:"일본어",type:"rw"},{title:"전통",type:"ft"},{title:"중국어",type:"zh"},{title:"영어",type:"cn"}],
      RW: [{title:"日本語",type:"rw"},{title:"韓国語",type:"hw"},{title:"繁体字中国語",type:"ft"},{title:"中国語",type:"zh"},{title:"英語",type:"cn"}],
    };
  },
  created(){
      switch (localStorage.getItem("lang")) {
        case 'ZH':
         this.titlelang="简体"
         this.langg=this.ZH
          break;
        case 'FT':
         this.titlelang="繁體"
         this.langg=this.FT
          break;
        case 'EN':
         this.titlelang="English"
         this.langg=this.EN
          break;
        case 'HW':
         this.titlelang="한국어"
         this.langg=this.HW
          break;
        case 'RW':
         this.titlelang="日本語"
         this.langg=this.RW
          break;
      }
  },
  methods: {
    lang(e) {
      var type= e.type
      var params = new URLSearchParams();
      params.append("transCode", "akb11111");
      params.append("lang",type);
      this.$axios({ data: params }).then(ret => {
        if (ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {
              this.$router.push("/login")
        } else if (ret.data.respCode == "00000") {
          
            if (e.title == "简体" || e.title == "簡體" || e.title == "Chinese" || e.title == "Chinese" || e.title == "中国語") {
              this.titlelang = "简体";
              localStorage.setItem("lang",'ZH')
              this.langg = this.ZH;
              this.$i18n.locale='ZH'
            } else if (e.title == "繁体" || e.title == "Chinese_TW" || e.title == "繁體" || e.title == "전통" || e.title == "繁体字中国語") {
              this.titlelang = "繁体";
              localStorage.setItem("lang",'FT')
              this.langg = this.FT;
              this.$i18n.locale='FT';
            } else if (e.title == "EN" || e.title == "英文" || e.title == "英文" || e.title == "영어" || e.title == "英語") {
              this.titlelang = "EN";
              localStorage.setItem("lang",'EN')
              this.langg = this.EN;
              this.$i18n.locale='EN';
            } else if (e.title == "韩文" || e.title == "韓文" || e.title == "Korean" || e.title == "한국어" || e.title == "韓国語") {
              this.titlelang = "한국어";
              localStorage.setItem("lang",'HW')
              this.langg = this.HW;
              this.$i18n.locale='HW';
            }else if (e.title == "日文" || e.title == "日文" || e.title == "Japanese" || e.title == "일본어" || e.title == "日本語") {
              this.titlelang = "日本語";
              localStorage.setItem("lang",'RW')
              this.langg = this.RW;
              this.$i18n.locale='RW';
            }
            this.ishow=!this.ishow

        } else {
          this.$toast(ret.data.respMsg)
        }
      });
    },

    login() {
      if ( this.username == "" || this.username == undefined || this.username == null) {
        this.$toast(this.$t("login.a"));
        return false;
      }
      if ( this.password == "" || this.password == undefined || this.password == null) {
        this.$toast(this.$t("login.b"));
        return false;
      }
      this.$Loading();

      var params = new URLSearchParams();
      params.append("transCode", "akb10003");
      params.append("userName", this.username);
      params.append("password", this.$md5(this.password));
      this.$axios({data: params}).then(ret => {
         this.$Loading("false");;
        if (ret.data.respCode == "99999" ||ret.data.respCode == "99990" || ret.data.respCode == "1" ) {
           this.$router.push("/login");
        } else if (ret.data.respCode == "00000") {          
          localStorage.setItem("mobile", ret.data.mobile);
          if(ret.data.newsList.length!=0){
            localStorage.setItem("pagenum","1")
            localStorage.setItem("newsList",JSON.stringify(ret.data.newsList))
            this.$router.push("/notice")
          }else{
            this.$router.push("/home");
          }
        } else {
          this.$toast(ret.data.respMsg)
        }
      });
    }
  }
};
</script>


<style scoped>
main {
  position: relative;
}

.mainbg {
  background: url("../../assets/img/login/l.gif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

.lang {
  color: #f3f3f3;
  width: 2.07rem;
  position: absolute;
  right: 0.46rem;
  top: 0.56rem;
}
.lang .title {
  text-align: right;
  font-size: 0.28rem;
}
.lang ul {
  color: #f3f3f3;
  width: 100%;
  height: 2.16rem;
  padding: 0.27rem 0;
  text-align: center;
  box-sizing: border-box;
  background: url("../../assets/img/login/lang.png");
  position: absolute;
  right: 0;
  top: 0.5rem;
  font-size: 0.26rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.lang ul li {
  color: #f3f3f3;
  height: 0.4 0.5rem;
}

.logo {
  padding-top: 1.5rem;
}
.logo img {
  margin: 0 auto;
  width: 1.77rem;
  height: 1.63rem;
}
.margint20 {
  margin-top: .1rem;
}
.login {
  margin: 0.95rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 4.4rem;
  width: 5.44rem;
  position: relative;
  padding-top: 0.6rem;
  box-sizing: border-box;
}
.login .user,
.login .pass {
  width: 100%;
  height: 0.76rem;
  background: url("../../assets/img/icon/border.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.05rem 0.1rem;
  box-sizing: border-box;
  position: relative;
}
.login .user input,
.login .pass input {
  position: absolute;
  left: 0.7rem;
  height: 0.65rem;
  font-size: 0.24rem;
  background-color: transparent;
}
.login .user img,
.login .pass img {
  position: absolute;
  top: 50%;
  left: 0.3rem;
  transform: translateY(-50%);
  width: 0.26rem;
  height: 0.36rem;
}

.forget {
  margin-top: 0.21rem;
  margin-bottom: 0.32rem;
  text-align: right;
  width: 100%;
  font-size: 0.24rem;
  color: #ffffff;
}
.forget a {
  color: #fff;
}

.btn-purple-img {
  width: 5.43rem;
  height: 0.66rem;
  line-height: 0.66rem;
}
</style>
