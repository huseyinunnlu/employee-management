<script setup>
import List from "@/components/Admin/CompanyTree/Manager/List.vue";
import Add from "@/components/Admin/CompanyTree/Manager/Add.vue";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const treeApi = useTreeApi();
onBeforeMount(() => {
  treeApi.getManagers(route.params.id, "department_id");
  treeApi.getUsersForManagerAdding(route.params.id, "department_id");
});
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("departmentManagers") }}</h4>
    <Add :title="'departmentManager'" :column="'department_id'" />
  </div>
  <List />
</template>
