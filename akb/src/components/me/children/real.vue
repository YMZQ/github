<template>
  <div class="real">
    <header>
          <a href="javascript:void(0)" onclick="history.go(-1)"> 
            <img src="@/assets/img/icon/leftf.png" alt="">
          </a>
          <div class="title">{{$t('real.a')}}</div>
    </header>
    <main class="mainbg">
        <div class="user">
            <div class="name">
                <input type="text" :placeholder="$t('real.b')" class="username" v-model.trim="uname">
            </div>
            <div class="subtitle">
                <input type="text" :placeholder="$t('real.c')" class="shennum" maxlength="18" v-model.trim="idno">
            </div>
        </div> 
        <div class="title">
            {{$t('real.d')}}
        </div>
        <div class="front">
            <div class="left">
                <img v-if="isimg1" src="../../../assets/img/me/below.png" alt="">
                <img v-if="!isimg1" :src="img1" alt="" @click="enlarge(img1)">
            </div>
            <div class="right">
                <img src="@/assets/img/icon/add.png" alt="">
                <p> {{$t('real.e')}}</p>
                  <updataimg num="1" @childByValue="childByValue"></updataimg>
            </div>
        </div>
        <div class="below">
            <div class="left">
                <img v-if="isimg2" src="../../../assets/img/me/front.png" alt="">
                <img v-if="!isimg2" :src="img1" alt="" @click="enlarge(img2)">
            </div>
            <div class="right uploadList">
                <img src="@/assets/img/icon/add.png" alt="" >
                <p> {{$t('real.f')}}</p>
                  <updataimg num="2"  @childByValue="childByValue"></updataimg>
            </div>
        </div>
        <div class="btn-purple-img confirm" @click="confirm">
             {{$t('real.g')}}
        </div>
        <p class="bz" > {{$t('real.h')}}</p>
        <div class="bg" v-show="isshow" @click="isshow=false">
          <img :src="img3" alt="">
        </div>
    </main>
  </div>
</template>

<script>
import updataimg from "../../subcomponents/updataimg";
export default {
  data() {
    return {
      uname: null,
      idno: null,
      img1: null,
      img2: null,
      img3: null,
      isimg1:true,
      isimg2:true,
      isshow: false
    };
  },
  components: {
    updataimg: updataimg
  },
  methods: {
    confirm() {
      if (this.uname == null || this.uname == undefined || this.uname == "") {
        this.$toast(this.$t("real.b"));             
        return;
      }
      if (this.idno == null || this.idno == undefined || this.idno == "") {
        this.$toast(this.$t("real.c"));     
        return;
      }
      if (this.img1 == null || this.img1 == undefined ||  this.img1 == "") {
        this.$toast(this.$t("real.e"));     
        return;
      }
      if (this.img2 == null || this.img2 == undefined ||  this.img2 == "") {
        this.$toast(this.$t("real.f"));     
        return;
      }
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10016");
      params.append("uname", this.uname);
      params.append("idno", this.idno);
      params.append("img1", this.img1);
      params.append("img2", this.img2);
      this.$axios({
        data: params
      }).then(ret => {
         this.$Loading("false");;
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
          location.href = "login.html";
        } else if (ret.data.respCode == "00000") {
          this.$router.push("/me");
        } else {
           this.$toast(ret.data.message);
        }
      });
    },
    enlarge(e) {
      this.isshow = true;
      this.img3 = e;
    },
    childByValue: function(childValue) {
      switch (childValue.id) {
        case "1":
          this.img1 = childValue.data;
          this.isimg1=false
          break;
        case "2":
        this.img2 = childValue.data;
          break;
      }
    }
  }
};
</script>
<style scoped>
.real {
  height: 100%;
  width: 100%;
}
main .user {
  height: 2.2rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding: 0 0.3rem;
  margin-top: 0.5rem;
}
main .user .name,
main .user .subtitle {
  position: relative;
  height: 0.9rem;
  border-bottom: 1px solid #0c333a;
}
main .user .name input,
main .user .subtitle input {
  width: 100%;
  height: 100%;
  font-size: 0.3rem;
  position: absolute;
}
main .title {
  font-size: 0.3rem;
  color: #00ffff;
  margin: 0.2rem 0 0.1rem;
}
main .front,
main .below {
  width: 6.9rem;
  height: 2rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding: 0.25rem 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
}
main .front .left img,
main .below .left img {
  width: 2.4rem;
  height: 1.5rem;
}
main .front .right,
main .below .right {
  height: 1.5rem;
  width: 2.2rem;
  text-align: center;
  color: #00ffff;
  position: relative;
}
main .front .right img,
main .below .right img {
  height: 0.5rem;
  width: 0.5rem;
  margin: 0.3rem auto 0.1rem;
  z-index: 2;
}
main .front .right p,
main .below .right p {
  font-size: 0.28rem;
  opacity: 0.8;
}
main .front .right input,
main .below .right input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  z-index: 2;
}
main .btn-purple-img {
  width: 5.9rem;
  height: 0.9rem;
  line-height: 0.9rem;
  margin-top: 0.5rem;
}
main .bz {
  width: 5.57rem;
  height: 0.5rem;
  color: #da212a;
  font-size: 0.18rem;
  margin: 0.2rem auto 0;
  text-align: center;
}
main .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(000, 000, 000, 0.8);
  z-index: 33;
}
main .bg img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
