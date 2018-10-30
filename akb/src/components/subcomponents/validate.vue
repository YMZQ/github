<template>
   <div class="getcode">
      <button class="getcode" >{{this.auth_time}}s{{$t('message.b')}}</button>
   </div>
</template>

<script>
export default {
  props: {
    SMS: Object,
    SMST: String,
    required: true
  },
  created(){
      this.getcode()
  },
  data() {
    return {
      auth_time: 5,
      SMSTY: null
    };
  },
  methods: {
    isPoneAvailable(phone) {      //验证手机号码
      var reg = /^1[345789]\d{9}$/;
      if (!reg.test(phone)) {
        this.$toast(this.$t("message.g"));
        return false;
      } else {
        return phone;
      }
    },
    getcode() {

      var params = new URLSearchParams();
          params.append("transCode","akb10001");
      if (this.SMS==null &&this.SMST==undefined || this.SMS==undefined &&this.SMST==null) { 
        return;
   console.log(111111111111);
      } else if ( this.SMST && this.SMST != null && this.SMST != undefined && this.SMST != "") {  //提取 修改
        params.append("PhoneNumber", localStorage.getItem("mobile"));
        this.SMSTY = this.SMST;
   console.log(111111111111);
      } else { //注册 忘记密码
        var isPone = this.isPoneAvailable(this.SMS.phone);
        console.log(isPone);
        if (isPone == false) return;
        
        this.SMSTY = this.SMS.format;
        params.append("username", this.SMS.name);
        params.append("PhoneNumber", this.SMS.phone);
   console.log(111111111111);
      }

   //倒计时
   console.log(111111111111);
   
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.auth_time = 5;
          this.$emit("isend","false");
          clearInterval(auth_timetimer);
        }
      }, 1000);

      params.append("BusinessType", this.SMSTY);
      this.$axios({data:params}).then(ret => {
        if (ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {
          this.$router.push("/login");
        } else if (ret.data.respCode == "00000") {
          this.$toast(this.$t("message.a"));
        } else {
          this.$toast(ret.data.respMsg);
        }
      });

    }
  }
};
</script>

<style scoped>
.getcode{
    height: 100%;
}
button {
  float: right;
  display: inline-block;
  height: 100%;
  color: #00ffff;
  font-size: 0.3rem;
}
</style>
