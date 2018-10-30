<template>
<div class="recom">
   <header>
         <a href="javascript:void(0)" onclick="history.go(-1)"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t('recom.a')}}</div>
    </header>
    <main>
        <div class="content">
            <div class="title">
                <p>{{$t('recom.b')}}: <span id="id">{{ this.$route.params.id}}</span></p>
                <p>{{$t('recom.c')}}: <span class="num">{{num}}</span></p>
            </div>
            <ul>
                <li v-for="item in recomList" :key="">
                    <a href="#">
                        <img :src="item.useravatar" alt="">
                        <div class="user">
                            <div class="only">{{$t('recom.d')}}: <span>{{item.username}}</span> </div>
                            <div class="mold">{{$t('recom.e')}}:
                               <span v-if="item.akbid==1000">{{$t('message.d')}}</span>
                               <span v-else-if="item.akbid==3000">{{$t('message.e')}}</span> 
                               <span v-else-if="item.akbid==30000">{{$t('message.f')}}</span>  
                            </div>
                        </div>
                        <p class="grade">{{$t('recom.f')}}: <span>{{item.usertype}}</span> </p>
                    </a>
                </li>
            </ul>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recomList: null,
      num:null
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10013");
      params.append("puid", this.$route.params.id);
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
          this.recomList = ret.data.minfoListB;
          this.num=this.recomList.length 
        } else {
        }
      });
    }
  }
};
</script>


<style scoped>
.recom {
  height: 100%;
  width: 100%;
}
main .content {
  padding-top: 0.4rem;
}
main .content .title {
  height: 1rem;
  width: 6.9rem;
  background-color: rgba(4, 12, 20, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
}
main .content .title p {
  color: #00ffff;
  font-size: 0.3rem;
  opacity: 0.8;
}
main .content ul li {
  width: 6.9rem;
  height: 1.4rem;
  background-color: rgba(4, 12, 20, 0.8);
  margin-bottom: 0.2rem;
}
main .content ul li a {
  width: 100%;
  height: 100%;
  display: block;
  display: flex;
  align-items: flex-end;
  font-size: 0.3rem;
  padding: 0.3rem 0.3rem 0.26rem 0.3rem;
  box-sizing: border-box;
}
main .content ul li a img {
  width: 0.81rem;
  height: 0.81rem;
  margin-right: 0.6rem;
}
main .content ul li a .user {
  flex: 1;
  color: #00ffff;
  opacity: 0.8;
}
main .content ul li a .grade {
  color: #00ffff;
  opacity: 0.8;
}
</style>
