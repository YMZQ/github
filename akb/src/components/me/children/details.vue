<template>
<div class="details">
   <header>
     <a href="javascript:void(0)" onclick="history.go(-1)"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{title}}</div>
    </header>
   <main>
        <div class="content">
            <div class="title">
                <p class="subtitle">{{text}}</p>
                <p class="date">{{datetime}}</p>
            </div>
            <div class="article" v-html="content">{{content}}</div>
        </div>
    </main>
</div>
</template>

<script>
export default {
  data() {
    return {
      title:null,
      text:null,
      datetime:null,
      content:null
    };
  },
  created() {
    this.getdata();
    console.log(this.$route.params.id);
  },
  methods: {
    getdata() {
      var params = new URLSearchParams();
      params.append("transCode", "akb10015");
      params.append("id", this.$route.params.id);
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
          this.title = ret.data.page.pageItems[0].title;
          this.text = ret.data.page.pageItems[0].text;
          this.datetime = ret.data.page.pageItems[0].datetime;
          this.content=ret.data.page.pageItems[0].content;
        } else {
        }
      });
    }
  }
};
</script>


<style scoped>
.details {
  height: 100%;
  width: 100%;
}
main .content {
  margin-top: 0.5rem;
  padding: 0 0.45rem 0.7rem;
  background-color: rgba(4, 12, 20, 0.8);
}
main .content .title {
  font-size: 0.3rem;
}
main .content .title .subtitle {
  color: #00ffff;
}
main .content .title .date {
  color: #999999;
  font-size: 0.24rem;
  margin-top: 0.1rem;
}
main .content .article {
  margin-top: 0.45rem;
}
main .content >>> p {
  color: #00ffff;
  line-height: 0.47rem;
  font-size: 0.24rem;
}
</style>
