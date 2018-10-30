<template>
<div class="manage">
   <header>
         <a href="javascript:void(0)" onclick="history.go(-1)"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t('manage.a')}}</div>
    </header>
    <main>
        <div class="content">
            <ul>
              <li v-for="item in minfoListA" >
                <router-link :to="'/recom/'+item.uid">
                    <img :src="item.useravatar" alt="">
                    <div class="user">
                        <div class="only">{{$t('manage.b')}}: <span>{{item.uid}}</span> </div>
                        <div class="mold"> {{$t('manage.c')}}: 
                            <span v-if="item.akbid==1000">{{$t('message.d')}}</span>
                            <span v-else-if="item.akbid==3000">{{$t('message.e')}}</span> 
                            <span v-else-if="item.akbid==30000">{{$t('message.f')}}</span> 
                        </div>
                    </div>
                    <p class="grade">{{$t('manage.d')}}: <span>{{item.usertype}}</span> </p>
                </router-link>
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
      minfoListA:null
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
          console.log(ret);
          this.minfoListA=ret.data.minfoListA
        } else {
        }
      });
    }
  }
};
</script>


<style scoped>
.manage {
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
