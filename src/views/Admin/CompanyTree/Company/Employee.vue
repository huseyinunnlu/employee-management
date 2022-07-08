<script setup>
import List from "@/components/Admin/CompanyTree/Employee/List.vue";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const companyStore = useCompanyStore();
const treeApi = useTreeApi();
onBeforeMount(async () => {
  treeApi.getEmployees(route.params.id, "company_id");
});
</script>
<template>
  <div class="d-flex justify-content-between align-items-center">
    <h4 class="card-title">{{ $t("employees") }}</h4>
    <router-link
      type="button"
      class="btn btn-success text-light"
      :to="{
        name: 'employees-add',
        query: {
          musteri_id: companyStore.company.musteri_id,
          company_id: companyStore.company.id,
        },
      }"
    >
      <i class="fas fa-plus"></i> {{ $t("add") }}
    </router-link>
  </div>
  <List />
</template>
