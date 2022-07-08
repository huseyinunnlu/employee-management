import { defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
// import store from "@/store/index.js";
import { setLocale, localize } from "@vee-validate/i18n";
import tr from "@vee-validate/i18n/dist/locale/tr.json";
import en from "@vee-validate/i18n/dist/locale/en.json";
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
const lang = window.localStorage.getItem("lang") || "tr-TR";
configure({
  generateMessage: localize({
    "tr-TR": tr,
    "en-US": en,
  }),
});
setLocale(lang);
