<script setup>
import Show from "./Show.vue";
import Item from "./Item.vue";

import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useProfileStore } from "@/store/Profile";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const profileStore = useProfileStore();
const profileApi = useProfileApi();
const route = useRoute();

const selectedId = ref(null);
const showModal = ref(false);
const goDetails = (data) => {
  selectedId.value = data;
  setTimeout(() => {
    showModal.value = true;
  }, 300);
};

onMounted(() => {
  const query = route.query;
  profileApi.getDocuments(profileStore.profile.id).then(() => {
    if (query.item_id && query.target_id == "document_edit") {
      setTimeout(() => {
        goDetails(query.item_id);
      }, 100);
    }
  });
});
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("documentType") }}</th>
          <th>{{ $t("file") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.documents"
          :key="item.id"
          :item="item"
          :userId="profileStore.profile.id"
          @show="goDetails(item.id)"
        />
      </tbody>
    </table>
  </div>
  <Show
    :selectedId="selectedId"
    :show="showModal"
    @closeModal="showModal = false"
  />
</template>
