<script setup>
import Navbar from "@/components/Admin/CompanyTree/Company/Navbar.vue";

import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const companyApi = useCompanyApi();
const companyStore = useCompanyStore().company;
const isReady = ref(false);
onBeforeMount(async () => {
  const routeId = route.params.id;
  if (routeId != companyStore.id) {
    await companyApi.get(routeId).catch(() => {
      router.push({ name: "company-cards" });
    });
  }
  isReady.value = true;
});
</script>
<template>
  <div class="card-header d-flex justify-content-between align-items-center">
    <h4 class="card-title">
      {{ $t("detailsAttr", { attr: $t("company") }) }}
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
