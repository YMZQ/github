<template>
      <div class="me">
        <header>
            <div class="title">{{$t('me.a')}}</div>
        </header>
            <main class="main ">
                <div class="user">
                    <img src="@/assets/img/me/icon.png" alt="">
                    <div class="info">
                        <div>
                          <p>
                            <span>{{$t('me.b')}}:{{info.uname}}</span> 
                            <span class="username"></span> 
                          </p>
                          <p>
                            <span>{{$t('me.c')}}:</span> 
                            <span class="akbid"> {{$t('me.d')}} </span> 
                          </p>
                        </div>	
                        <p v-if="info.googlekey" class="google" style="display: block;">{{$t('me.e')}}: <span class="googlekey copy">{{info.googlekey}}</span> <span class="hide" @click="ishide" > 隐藏 </span> </p>
                    </div>
                </div>
                <div class="userinfo">
                    <ul class="cass">
                        <li>
                          <p>{{$t('me.f')}}</p>
                          <p class="shiming" v-if='info.shiming=="1"'>{{$t('me.r')}}</p>
                          <p class="shiming" v-else-if='info.shiming!="1"'>{{$t('me.s')}}</p>
                        </li>
                        <li>
                          <p>{{$t('me.g')}}</p>
                          <p class="mobile">{{info.mobile}}</p>
                        </li>
                        <li>
                          <p>{{$t('me.h')}}</p>
                          <p class="usertype">{{info.usertype}}</p>
                        </li>
                        <li>
                          <p class="akbid" v-if='info.akbid=="30000"'> {{$t('message.d')}} </p>
                          <p class="akbid" v-else-if='info.akbid=="3000"'>{{$t('message.e')}}</p>
                          <p class="akbid" v-else-if='info.akbid=="1000"'>{{$t('message.f')}}</p>
                          <p class="akbnum">{{info.akbid}}</p>
                        </li>
                        <li>
                          <p>{{$t('me.i')}}</p>
                          <p><span>365</span>/<span class="time">{{info.time}}</span></p>
                        </li>
                        <li>
                          <p>{{$t('me.j')}}</p>
                          <p class="pusername">{{info.pusername}}</p>
                        </li>
                    </ul>
                </div>
                <ul class="details">
                    <li><router-link to="/relevant"> <span>{{$t('me.k')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                    <li><router-link to="/manage">   <span>{{$t('me.l')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                    <li v-if="!isshiming"><router-link to="/real">      <span>{{$t('me.m')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                    <li v-if="isshiming"><router-link to="/Certified"><span>{{$t('me.m')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                    <li><router-link to="/modifypw"> <span>{{$t('me.n')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                    <li><router-link to="/inviting"> <span>{{$t('me.o')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                    <li><router-link to="/notice">   <span>{{$t('me.p')}}</span> <img src="@/assets/img//icon/rf.png"  alt=""></router-link></li>
                </ul>
                <div class="btn-purple-img loginout" @click="$router.push('/')">{{$t('me.q')}}</div>
            </main>
        <footersub nav="me"></footersub>
      </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";
export default {
  data() {
    return {
      isshiming: null,
      info: []
    };
  },
  components: {
    footersub: footersub
  },
  created() {
    this.getdata();
  },
  methods: {
    ishide() {
      this.info.googlekey = false;
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10019");
      this.$axios({
        data: params
      }).then(ret => {
        console.log(ret);
         this.$Loading("false");;
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
          location.href = "login.html";
        } else if (ret.data.respCode == "00000") {
        } else {
        }
      });
    },
    getdata() {
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10010");
      this.$axios({
        data: params
      }).then(ret => {
        console.log(ret);
         this.$Loading("false");;
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
          location.href = "login.html";
        } else if (ret.data.respCode == "00000") {
          this.info = ret.data;
          if (
            ret.data.img1 != "" &&
            ret.data.img1 != null &&
            ret.data.img1 != undefined &&
            ret.data.img2 != "" &&
            ret.data.img2 != null &&
            ret.data.img2 != undefined
          ) {
            this.isshiming = true;
          } else {
            this.isshiming = false;
          }
          var shen = [];
          shen.push(ret.data.img1);
          shen.push(ret.data.img2);
          shen.push(ret.data.idno);
          shen.push(ret.data.uname);
          shen.push(ret.data.shiming);
          localStorage.setItem("cretified", JSON.stringify(shen));
        } else {
        }
      });
    }
  }
};
</script>


<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.me {
  width: 100%;
  height: 100%;
}
.main {
  height: 100%;
}
.main .user {
  margin-top: 0.2rem;
  padding-left: 0.37rem;
  box-sizing: border-box;
  height: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
}
span {
  font-size: 0.24rem;
}
.main .user img {
  width: 0.81rem;
  height: 0.81rem;
  margin-right: 0.2rem;
}
.main .user .info {
  padding-top: 0.05rem;
  box-sizing: border-box;
}
.main .user .info div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.main .user .info div p span {
}
.main .user .info .hide {
  color: #00ffff;
}
.main .user .info p {
  font-size: 0.24rem;
  margin-top: 0.02rem;
}
.main .user .info p span {
  display: inline-block;
}

.main .userinfo {
  width: 6.9rem;
  height: 2.37rem;
  margin-top: 0.27rem;
}
.main .userinfo .cass {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(4, 12, 20, 0.8);
}
.main .userinfo .cass li {
  width: 33%;
  text-align: center;
  color: #00ffff;
  font-size: 0.24rem;
}
.main .userinfo .cass li p:last-child {
  opacity: 0.7;
}
.main .userinfo .cass li:nth-child(2) p:nth-child(2) {
  color: #f75953;
}
.main .userinfo .cass li:nth-child(5) p:nth-child(2) span:last-child {
  color: #f75953;
}
.main .details {
  margin-top: 0.43rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding: 0 0.29rem 0.26rem 0.43rem;
  box-sizing: border-box;
  background-color: rgba(4, 12, 20, 0.8);
}
.main .details li {
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  height: 0.88rem;
  border-bottom: 1px solid #0c333a;
}
.main .details li a {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.main .details li a span {
  color: #00ffff;
  opacity: 0.6;
}
.main .details li a img {
  width: 0.17rem;
  height: 0.29rem;
}
.main .btn-purple-img {
  margin-top: 0.5rem;
  width: 5.9rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
</style>
