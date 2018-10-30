<template>
  <div class="home">
		<header>
			<div class="title">AKB</div>
		</header>
	<main class="main ">
        <div class="total lt  rb">
          <i class="rt"></i>
          <i class="lb"></i>
          <div class="left">
            <img src="@/assets/img/home/total.png" alt="">
            <span>{{$t("home.a")}}</span>
          </div>
          <div class="right">{{Assets.walletamt}}{{$t("home.c")}}</div>
        </div>
        <div class="reward lt  rb ">
          <i class="rt"></i>
          <i class="lb"></i>
          <div class="left">
            <img src="@/assets/img/home/reward.png" alt="">
            <span>{{$t("home.b")}}</span>
          </div>
          <div class="right">{{Assets.jtsytotle}}{{$t("home.c")}}</div>
        </div>
        <div class="node lt  rb">
          <div class="title">{{$t("home.d")}}</div>
          <div class="content">
            <div class="left">
              <div class="sub">
                <p>{{$t("home.e")}}</p>
                <p class="scale">{{Assets.usertype}}</p>
              </div>
              <div class="newnum">
                <p>{{$t("home.f")}}</p>
                <p class="newadd">{{Assets.usercount}}</p>
              </div>
            </div>
            <div class="right">
              <div class="sub">
                <p>{{$t("home.g")}}</p>
                <p class="net">{{Assets.todaynumber}}</p>
              </div>
              <div class="newnode">
                <p>{{$t("home.h")}}</p>
                <p class="addnum">{{Assets.todayachievement}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="count lt  rb">
          <div class="title">{{$t("home.i")}}</div>
          <div class="content">
            <div class="left">
              <div class="sub">
                <p>{{$t("home.j")}}</p>
                <p class="countnet">{{Assets.zongyeji}}</p>
              </div>
              <div class="newnum">
                <p>{{$t("home.k")}}</p>
                <p class="midsize">{{Assets.node10000}}</p>
              </div>
            </div>
            <div class="right">
              <div class="sub">
                <p>{{$t("home.l")}}</p>
                <p class="small">{{Assets.node1000}}</p>
              </div>
              <div class="newnode">
                <p>{{$t("home.m")}}</p>
                <p class="super">{{Assets.node30000}}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="issubject" class="subject">
          <div class="subjectbox">
              <ul>
                  <li class="title">{{List.subject}}</li>
                  <li class="a" type="A"  @click="opct('A')">{{List.a}}</li>
                  <li class="b" type="B"  @click="opct('B')">{{List.b}}</li>
                  <li class="c" type="C"  @click="opct('C')">{{List.c}}</li>
                  <li class="d" type="D"  @click="opct('D')">{{List.d}}</li>
              </ul>
            <div v-show="isError" class="btn-purple-img purple error"><span>{{$t("home.n")}}</span> <span>{{$t("home.p")}}</span></div>
            <div v-show="isCorrect" class="btn-purple-img purple correct"><span>{{$t("home.o")}}</span> <span>{{$t("home.p")}}</span></div>
            <div class="bottom">
              <div class="Handover"><img src="@/assets/img/home/Handover.png" alt=""><span class="Submission" @click="Submission">{{$t("home.q")}}</span></div>
              <div>
                <div  class="Correct"><img src="@/assets/img/home/Correct.png" alt=""><span>{{Correct}}</span></div>
                <div  class="Error"><img src="@/assets/img/home/error.png" alt=""><span class="blue">{{error}}</span></div>
              </div>
              <div class="divnum"><span>10</span>/<span class="blue Remaining">{{Surplus}}</span></div>
            </div>
          </div>
        </div>

        <div v-if="Answer" class="Answer" >
          <div class="scorebox">
            <p class="title"><span id="fraction">{{AnswerList.fraction}}</span>分</p>
          </div>
          <ul>
            <li>您还剩<span id="notdo">{{AnswerList.notdo}}</span>题未做</li>
            <li>答对<span id="correct">{{AnswerList.correct}}</span>题</li>
            <li>答错<span id="error">{{AnswerList.error}}</span>题</li>
          </ul>
        </div>
        
        <div v-if="isbg" class="bg" @click="bg"></div>
		</main>
		<footersub nav="home"></footersub>
    <!-- <loading></loading> -->
  </div>
</template>

<script>
import footersub from "@/components/subcomponents/footer";
export default {
  data() {
    return {
      Assets: [],
      Lists: null,
      List: [],
      i: 0,
      id: 0,
      Correct: 0,
      error: 0,
      Surplus: "10",
      subjectid: null,
      volume: [],
      arrayobj: null,
      isbg: false,
      issubject: false,
      Answer: false,
      AnswerList: null,
      isCorrect: false,
      isError: false,
      isaa: true
    };
  },
  components: {
    footersub: footersub,
  },
  created() {
    this.getdata();
    
  },
  methods: {
    bg() {
      if (this.i == "0") {
        this.isbg = false;
        this.issubject = false;
      }
    },
    Submission() {
      this.isbg = true;
      this.volume;
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10022");
      params.append("content", JSON.stringify(this.volume));
      this.$axios({ data: params }).then(ret => {
         this.$Loading("false");;
     
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
          this.$router.push("/");
        } else if (ret.data.respCode == "00000") {
          this.AnswerList = ret.data;
          this.issubject = false;
          this.Answer = true;
          setTimeout(() => {
            this.Answer = false;
          }, 3000);
        } else {
        }
      });
    },
    opct(e) {
      if (this.isaa) {
        if (this.Surplus > 0) {
          if (this.i == "0") {
            this.i = 1;
          } else {
            ++this.i;
          }
          this.arrayobj = { sid: this.subjectid, answer: e };
          this.volume.push(this.arrayobj);
          this.volume.shift();
          this.$Loading();
          var params = new URLSearchParams();
          params.append("transCode", "akb10021");
          params.append("id", this.subjectid);
          params.append("answer", e);
          this.$axios({ data: params }).then(ret => {
             this.$Loading("false");;
            if (
              ret.data.respCode == "99999" ||
              ret.data.respCode == "99990" ||
              ret.data.respCode == "1"
            ) {
              this.$router.push("/");
            } else if (ret.data.respCode == "00000") {
              if (ret.data.state == "1") {
                this.error++;
                this.isError = true;
                this.isaa = false;
                setTimeout(() => {
                  if (this.i == "1") {
                    this.List = this.Lists[this.i];
                  } else {
                    this.List = this.Lists[this.i];
                  }
                  this.isError = false;
                  this.isaa = true;
                }, 3000);
              } else {
                this.Correct++;
                this.isCorrect = true;

                this.isaa = false;
                setTimeout(() => {
                  if (this.i == "1") {
                    this.List = this.Lists[this.i];
                  } else {
                    this.List = this.Lists[this.i];
                  }
                  this.isCorrect = false;
                  this.isaa = true;
                }, 3000);
              }
              this.Surplus--;
              this.subjectid = this.Lists[this.id++].id;
            }
          });
        }else if(this.Surplus=="0"){
          this.Submission();
        }
      }
    },
    getdata() {
        this.$Loading()
      var params = new URLSearchParams();
      params.append("transCode", "akb10005");
      this.$axios({
        data: params
      }).then(ret => {
          this.$Loading("false") 
        if (
          ret.data.respCode == "99999" ||
          ret.data.respCode == "99990" ||
          ret.data.respCode == "1"
        ) {
          this.$router.push("/");
        } else if (ret.data.respCode == "00000") {
          console.log(ret);
          this.Assets = ret.data;
          if(ret.examination=="0"){

          }else if(ret.examination=="1"){
          this.Lists = ret.data.subjectList;
          this.List = ret.data.subjectList[this.i];
          this.subjectid = ret.data.subjectList[0].id;
          ret.data.subjectList.forEach(element => {
            this.arrayobj = { sid: element.id, answer: "" };
            this.volume.push(this.arrayobj);
          });
          this.isbg = true;
          this.issubject= true
          }
        } else {
        }
      });
    }
  }
};
</script>


<style scoped>
.main {
  height: 100%;
  padding-left: 0.34rem;
  padding-right: 0.34rem;
  box-sizing: border-box;
}
.main .total {
  margin-top: 0.53rem;
}
p {
  font-size: 0.3rem;
}
.main .total,
.main .reward {
  position: relative;
  width: 6.9rem;
  height: 1.26rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem;
  box-sizing: border-box;
  background-color: rgba(4, 12, 20, 0.8);
}
.main .total .left,
.main .total .right,
.main .reward .left,
.main .reward .right {
  display: flex;
  font-size: 0.3rem;
  color: #f75953;
}
.main .total .left img,
.main .total .right img,
.main .reward .left img,
.main .reward .right img {
  width: 0.42rem;
  height: 0.38rem;
  margin-right: 0.17rem;
}
.main .reward {
  margin: 0.3rem 0 0.62rem;
}
.main .reward .left,
.main .reward .right {
  color: #f7de53;
}
.main .node,
.main .count {
  height: 3.05rem;
  width: 6.87rem;
  position: relative;
  color: #fff;
  padding: 0.33rem 0 0.35rem;
  box-sizing: border-box;
  background-color: rgba(4, 12, 20, 0.8);
}
.main .node .title,
.main .count .title {
  text-align: center;
  font-size: 0.36rem;
}
.main .node .content,
.main .count .content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.main .node .content .sub,
.main .count .content .sub {
  margin-bottom: 0.38rem;
}
.main .node .content .sub p,
.main .node .content .newnum p,
.main .node .content .newnode p,
.main .count .content .sub p,
.main .count .content .newnum p,
.main .count .content .newnode p {
  color: #00ffff;
}
.main .node .content .sub p:nth-child(2),
.main .node .content .newnum p:nth-child(2),
.main .node .content .newnode p:nth-child(2),
.main .count .content .sub p:nth-child(2),
.main .count .content .newnum p:nth-child(2),
.main .count .content .newnode p:nth-child(2) {
  color: #1072bd;
  font-size: 0.24rem;
  opacity: 0.9;
}
.main .count {
  margin-top: 0.3rem;
}
.main .count .content .sub {
  margin-bottom: 0.4rem;
}
.main .count .content .sub p:nth-child(2),
.main .count .content .newnum p:nth-child(2),
.main .count .content .newnode p:nth-child(2) {
  color: #f75953;
  opacity: 0.9;
}
.subject {
  width: 5.12rem;
  height: 6.01rem;
  background-color: #111114;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #00ffff;
  padding: 0.2rem 0.3rem 0.3rem 0.27rem;
  box-sizing: border-box;
  z-index: 4;
}
.subject {
  width: 5.12rem;
  height: 6.01rem;
  background-color: #111114;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #00ffff;
  padding: 0.2rem 0.3rem 0.3rem 0.27rem;
  box-sizing: border-box;
  z-index: 4;
}
.subjectbox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.subjectbox ul {
  width: 100%;
}
.subjectbox ul li {
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
}
.subjectbox ul li:first-child {
  margin-bottom: 0.24rem;
}
.subjectbox ul li:last-child {
  margin-bottom: 0.36rem;
}
.subjectbox .btn-purple-img {
  height: 0.66rem;
  line-height: 0.66rem;
  font-size: 0.24rem;
  margin-bottom: 0.4rem;
}
.subjectbox .error {
  background-color: #d31829;
}
.subjectbox .bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.subjectbox .bottom div {
  display: flex;
  align-items: center;
}
.Handover img {
  width: 0.24rem;
  height: 0.28rem;
  margin-right: 0.1rem;
}
.Error {
  margin-left: 0.2rem;
}
.Error img,
.Correct img {
  width: 0.2rem;
  height: 0.2rem;
  margin-right: 0.1rem;
}
.blue {
  color: #1b73bd;
}
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(000, 000, 000, 0.2);
  z-index: 3;
}
.subjectbox span,.divnum{
  font-size: .2rem;
}
.main .Answer {
  width: 5.12rem;
  height: 6.01rem;
  background-color: #111114;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.63rem 0 0.72rem;
  box-sizing: border-box;
  z-index: 4;
}
.main .Answer .scorebox {
  width: 1.94rem;
  height: 1.94rem;
  border-radius: 50%;
  border: 1px solid #00ffff;
  margin: 0 auto 0.4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main .Answer .scorebox .title {
  font-size: 0.4rem;
  color: #00ffff;
}
.main .Answer .scorebox .subtitle {
  font-size: 0.36em;
  color: #00ffff;
}
.main .Answer ul {
  padding-left: 1.36rem;
  box-sizing: border-box;
}
.main .Answer ul li {
  margin-bottom: 0.2rem;
  color: #00ffff;
  font-size: 0.35rem;
}
.main .Answer li span {
  color: #1b73bd;
  font-size: 0.35rem;
}
</style>
