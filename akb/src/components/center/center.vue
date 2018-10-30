<template>
<div class="center">
    <header>
		       <div class="title">{{$t('center.a')}}</div>
	  </header>
    <main class="main">
      <ul class="tab">  
          <li v-for="item in tab" :key="item.id"  @click="tabs(item.id)" :class="{active:item.id==isshow}">{{item.title}}</li>
      </ul>
       <div class="content">
              <div class="detail" id="baseContent"  v-if="isshow=='1'">
                  <myscroll  @scrollToEnd="scrollToEnd" >
                    <ul>
                        <li v-for="item in CountList">
                              <div class="left"><span>{{item.remark}}</span><span></span></div>
                              <div class="right">
                                    <span v-if="item.sztype==0">-{{item.amount}}</span> 
                                    <span v-else-if="item.sztype==1"  class="gren">+{{item.amount}}</span>
                                    <span>{{item.initdate}} </span>
                              </div>
                          </li>
                    </ul>
                  </myscroll>
              </div>

              <div class="transfer" v-if="isshow=='2'">
                  <div class="usertop lt rts">
                      <div class="use">
                          <input type="text" :placeholder="$t('center.e')" class="username" v-model.trim="username" @blur="blurFn">
                      </div>
                      <div class="num">
                          <p>{{$t('center.f')}}: <span class="us"></span>{{us}}</p>
                          <input type="text" :placeholder="$t('center.g')"  class="nums" v-model.trim="num">
                      </div>
                      <p class="price">{{$t('center.h')}}: <span class="walletamt">{{walletamt}}</span></p>
                  </div>
                  <div class="userbot rb lbs">
                      <ul>
                          <li><input type="password"  :placeholder="$t('center.i')" class="paypwd"  v-model.trim="paypwd"></li>
                          <li class="codebox" v-if="iscode"><input type="text" :placeholder="$t('center.j')" class="code"  v-model.trim="code"><button @click="Whether('transfer')" v-if="!ishowcode">{{$t('message.c')}}</button> <validate v-if="ishowcode" SMST="Z" @isend="isend"></validate></li>
                          <li><input type="text" :placeholder="$t('center.k')" class="googlecode"  v-model.trim="googlecode"></li>
                      </ul>
                  </div>
                  <div class="btn-purple-img purple"   @click="transfer()">{{$t('center.l')}} </div>
                    <div class="div"></div>
              </div> 

              <div class="extract"    v-if="isshow=='3'">
                  <div class="usertop lt rts">
                      <div class="use">
                          <input type="text" :placeholder="$t('center.g')" class="num" v-model.trim="num" >
                      </div>
                      <div class="num">
                          <p>{{$t('center.m')}}:<span class="walletamt">{{walletamt}}</span></p>
                          <input type="text" :placeholder="$t('center.n')" class="purseaddress" v-model.trim="purseaddress">
                      </div>
                      
                      <div class="remarks">
                            {{$t('center.o')}} 
                      </div>
                      
                  </div>
                  <div class="userbot rb lbs">
                        <ul>
                            <li ><input type="password" :placeholder="$t('center.i')" v-model.trim="paypwd" class="paypwd"></li>
                            <li ><input type="text" :placeholder="$t('center.j')" v-model.trim="code" class="code"> <button @click="Whether('extract')" v-if="!ishowcode">{{$t('message.c')}}</button> <validate v-if="ishowcode" SMST="T" @isend="isend"></validate></li>
                            <li><input type="text" :placeholder="$t('center.k')" v-model.trim="googlecode" class="googlecode"></li>
                            <p>{{$t('center.p')}} </p>
                        </ul>
                  </div>
                  <div class="btn-purple-img purple"  @click="extract()">{{$t('center.l')}} </div>
                  <div class="div"></div>
            </div>    
      </div>

    </main>
    <footersub nav="center"></footersub>
  </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";
import betterscroll from "@/common/betterscroll";
import validate from "@/components/subcomponents/validate";
export default {
  data() {
    return {
      tab: [
        { title: this.$t("center.b"), id: "1" },
        { title: this.$t("center.c"), id: "2" },
        { title: this.$t("center.d"), id: "3" }
      ],
      CountList: [],
      isshow: "1",
      walletamt: null,
      username: null,
      num: null,
      paypwd: null,
      code: null,
      us: null,
      googlecode: null,
      purseaddress: null,
      pageNum: 1,
      page: 1,
      pagesAvailable: 1,
      issever: true,
      iscode: false,
      ishowcode: false
    };
  },
  components: {
    footersub: footersub,
    myscroll: betterscroll,
    validate: validate
  },
  created() {
    this.detail();
  },
  methods: {
    Whether(e) {
      console.log(e);
      if(e=="transfer"){
        if (this.username == "" || this.username == null || this.username == undefined ){    
          this.$toast(this.$t("center.e")) 
            return;
        } 
      }else if(e=="extract"){
       if(this.purseaddress == "" || this.purseaddress == null || this.purseaddress == undefined) {
        this.$toast(this.$t("center.n")) 
        return;
       }
      }
      
      if (this.num == "" || this.num == null || this.num == undefined) {
       this.$toast(this.$t("center.g")) 
       return;
      }

      if ( this.paypwd == "" || this.paypwd == null || this.paypwd == undefined ) {
       this.$toast(this.$t("center.i")) 
       return;
      }
      
      this.ishowcode=true;
    },
    isend(isend){
        this.ishowcode=false;
    },
  
    blurFn() {
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10007");
      params.append("username", this.username);
      this.$axios({data:params}).then(ret => {
        this.$Loading("false");
        if (ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {

        } else if (ret.data.respCode == "00000") {
          this.us = ret.data.uname;
        } else {
          this.$toast(ret.data.respMsg);
        }
      });
    },

    tabs(e) {  //nav 切换
      this.isshow = e;
      switch (this.isshow) {
        case "1":
          this.detail();
          break;
        case "2":
          this.Balance();
          this.walletamt = null;
          this.username = null;
          this.num = null;
          this.paypwd = null;
          this.code = null;
          this.googlecode = null;
          this.purseaddress = null;
          this.ishow=false;
          break;
        case "3":
          this.Balance();
          this.walletamt = null;
          this.username = null;
          this.num = null;
          this.paypwd = null;
          this.code = null;
          this.googlecode = null;
          this.purseaddress = null;
          this.ishow=false;
          break;
      }
    },
    detail() {
      //交易记
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10006");
      params.append("pageNo", this.pageNum);
      this.$axios({
        data: params
      }).then(ret => {
        this.$Loading("false");
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
        } else if (ret.data.respCode == "00000") {
          ret.data.page.pageItems.forEach(element => {
            this.CountList.push(element);
          });
          this.page = ret.data.page.pagesAvailable;
          this.issever = true;
        } else {
        }
      });
    },
    scrollToEnd() { //加载更多
        if (this.page > this.pagesAvailable) {
          this.pageNum++;
          this.pagesAvailable++;
          if (this.issever) {
            this.issever = false;
            this.detail();
          }
        }
      },

    transfer() {
      if ( this.username == "" || this.username == null || this.username == undefined ) {
        this.$toast(this.$t("center.e"))
        return;
      }
      if (this.num == "" || this.num == null || this.num == undefined) {
       this.$toast(this.$t("center.g")) 
       return;
      }

      if ( this.paypwd == "" || this.paypwd == null || this.paypwd == undefined ) {
       this.$toast(this.$t("center.i")) 
       return;
      }

      if ( this.code == "" || this.code == null || this.code == undefined) {
       this.$toast(this.$t("center.j")) 
       return;
      }

      if ( this.googlecode == "" || this.googlecode == null || this.googlecode == undefined) {
       this.$toast(this.$t("center.k")) 
       return;
      }
      this.Continue()
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10008");
      params.append("username", this.username);
      params.append("num", this.num);
      params.append("paypwd", this.$md5(this.paypwd));
      params.append("code", this.code);
      params.append("googlecode", this.googlecode);
      this.$axios({
        data: params
      }).then(ret => {
        this.$Loading("false");
        if (ret.data.respCode == "99999" ||ret.data.respCode == "99990" ||ret.data.respCode == "1") {
        } else if (ret.data.respCode == "00000") {
          this.isshow = "1";
          this.$toast(this.$t("center.q"));
          location.reload();
        } else {
          this.$toast(ret.data.respMsg);
        }
      });
    },
    Balance() {
      //余额
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10017");
      this.$axios({
        data: params
      }).then(ret => {
        this.$Loading("false");
        if ( ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {
        } else if (ret.data.respCode == "00000") {
          this.walletamt = ret.data.walletamt;
          console.log(ret.data.state);
          if (ret.data.state == 0) {
            this.iscode = true;
          } else {
            this.iscode = false;
          }
        } else {
          this.$toast(ret.data.respMsg);
        }
      });
    },
    extract() {
      if ( this.purseaddress == "" || this.purseaddress == null || this.purseaddress == undefined) {
        this.$toast(this.$t("center.n"))
        return;
      }
      if (this.num == "" || this.num == null || this.num == undefined) {
       this.$toast(this.$t("center.g")) 
       return;
      }

      if ( this.paypwd == "" || this.paypwd == null || this.paypwd == undefined ) {
       this.$toast(this.$t("center.i")) 
       return;
      }

      if ( this.code == "" || this.code == null || this.code == undefined) {
       this.$toast(this.$t("center.j")) 
       return;
      }

      if ( this.googlecode == "" || this.googlecode == null || this.googlecode == undefined) {
       this.$toast(this.$t("center.k")) 
       return;
      }
      this.Continue()
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10009");
      params.append("purseaddress", this.purseaddress);
      params.append("num", this.num);
      params.append("paypwd", this.$md5(this.paypwd));
      params.append("code", this.code);
      params.append("googlecode", this.googlecode);
      this.$axios({
        data: params
      }).then(ret => {
        this.$Loading("false");
        if ( ret.data.respCode == "99999" || ret.data.respCode == "99990" || ret.data.respCode == "1") {
        } else if (ret.data.respCode == "00000") {
          this.isshow = "1";
          this.$toast(this.$t("center.q"));
          location.reload();
        } else {
          this.$toast(ret.data.respMsg);
        }
      });
    }
  }
};
</script>


<style scoped>
main {
  width: 100%;
  height: 100%;
}
.center {
  height: 100%;
  width: 100%;
}
.main .content .detail ul li .right .gren {
  color: #16a71e;
}
.tab {
  width: 6.9rem;
  height: 0.97rem;
  background-color: rgba(4, 12, 20, 0.8);
  position: fixed;
  z-index: 1;
  background-color: #0c141b;
  display: flex;
}
.tab li {
  width: 100%;
  height: 100%;
  line-height: 0.97rem;
  text-align: center;
  color: #00ffff;
  font-size: 0.3rem;
  font-weight: 700;
  position: relative;
}
.main .content {
  padding-top: 1.5rem;
  box-sizing: border-box;
  height: 100%;
}
.main .content .detail,
.my-scroll {
  height: 100%;
  overflow: hidden;
}
.main .content .detail ul {
  width: 6.9rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding: 0 0.4rem 0.26rem 0.32rem;
  box-sizing: border-box;
  overflow: hidden;
}
.main .content .detail ul li {
  height: 1.13rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0b2b32;
}
.main .content .detail ul li .left {
  display: flex;
  flex-direction: column;
}
.main .content .detail ul li .left span {
  color: #ffffff;
  font-size: 0.3rem;
}
.main .content .detail ul li .right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.main .content .detail ul li .right span {
  color: #e15352;
  font-size: 0.3rem;
}
.main .content .detail ul li .right span:nth-child(2) {
  color: #666666;
}
.main .content .transfer .usertop,
.main .content .extract .usertop {
  height: 4rem;
  width: 6.9rem;
  background-color: rgba(4, 12, 20, 0.8);
  margin-bottom: 0.4rem;
  padding: 0 0.6rem;
  box-sizing: border-box;
  color: #00ffff;
  position: relative;
}
.main .content .transfer .usertop .use {
  border-bottom: 1px solid #0b2b32;
}
.main .content .transfer .usertop .use input,
.main .content .extract .usertop .use input {
  height: 0.9rem;
  font-size: 0.3rem;
}
.main .content .transfer .usertop .num,
.main .content .extract .usertop .num {
  border-bottom: 1px solid #0b2b32;
  width: 100%;
}
.main .content .transfer .usertop .num p,
.main .content .extract .usertop .num p {
  margin-top: 0.26rem;
  text-align: right;
  font-size: 0.24rem;
  opacity: 0.6;
}
.main .content .transfer .usertop .num input,
.main .content .extract .usertop .num input {
  font-size: 0.3rem;
  height: 0.8rem;
}
.main .content .transfer .usertop .price,
.main .content .extract .usertop .price {
  margin-top: 0.1rem;
  text-align: right;
  font-size: 0.24rem;
  opacity: 0.6;
}
.main .content .transfer .userbot,
.main .content .extract .userbot {
  height: 3.3rem;
  width: 6.9rem;
  background-color: rgba(4, 12, 20, 0.8);
  position: relative;
}
.main .content .transfer .userbot ul,
.main .content .extract .userbot ul {
  padding: 0 0.6rem 0.45rem;
  box-sizing: border-box;
}
.main .content .transfer .userbot ul li,
.main .content .extract .userbot ul li {
  position: relative;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 1px solid #0b2b32;
}
.main .content .transfer .userbot ul li button,
.main .content .extract .userbot ul li button {
  float: right;
  display: inline-block;
  height: 100%;
  color: #00ffff;
  font-size: 0.3rem;
}
.main .content .transfer .userbot ul li input,
.main .content .extract .userbot ul li input {
  width: 62%;
  height: 100%;
  font-size: 0.3rem;
  position: absolute;
  top: 0;
  left: 0;
}
.main .content .transfer .btn-purple-img,
.main .content .extract .btn-purple-img {
  margin-top: 1rem;
  height: 0.8rem;
  width: 5.9rem;
  color: #001111;
  font-size: 0.36rem;
  font-weight: 600;
}

.main .content .extract .usertop {
  height: 4rem;
}
.main .content .extract .usertop .remarks {
  margin-top: 0.05rem;
  width: 6rem;
  color: #1b73bd;
  opacity: 0.9;
  font-size: 0.18rem;
}
.main .content .extract .userbot {
  height: 3.8rem;
}
.main .content .extract .userbot p {
  margin: 0.1rem 0;
  color: #1b73bd;
  opacity: 0.9;
  font-size: 0.18rem;
  text-align: center;
}
.main .content .extract .btn-purple-img {
  margin-top: 0.5rem;
}
.main .content .transfer .userbot ul .code,
.main .content .extract .userbot ul .code {
  width: 2.5rem;
}
.tab .active {
  color: #ffffff;
}
.main .tab .active:before {
  content: "";
  position: absolute;
  width: 2.3rem;
  height: 0.04rem;
  background-color: #ffffff;
  right: 0;
  top: 0;
}
.div {
  height: 1.5rem;
  width: 100%;
}
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
