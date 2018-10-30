<template>
  <div class="password">
       <header>
		<a href="javascript:void(0)" onclick="history.go(-1)">
			<img src="@/assets//img/icon/leftf.png" alt="">
		</a>
		<div class="title">{{$t('password.a')}}</div>
	</header>
	<main class="mainbg">
        <div class="content lt  rb">
                <i class="lb"></i>
                <i class="rt"></i>
                <ul>
                    <li><input type="text" :placeholder="$t('password.b')" class="user userName" v-model.trim="userName"></li>
                    <li><input type="text" :placeholder="$t('password.c')" class="userphone mobile" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" @blur="fn" v-model.trim="mobile"></li>
                    <li><input type="password" :placeholder="$t('password.d')" class="password " maxlength="20" v-model.trim="password"></li>
                    <li><input type="text" :placeholder="$t('password.e')" class="againpassword code" v-model.trim="code"><button @click="Whether('extract')" v-if="!ishowcode">{{$t('message.c')}}</button> <validate v-if="ishowcode" :SMS="SMS"  @isend="isend"></validate></li>
                    <li><input type="text" :placeholder="$t('password.f')" class="againpassword googlecode" v-model.trim="googlecode"></li>
                </ul>
                <div class="tipsbox">
                    <div class="top">
                        <img src="@/assets/img/icon/select.png" alt="">
                        <p>{{$t('password.g')}}</p>
                    </div>
                    <div class="bottom">
                        <p>{{$t('password.h')}}</p>
                    </div>
                </div>
        </div>
		<div class="btn-purple-img confirm" @click="confirm">{{$t('password.i')}}</div>
	</main>
  </div>
</template>

<script>
import validate from "@/components/subcomponents/validate";
export default {
  data() {
    return {
      userName: null,
      mobile: null,
      password: null,
      code: null,
      googlecode: null,
      SMS: null,
      ishowcode:false
    };
  },
  components: {
    validate: validate
  },
  methods: {
     Whether() {
       if (this.userName==null ||this.userName==undefined || this.userName=="") {
        this.$toast(this.$t("password.b"));  
        return
      }
      if (this.mobile==null ||this.mobile==undefined || this.mobile=="") {
        this.$toast(this.$t("password.c"));  
        return
      }
      if (this.password==null ||this.password==undefined || this.password=="") {
        this.$toast(this.$t("password.d"));  
        return
      }
      this.ishowcode=true;
    },
    isend(isend){
        this.ishowcode=false;
    },
    fn() {
      this.SMS = { format: "P", name: this.userName, phone: this.mobile };
    },
    confirm(){
      if (this.userName==null ||this.userName==undefined || this.userName=="") {
        this.$toast(this.$t("password.b"));  
        return
      }
      if (this.mobile==null ||this.mobile==undefined || this.mobile=="") {
        this.$toast(this.$t("password.c"));  
        return
      }
      if (this.password==null ||this.password==undefined || this.password=="") {
        this.$toast(this.$t("password.d"));  
        return
      }
      if (this.code==null ||this.code==undefined || this.code=="") {
        this.$toast(this.$t("password.e"));  
        return
      }
      if (this.googlecode==null ||this.googlecode==undefined || this.googlecode=="") {
        this.$toast(this.$t("password.f"));  
        return
      }

       this.$Loading();

      var params = new URLSearchParams();
      params.append("transCode", "akb10004");
      params.append("userName", this.userName);
      params.append("mobile", this.mobile);
      params.append("password", this.$md5(this.password));
      params.append("code", this.code);
      params.append("googlecode",this.googlecode);

      this.$axios({ data: params}).then(ret => {
         this.$Loading("false");;
        if ( ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {
          this.$router.push("/login")
        } else if (ret.data.respCode == "00000") {
          this.$toast(this.$t("password.g"));
          this.$router.push("/login");
        } else {
          this.$toast(ret.data.respMsg);
        }
      });


    }
  }
};
</script>


<style scoped>
.password {
  height: 100%;
  width: 100%;
}
.content {
  width: 6.87rem;
  height: 5.17rem;
  margin: 0.54rem auto 3.75rem;
  padding: 0rem 0.51rem 0.42rem;
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
  left: 0;
  top: 0;
  line-height: 0.92rem;
  height: 0.92rem;
  background-color: transparent;
}
.content .tipsbox {
  height: 3.59rem;
  width: 4.61rem;
  background-color: #000000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
.content .tipsbox .top {
  height: 2.5rem;
  border-bottom: 1px solid #103032;
  padding-top: 0.62rem;
  box-sizing: border-box;
}
.content .tipsbox .top img {
  height: 0.75rem;
  width: 0.75rem;
  margin: 0 auto;
}
.content .tipsbox .top p {
  margin-top: 0.3rem;
  text-align: center;
  color: #00ffff;
}
.content .tipsbox .bottom {
  height: 1.08rem;
  padding-top: 0.25rem;
  box-sizing: border-box;
}
.content .tipsbox .bottom p {
  text-align: center;
  color: #00ffff;
}

.btn-purple-img {
  width: 5.97rem;
  height: 0.91rem;
  line-height: 0.91rem;
}
.content ul li button {
  float: right;
  height: 100%;
  line-height: 0.92rem;
  display: inline-block;
  color: #00ffff;
}
</style>
