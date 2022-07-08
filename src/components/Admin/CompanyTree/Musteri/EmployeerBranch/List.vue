<script setup>
import Item from "./Item.vue";
import Edit from "./Edit.vue";

import { useMusteriApi } from "@/store/ApiServices/MusteriApi";

import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const musteriStore = useMusteriStore();
const musteriApi = useMusteriApi();
const showModal = ref(false);
onBeforeMount(() => {
  musteriApi.getEmployeerBraches(route.params.id);
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
          <th>{{ $t("employeerTitle") }}</th>
          <th>{{ $t("tax") }}</th>
          <th>{{ $t("taxNo") }}</th>
          <th>{{ $t("workplaceRegistrationRumber") }}</th>
          <th>{{ $t("registrationNo/mersisNo") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in musteriStore.employeerBranch"
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
