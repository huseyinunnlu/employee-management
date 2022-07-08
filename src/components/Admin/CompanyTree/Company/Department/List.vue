<script setup>
import Item from "./Item.vue";

import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { onBeforeMount } from "vue";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { useRoute } from "vue-router";

const route = useRoute();
const companyStore = useCompanyStore();
const companyApi = useCompanyApi();

onBeforeMount(() => {
  companyApi.getDepartments(route.params.id);
});
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in companyStore.departments"
          :key="item.id"
          :item="item"
        />
      </tbody>
    </table>
  </div>
</template>
