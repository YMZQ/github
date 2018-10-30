<template>
<div class="notice">
   <header>
     <a href="#" @click="go"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t("home.r")}}</div>
    </header>
    <main id="baseContent">
          <myscroll  @scrollToEnd="scrollToEnd" >
                <ul>
                    <li v-for="item in pageItems">
                      <router-link :to="'/details/'+item.id">
                        <span>{{item.title}}</span><span class="push-right">{{item.datetime}}</span>
                      </router-link>
                    </li>
                </ul>
          </myscroll>
	  </main>
</div>
</template>

<script>
import betterscroll from "../../../common/betterscroll";

export default {
  components: {
    myscroll: betterscroll
  },
  data() {
    return {
      pageItems: [],
      pageNum: 1,
      page: 1,
      pagesAvailable: 1
    };
  },
  created() {
    if (localStorage.getItem("pagenum") == 1) {      
      this.pageItems = JSON.parse(localStorage.getItem("newsList"))

      
    } else {
      this.getdata();
    }
  },
  methods: {
    go(){
     if(localStorage.getItem("pagenum") == 1){
       this.$router.push("/home")
       localStorage.setItem("pagenum","0")
     }else{
       this.$router.go(-1)
     }
    },
    scrollToEnd() {
      if (this.page > this.pagesAvailable) {
        this.pageNum++;
        this.pagesAvailable++;
        this.getdata();
      }
    },
    getdata() {
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10015");
      params.append("pageNo", this.pageNum);
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
          ret.data.page.pageItems.forEach(element => {
            this.pageItems.push(element);
          });
          this.page = ret.data.page.pagesAvailable;
        } else {
          this.$toast(ret.data.respMsg)
        }
      });
    }
  }
};
</script>


<style scoped>
.notice {
  height: 100%;
  width: 100%;
}
main {
  padding-top: 1.5rem;
}
.my-scroll {
  height: 100%;
  overflow: hidden;
}

ul {
  background-color: rgba(4, 12, 20, 0.8);
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
}

ul li {
  width: 6.3rem;
  height: 1.1rem;
  border-bottom: 1px solid #0c333a;
}
ul li a {
  height: 100%;
  width: 100%;
  display: block;
  padding-top: 0.5rem;
  box-sizing: border-box;
  position: relative;
}
ul li a span {
  color: #00ffff;
  font-size: 0.24rem;
  position: absolute;
}
ul li a span:last-child {
  color: #d1d3d3;
  position: absolute;
  right: 0;
}
</style>
