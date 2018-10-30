<template>

 <!-- 全局提示框 -->
  <div class="bg" v-show="visible" >
   <div class="dialog-tips dialog-center">
          <div>{{message}}</div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: ""
    };
  }
};
</script>
<style >
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
}
.dialog-tips {
  width: 5.4rem;
  height: 1rem;
  font-size: 0.26rem;
  color: #fff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -2.6rem;
  margin-top: -0.75rem;
  border-radius: 0.2rem;
}
.dialog-tips div {
  line-height: 0.3rem;
  color: #fff;
  padding: 0.3rem;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.2rem;
}
</style>