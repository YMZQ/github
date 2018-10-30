<template>
<div class="Certified">
   <header>
        <a href="javascript:void(0)" onclick="history.go(-1)"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t('Certified.a')}}</div>
    </header>
    <main>
        <div class="user">
            <div class="name">
                <p>{{$t('Certified.b')}}:<span class="uname">{{cretified[3]}}</span></p>
            </div>
            <div class="subtitle">
                <p>{{$t('Certified.c')}}:<span class="idno"></span>{{cretified[2]}}</p>
            </div>
            <div class="start">
                <p v-if="cretified[4]==1">{{$t('Certified.d')}}:<span class="shiming" >{{$t('Certified.f')}}</span></p>
                <p v-if="cretified[4]!=1">{{$t('Certified.d')}}:<span class="shiming" >{{$t('Certified.g')}}</span></p>
            </div>
        </div>
        <div class="title">
            {{$t('Certified.e')}}
        </div>
        <div class="front">
                <img class="img1" :src="cretified[0]" alt="">
        </div>
        <div class="below">
                <img class="img2" :src="cretified[1]" alt="">
        </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cretified:null,
    };
  },
  created(){
    this.cretified=JSON.parse(localStorage.getItem("cretified"))
  }
};
</script>


<style scoped>
main .user {
  height: 3.2rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding: 0 0.3rem;
  margin-top: 0.5rem;
}
main .user .name,
main .user .subtitle,
main .user .start {
  height: 0.9rem;
  border-bottom: 1px solid #0c333a;
  color: #00ffff;
  font-size: .3rem;
}
main .user .name p,
main .user .subtitle p,
main .user .start p {
  height: 100%;
  width: 100%;
  line-height: .9rem;
  opacity: .8;
}
main .user .name p span,
main .user .subtitle p span,
main .user .start p span {
  display: inline-block;
  margin-left: .1rem;
}
main .title {
  font-size: 0.3rem;
  color: #00ffff;
  margin: 0.2rem 0 0.1rem;
}
main .front, main .below {
  width: 6.9rem;
  height: 3rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding: .25rem  .6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: .2rem;
}
main .front img, main .below img {
  height: 2.38rem;
  width: 3.64rem;
  margin: 0 auto;
}
</style>
