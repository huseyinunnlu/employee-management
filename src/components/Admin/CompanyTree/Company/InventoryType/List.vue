<script setup>
import Item from "./Item.vue";
import Edit from "./Edit.vue";

import { useCompanyApi } from "@/store/ApiServices/CompanyApi";

import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/store/Admin/Company/Company";

const route = useRoute();
const companyStore = useCompanyStore();
const companyApi = useCompanyApi();
const showModal = ref(false);
onBeforeMount(() => {
  companyApi.getInventoryTypes(route.params.id);
});

const selectedId = ref(null);
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
          <th>{{ $t("inventoryType") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in companyStore.inventoryTypes"
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
