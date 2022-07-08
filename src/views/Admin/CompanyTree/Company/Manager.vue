<script setup>
import List from "@/components/Admin/CompanyTree/Manager/List.vue";
import Add from "@/components/Admin/CompanyTree/Manager/Add.vue";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const treeApi = useTreeApi();
onMounted(() => {
  treeApi.getManagers(route.params.id, "company_id");
});
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("companyManagers") }}</h4>
    <Add :title="'companyManager'" :column="'company_id'" />
  </div>
  <List />
</template>
