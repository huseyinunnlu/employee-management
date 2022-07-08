import { createI18n } from "vue-i18n";
import tr from "./langs/tr-TR.json";
import en from "./langs/en-US.json";

const currentLoacale = localStorage.getItem("lang");

const messages = {
  "tr-TR": tr,
  "en-US": en,
};

const i18n = createI18n({
  locale: currentLoacale,
  fallbackLocale: "tr-TR",
  messages,
});

export default i18n;
