<script setup>
import Navbar from "@/components/Admin/CompanyTree/Department/Navbar.vue";

import { useDepartmentApi } from "@/store/ApiServices/DepartmentApi";
import { useDepartmentStore } from "@/store/Admin/Company/Department";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const departmentApi = useDepartmentApi();
const departmentStore = useDepartmentStore();
const isReady = ref(false);
const isLoading = ref(true);
onBeforeMount(async () => {
  const routeId = route.params.id;

  if (routeId != departmentStore.department.id) {
    await departmentApi.get(routeId).catch(() => {
      router.push({ name: "company-cards" });
    });
  }

  isReady.value = true;
});
</script>
<template>
  <div class="card-header d-flex justify-content-between align-items-center">
    <h4 class="card-title">
      {{ $t("detailsAttr", { attr: $t("department") }) }}
    </h4>
    <router-link class="btn btn-info text-light" :to="{ name: 'company-cards' }"
      ><i class="fas fa-arrow-left"></i> {{ $t("goBack") }}</router-link
    >
  </div>
  <div class="card-body">
    <Navbar />
    <router-view v-if="isReady"></router-view>
    <div class="text-center align-items-center py-5" v-else>
      <CSpinner color="success" />
    </div>
  </div>
</template>
