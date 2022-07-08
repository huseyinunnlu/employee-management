<script setup>
import Item from "./Item.vue";
import Edit from "./Edit.vue";

import { useDepartmentApi } from "@/store/ApiServices/DepartmentApi";
import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useDepartmentStore } from "@/store/Admin/Company/Department";

const route = useRoute();
const departmentStore = useDepartmentStore();
const departmentApi = useDepartmentApi();

onBeforeMount(() => {
  departmentApi.getPositions(route.params.id);
});

const selectedId = ref(null);
const showModal = ref(false);
const show = (id) => {
  selectedId.value = id;
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("position") }}</th>
          <th>{{ $t("positionTitles") }}</th>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in departmentStore.positions"
          :key="item.id"
          :item="item"
          @show="show"
        />
      </tbody>
    </table>
  </div>
  <Edit
    :selectedId="selectedId"
    :showModal="showModal"
    @closeModal="showModal = false"
  />
</template>
