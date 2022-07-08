<script setup>
import Navbar from "@/components/Admin/CompanyTree/WorkPlace/Navbar.vue";

import { useWorkPlaceApi } from "@/store/ApiServices/WorkPlaceApi";
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";
import { isReadonly, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const workPlaceApi = useWorkPlaceApi();
const workPlaceStore = useWorkPlaceStore();

const isReady = ref(false);
onBeforeMount(async () => {
  const routeId = route.params.id;
  if (routeId != workPlaceStore.workPlace.id) {
    await workPlaceApi.get(routeId).catch(() => {
      router.push({ name: "company-cards" });
    });
  }

  isReady.value = true;
});
</script>
<template>
  <div class="card-header d-flex justify-content-between align-items-center">
    <h4 class="card-title">
      {{ $t("detailsAttr", { attr: $t("workPlace") }) }}
    </h4>
    <router-link class="btn btn-info text-light" :to="{ name: 'company-cards' }"
      ><i class="fas fa-arrow-left"></i> {{ $t("goBack") }}</router-link
    >
  </div>
  <div class="card-body">
    <Navbar />
    <div class="my-4" v-if="isReady">
      <router-view></router-view>
    </div>
    <div class="text-center align-items-center py-5" v-else>
      <CSpinner color="success" />
    </div>
  </div>
</template>
