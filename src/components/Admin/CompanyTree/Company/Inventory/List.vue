<script setup>
import Item from "./Item.vue";
import Edit from "./Edit.vue";

import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/store/Admin/Company/Company";

const route = useRoute();
const companyApi = useCompanyApi();
const companyStore = useCompanyStore();
const showModal = ref(false);
const selectedId = ref(null);
onBeforeMount(() => {
  companyApi.getInventories(route.params.id);
});

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
          <th>{{ $t("inventory") }}</th>
          <th>{{ $t("inventoryType") }}</th>
          <th>{{ $t("serieNumber") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in companyStore.inventories"
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
