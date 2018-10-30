<template>
      <ul class="tab">  
          <li v-for="item in Tab" :key="item.id"  @click="tabs(item.id)" :class="{active:==isshow}">{{item.title}}</li>
      </ul>
</template>

<script>
export default {
  props: {
    Tab: Array,
    required: true
  },
  data() {
    return {
      isshow: "1"
    };
  },
  methods: {
    tabs(e) {
      this.isshow = e;
      this.$emit("childByValue",this.isshow);
    },
  }
};
</script>


<style scoped>
.center {
  height: 100%;
  width: 100%;
}
.main .content .detail ul li .right .gren {
  color: #16a71e;
}
.tab {
  width: 6.9rem;
  height: 0.97rem;
  background-color: rgba(4, 12, 20, 0.8);
  position: fixed;
  z-index: 1;
  background-color: #0c141b;
  display: flex;
}
.tab li {
  width: 100%;
  height: 100%;
  line-height: 0.97rem;
  text-align: center;
  color: #00ffff;
  font-size: 0.3rem;
  font-weight: 700;
  position: relative;
}
.tab .active {
  color: #ffffff;
}
.main .tab .active:before {
  content: "";
  position: absolute;
  width: 2.3rem;
  height: 0.04rem;
  background-color: #ffffff;
  right: 0;
  top: 0;
}
</style>
