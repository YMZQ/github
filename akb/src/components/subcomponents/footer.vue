<template>
    <footer>
      <div class="a" @click="go('home')" >
        <img v-show="ishome"  src="@/assets/img/icon/home.png" alt="">
        <img v-show="!ishome"  src="@/assets/img/icon/homemy.png" alt="">
      </div>
      <div class="a" @click="go('add')">
        <img v-show="isadd"  src="@/assets/img/icon/asset.png" alt="">
        <img v-show="!isadd"  src="@/assets/img/icon/assetmy.png" alt="">
      </div>
      <div class="a" @click="go('center')">
        <img  v-show="iscenter"  src="@/assets/img/icon/count.png" alt="">
        <img  v-show="!iscenter"  src="@/assets/img/icon/countmy.png" alt="">
      </div> 
      <div class="a" @click="go('me')">
        <img  v-show="isme" src="@/assets/img/icon/me.png" alt="">
        <img  v-show="!isme" src="@/assets/img/icon/my.png" alt="">
      </div> 
    </footer>
</template>

<script>
export default {
  props: {
    nav: String,
    required: true
  },
  data() {
    return {
      ishome: true,
      isadd: true,
      iscenter: true,
      isme: true
    };
  },
  created() {
    this.gonav(this.nav);
  },
  methods: {
    go(e) {
      this.gonav(e);
    },
    gonav(key) {
      switch (key) {
        case "home":
          this.$router.push("/home");
          this.ishome = false;
          this.isadd = true;
          this.iscenter = true;
          this.isme = true;
          break;
        case "add":
          this.$router.push("/add");
          this.ishome = true;
          this.isadd = false;
          this.iscenter = true;
          this.isme = true;
          break;
        case "center":
          this.$router.push("/center");
          this.ishome = true;
          this.isadd = true;
          this.iscenter = false;
          this.isme = true;
          break;
        case "me":
          this.$router.push("/me");
          this.ishome = true;
          this.isadd = true;
          this.iscenter = true;
          this.isme = false;
          break;
      }
    }
  }
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 0.97rem;
  background-color: #09090c;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
}
footer .a {
  flex: 1;
  height: 100%;
  position: relative;
}
footer .a img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
footer .a:nth-child(1) img {
  width: 0.55rem;
  height: 0.44rem;
}
footer .a:nth-child(2) img {
  width: 0.43rem;
  height: 0.43rem;
}
footer .a:nth-child(3) img {
  width: 0.45rem;
  height: 0.45rem;
}
footer .a:nth-child(4) img {
  width: 0.42rem;
  height: 0.42rem;
}

</style>
