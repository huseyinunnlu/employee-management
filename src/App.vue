<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthApi } from "@/store/ApiServices/Auth";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useAuthStore } from "@/store/Auth";
import Loading from "@/components/UI/MainLoading.vue";
const apiData = useApiData();
const authApi = useAuthApi();
const authStore = useAuthStore();
const isReady = ref(false);

const router = useRouter();
const route = useRoute();

const checkRouteAuth = (authStatus) => {
  const status = authStatus;
  const userStatus = authStore.isAuth;
};

onMounted(async () => {
  await apiData.getLanguages();
  await authApi.getUser().finally(() => {
    isReady.value = true;
  });
});
</script>
<template>
  <notifications />
  <router-view v-if="isReady" :key="$route.fullPath"></router-view>
  <Loading v-else />
</template>

<style lang="scss">
@import "@/assets/styles/style.scss";
</style>
