<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const apiStore = useApiDataStore();
const changeLanguage = async (lang) => {
  await localStorage.setItem("lang", lang);
  await router.go();
};
</script>
<template>
  <div class="form-group py-2 border-top">
    <select
      v-model="$i18n.locale"
      @change="changeLanguage($i18n.locale)"
      class="form-select form-select-sm"
    >
      <option value="tr-TR">{{ $t("turkish") }}</option>
      <option value="en-US">{{ $t("english") }}</option>
    </select>
  </div>
</template>
