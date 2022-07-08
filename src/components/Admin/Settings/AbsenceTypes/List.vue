<script setup>
import Edit from "./Edit.vue";
import Item from "./Item.vue";
import { useAbsenceTypeApi } from "@/store/ApiServices/AbsenceTypeApi";

import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/Admin/Settings/Settings";

const route = useRoute();
const settingsStore = useSettingsStore();
const absenceTypeApi = useAbsenceTypeApi();

onBeforeMount(() => {
  absenceTypeApi.getAbsenceTypes(route.params.id);
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
          <th>{{ $t("absenceType") }}</th>
          <th>{{ $t("absenceTypeTitles") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in settingsStore.absenceTypes"
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
