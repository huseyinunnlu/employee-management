<script setup>
import Item from "./Item.vue";
import Edit from "./Edit.vue";

import { useDocumentTypeApi } from "@/store/ApiServices/DocumentTypeApi";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/Admin/Settings/Settings";

const route = useRoute();
const settingsStore = useSettingsStore();
const documentTypeApi = useDocumentTypeApi();
const showModal = ref(false);
onBeforeMount(() => {
  documentTypeApi.getDocumentTypes(route.params.id);
});

const selectedId = ref(null);
const show = (id) => {
  selectedId.value = id;
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};

const toggleModal = (id) => {};
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("documentType") }}</th>
          <th>{{ $t("documentTypeTitles") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in settingsStore.documentTypes"
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
