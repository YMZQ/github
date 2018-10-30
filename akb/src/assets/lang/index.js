import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

//引入语言包
import LangEn from "./en"
import LangZH from "./zh"
import LangFT from "./ft"
import LangRW from "./rw"
import LanghW from "./hw"

const i18n = new VueI18n({
    locale:  localStorage.getItem("lang") || "ZH" , // 语言标识
    messages: {
      EN: LangEn,
      ZH: LangZH,
      FT: LangFT,
      RW: LangRW,
      HW: LanghW,
    }
  });
export  {i18n}