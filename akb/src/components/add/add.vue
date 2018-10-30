<template>
<div class="add">
    <header>
		<div class="title">{{$t('add.a')}}</div>
	</header>
	<main class="main mainbg ">
		<div class="title"><span>{{$t('add.b')}}</span> <span class="push-right">{{mobile}}</span></div>
		<div class="usertop  lt rts">
			<ul class="usertops ">
				<li><input type="text"  :placeholder="$t('add.c')" class="userName" v-model.trim="userName" ></li>
				<li>
				    <input class="nodetype" :placeholder="$t('add.d')" readonly="readonly" v-model.trim="typeoff.title"><img src="@/assets/img/icon/bottomf.png"   alt="" class="choice" @click="ishow=!ishow">
					<ul class="ft" v-show="ishow">
            <li v-for="item in typs"  @click="types(item)">{{item.title}}</li>
					</ul>
				</li>
				<li><input type="text" :placeholder="$t('add.h')" class="phone"  maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" @blur="Phone" v-model.trim="phone"></li>
				<li><input type="text" :placeholder="$t('add.i')" class="email" v-model.trim="email"></li>
			</ul>
		</div>
		<div class="userbottom rb lbs">
			<ul class="ub">
				<li><input type="password" :placeholder="$t('add.j')" class="password" v-model.trim="password"></li>
				<li><input type="password" :placeholder="$t('add.k')" class="payPassword" v-model.trim="payPassword"></li>
				<li><input type="text"     :placeholder="$t('add.l')" class="code" v-model.trim="code"> <button @click="Whether()" v-if="!ishowcode" class="getcode">{{$t('message.c')}}</button><validate v-if="ishowcode" :SMS="SMS"></validate></li>
			</ul>
		</div>
		<div class="btn-purple-img purple" @click="add">{{$t('add.n')}}</div>
		<!-- <div class="protocol">
			<img src="../img/add/choice.png" alt="">
			<p>{{$t('add.o')}}</p>
		</div> -->
	</main>
     <footersub nav="add"></footersub>
  </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";
import validate from "@/components/subcomponents/validate";
export default {
  data() {
    return {
      ishow: false,
      typs: [
        { id: "1000", title: this.$t("add.e") },
        { id: "3000", title: this.$t("add.f") },
        { id: "30000", title: this.$t("add.g") }
      ],
      mobile: "",
      typeoff: [],
      userName: null,
      phone: null,
      email: null,
      password: null,
      payPassword: null,
      code: null,
      SMS: null,
      ishowcode:false
    };
  },
  components: {
    footersub: footersub,
    validate: validate
  },
  created() {
    this.mobile = localStorage.getItem("mobile");
  },
  methods: {
    Whether() {
       if (this.userName == null || this.userName == undefined || this.userName == "" ) {
        this.$toast(this.$t("add.c"));
        return;
      }
      if ( this.typeoff.id == null || this.typeoff.id == undefined || this.typeoff.id == "" ) {
        this.$toast(this.$t("add.d"));
        return;
      }
      if (this.phone == null || this.phone == undefined || this.phone == "") {
        this.$toast(this.$t("add.h"));
        return;
      }
      if (this.email == null || this.email == undefined || this.email == "") {
        this.$toast(this.$t("add.i"));
        return;
      }
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
      if(!reg.test(this.email)){
        this.$toast(this.$t("add.q"));
        return;
      }
      if ( this.password == null || this.password == undefined || this.password == "") {
        this.$toast(this.$t("add.j"));
        return;
      }
      if ( this.payPassword == null || this.payPassword == undefined || this.payPassword == "" ) {
        this.$toast(this.$t("add.k"));
        return;
      }
      this.ishowcode=true;
    },
    isend(isend){
        this.ishowcode=false;
    },


    types(e) {
      this.typeoff = e;
      this.ishow = false;
    },
    Phone() {
      this.SMS = { format: "R", name: this.userName, phone: this.phone };
    },
    add() {
      if (this.userName == null || this.userName == undefined || this.userName == "" ) {
        this.$toast(this.$t("add.c"));
        return;
      }
      if ( this.typeoff.id == null || this.typeoff.id == undefined || this.typeoff.id == "" ) {
        this.$toast(this.$t("add.d"));
        return;
      }
      if (this.phone == null || this.phone == undefined || this.phone == "") {
        this.$toast(this.$t("add.h"));
        return;
      }
      if (this.email == null || this.email == undefined || this.email == "") {
        this.$toast(this.$t("add.i"));
        return;
      }
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
      if(!reg.test(this.email)){
        this.$toast(this.$t("add.q"));
        return;
      }
      if ( this.password == null || this.password == undefined || this.password == "") {
        this.$toast(this.$t("add.j"));
        return;
      }
      if ( this.payPassword == null || this.payPassword == undefined || this.payPassword == "" ) {
        this.$toast(this.$t("add.k"));
        return;
      }
      if (this.code == null || this.code == undefined || this.code == "") {
        this.$toast(this.$t("add.l"));
        return;
      }
      this.$Loading();

      var params = new URLSearchParams();
      params.append("transCode", "akb10002");
      params.append("userName", this.userName);
      params.append("nodetype", this.typeoff.id);
      params.append("phone", this.phone);
      params.append("email", this.email);
      params.append("password", this.$md5(this.password));
      params.append("payPassword", this.$md5(this.payPassword));
      params.append("code", this.code);
      
      this.$axios({ data: params}).then(ret => {
         this.$Loading("false");;
        if ( ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {
          this.$router.push("/login")
        } else if (ret.data.respCode == "00000") {
          this.$toast(this.$t("add.p"));
          this.$router.push("/home");
        } else {
          this.$toast(ret.data.respMsg);
        }
      });

    }
  }
};
</script>


<style scoped>
.add {
  height: 100%;
  width: 100%;
}
.main .title {
  width: 6.9rem;
  height: 0.97rem;
  line-height: 0.97rem;
  background-color: rgba(4, 12, 20, 0.8);
  color: #00ffff;
  font-size: 0.3rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}
.main .title span:first-child {
  margin-left: 0.58rem;
}
.main .usertop,
.main .userbottom {
  width: 6.9rem;
  height: 3.9rem;
  background-color: rgba(4, 12, 20, 0.8);
  position: relative;
  margin-bottom: 0.34rem;
}
.main .usertop .usertops,
.main .usertop .ub,
.main .userbottom .usertops,
.main .userbottom .ub {
  display: flex;
  flex-direction: column;
  padding: 0.1rem 0.66rem 0 0.57rem;
  box-sizing: border-box;
}
.main .usertop .usertops li,
.main .usertop .ub li,
.main .userbottom .usertops li,
.main .userbottom .ub li {
  width: 100%;
  height: 0.86rem;
  border-bottom: 1px solid #0c353c;
  position: relative;
}
.main .usertop .usertops li:nth-child(2),
.main .usertop .ub li:nth-child(2),
.main .userbottom .usertops li:nth-child(2),
.main .userbottom .ub li:nth-child(2) {
  position: relative;
}
.main .usertop .usertops li:nth-child(2) input {
  flex: 1;
  height: 100%;
  line-height: 0.86rem;
  color: #00ffff;
  font-size: 0.3rem;
  padding-left: 0.1rem;
  box-sizing: border-box;
}
.main .usertop .usertops li:nth-child(2) img,
.main .usertop .ub li:nth-child(2) img,
.main .userbottom .usertops li:nth-child(2) img,
.main .userbottom .ub li:nth-child(2) img {
  height: 0.19rem;
  width: 0.3rem;
  position: absolute;
  top: 50%;
  right: 0.1rem;
  transform: translateY(-50%);
}
.main .usertop .usertops li:nth-child(2) ul,
.main .usertop .ub li:nth-child(2) ul,
.main .userbottom .usertops li:nth-child(2) ul,
.main .userbottom .ub li:nth-child(2) ul {
  width: 3.3rem;
  height: 2.3rem;
  position: absolute;
  right: 0.1rem;
  top: 0.64rem;
  background-color: #111114;
  z-index: 1;
}
.main .usertop .usertops li:nth-child(2) ul li,
.main .usertop .ub li:nth-child(2) ul li,
.main .userbottom .usertops li:nth-child(2) ul li,
.main .userbottom .ub li:nth-child(2) ul li {
  border: none;
  height: 0.73rem;
  line-height: 0.73rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.3rem;
  opacity: 0.7;
}
.main .usertop .usertops li input,
.main .usertop .ub li input,
.main .userbottom .usertops li input,
.main .userbottom .ub li input {
  width: 70%;
  height: 100%;
  font-size: 0.3rem;
  position: absolute;
  left: 0;
  top: 0;
}
.main .userbottom {
  height: 3.29rem;
}
.main .userbottom .ub li:last-child {
  display: flex;
  justify-content: space-between;
}
.main .userbottom .ub li:last-child .getcode {
  position: absolute;
  right: 0.2rem;
  width: 1.6rem;
  height: 0.86rem;
  line-height: 0.86rem;
  color: #00ffff;
  text-align: center;
}
.main .btn-purple-img {
  width: 5.88rem;
  height: 0.82rem;
  font-size: 0.36rem;
}
.main .protocol {
  margin-top: 0.27rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00ffff;
  opacity: 0.8;
}
.main .protocol img {
  width: 0.24rem;
  height: 0.24rem;
  margin-right: 0.1rem;
}
</style>
