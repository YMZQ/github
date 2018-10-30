<template>
<div class="relevant">
   <header>
        <router-link to="/me"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </router-link>
        <div class="title">{{$t('relevant.a')}}</div>
    </header>
    <main>
        <ul>
             <li v-for="item in idList" :key="item.id">
                <div class="a" @click="login(item.id)">
                <img :src="item.useravatar" alt="" >
                <div class="title"><p>ID:<span>{{item.username}}</span></p></div>
                <div class="sub">
                    <p>{{$t('relevant.b')}}: 
                        <span v-if="item.akbid=='30000'">{{$t('message.d')}}</span>
                        <span v-else-if="item.akbid=='3000'">{{$t('message.e')}}</span>
                        <span v-else-if="item.akbid=='1000'">{{$t('message.f')}}</span>
                    </p>
                    <p>{{$t('relevant.c')}}: <span>{{item.usertype}}</span></p>
                </div>
                </div>
                <router-link :to="'/modify/'+item.id" class="modify">{{$t('relevant.e')}}</router-link>
	          </li>
        </ul>
        <div class="btn-purple-img purple" @click="$router.push('/addnode')">{{$t('relevant.d')}}</div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idList: null,
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    login(e) {
      console.log(e);
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10018");
      params.append("id", e);
      params.append("mobile", localStorage.getItem("mobile"));
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
          localStorage.setItem("mobile", ret.data.mobile);
          this.$router.push("/home")
        } else {
        }
      });
    },
    getdata() {
      this.$Loading();
      var params = new URLSearchParams();
      params.append("transCode", "akb10011");
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
          this.idList = ret.data.list;
          console.log(this.idList);
          console.log(ret);
        } else {
        }
      });
    }
  }
};
</script>


<style scoped>
.relevant {
  width: 100%;
  height: 100%;
}
main ul {
  padding-top: 0.55rem;
  box-sizing: border-box;
}
main ul li {
  height: 2rem;
  width: 6.9rem;
  background-color: rgba(4, 12, 20, 0.8);
  position: relative;
  margin-bottom: 0.45rem;
}
main ul li .a {
  height: 100%;
  width: 100%;
  display: block;
  padding: 0 0.5rem;
  box-sizing: border-box;
}
main ul li .modify {
  color: #ffffff;
  position: absolute;
  right: 0.5rem;
  top: 0.4rem;
  text-align: right;
  font-size: 0.3rem;
}
main ul li .a img {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.8rem;
  height: 0.8rem;
}
main ul li .a .title {
  padding-top: 0.4rem;
  height: 1rem;
  color: #00ffff;
  border-bottom: 1px solid #0c333a;
}
main ul li .a .title p {
  text-align: center;
  font-size: 0.3rem;
  opacity: 0.8;
}
main ul li .a .sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #00ffff;
  font-size: 0.3rem;
  opacity: 0.8;
}
main .btn-purple-img {
  margin-top: 0.5rem;
  width: 5.9rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
</style>
