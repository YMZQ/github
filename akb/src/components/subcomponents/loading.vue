<template>
<div v-if="visible">
    <div class="contetn">
    </div>
        <div id="Loading">
            <div class="loader-inner ball-beat">
                <div>load</div>
                <div>ing.</div>
            </div>
        </div>
        <div  class="loadbg"></div>
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
<style scoped>
.contetn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -0.9rem;
  margin-top: -0.9rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  -webkit-animation: xixi 4s linear infinite;
  background: url("../../assets/img/loading/load.png") no-repeat 100%/100%;
  z-index: 7;
}

@-webkit-keyframes xixi {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }
  
  100% {
    -webkit-transform: rotate(360deg);
  }
}
#Loading {
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  z-index: 111111;
}
@-webkit-keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes ball-beat {
  50% {
    opacity: 0.4;
    -webkit-transform: scale(0.1);
    transform: scale(0.75);
    color: aqua;
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
    color: aqua;
  }
}
.ball-beat {
  width: 1.8rem;
  height: 1.8rem;
  line-height: 1.4rem;
  text-align: center;
}
.ball-beat > div {
  width: 15px;
  height: 15px;
  border-radius: 100% !important;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: ball-beat 2s 0s infinite linear;
  animation: ball-beat 2s 0s infinite linear;
  font-size: 0.28rem;
}
.ball-beat > div:nth-child(2n-1) {
  -webkit-animation-delay: 2s !important;
  animation-delay: 2s !important;
}
.loadbg {
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
  z-index: 6;
  position: fixed;
  top: 0;
  right: 0;
}
</style>
