<template>
<div class="inviting">
   <header>
         <a href="javascript:void(0)" onclick="history.go(-1)"> 
          <img src="@/assets/img/icon/leftf.png" alt="">
        </a>
        <div class="title">{{$t('inviting.a')}}</div>
    </header>
    <main>
      <div class="content">
        <div class="QR">
          <!-- <div class="imgdiv"></div> -->
          <img src="@/assets/img/me/qra.png" alt="" class="qr">
          <div><img src="@/assets/img/me/iphone.png" alt=""><p>{{$t('inviting.b')}}</p></div>
        </div>
        <div class="QR">
          <!-- <div class="imgdiv"></div> -->
          <img src="@/assets/img/me/qra.png" alt="" class="qr">
          <div><img src="@/assets/img/me/android.png" alt=""><p>{{$t('inviting.c')}}</p></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>


<style scoped>
.inviting{
  height: 100%;
  width: 100%;
}
p{
  font-size: .3rem;
}
.content {
  margin-top: .5rem;
}
.content .QR {
  width: 6.9rem;
  height: 3rem;
  background-color: rgba(4, 12, 20, 0.8);
  padding-top: .4rem;
  box-sizing: border-box;
}
.content .QR .qr {
  width: 1.83rem;
  height: 1.76rem;
  margin: 0 auto .2rem;
}
.content .QR div {
  height: .42rem;
  color: #00ffff;
  display: flex;
  align-items: center;
}
.content .QR div img {
  width: .36rem;
  height: .42rem;
  margin-left: 2rem;
  margin-right: .23rem;
}
</style>
