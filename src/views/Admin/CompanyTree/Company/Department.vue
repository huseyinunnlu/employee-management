<script setup>
import List from "@/components/Admin/CompanyTree/Company/Department/List.vue";
import { useCompanyStore } from "@/store/Admin/Company/Company";
const companyStore = useCompanyStore();
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("departments") }}</h4>
    <router-link
      :to="{
        name: 'add-department',
        query: {
          musteri_id: companyStore.company.musteri_id,
          company_id: companyStore.company.id,
        },
      }"
      class="btn btn-success text-light"
    >
      <i class="fas fa-plus"></i>{{ $t("add") }}
    </router-link>
  </div>
  <List />
</template>
