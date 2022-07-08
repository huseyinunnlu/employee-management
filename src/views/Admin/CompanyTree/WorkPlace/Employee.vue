<script setup>
import List from "@/components/Admin/CompanyTree/Employee/List.vue";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const workPlaceStore = useWorkPlaceStore();
const treeApi = useTreeApi();
onBeforeMount(() => {
  treeApi.getEmployees(route.params.id, "work_place_id");
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
          musteri_id: workPlaceStore.workPlace.musteri_id,
          company_id: workPlaceStore.workPlace.company_id,
          department_id: workPlaceStore.workPlace.department.id,
          work_place_id: workPlaceStore.workPlace.id,
        },
      }"
    >
      <i class="fas fa-plus"></i> {{ $t("add") }}
    </router-link>
  </div>
  <List />
</template>
