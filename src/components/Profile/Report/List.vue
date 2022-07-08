<script setup>
import Show from "./Show.vue";
import Item from "./Item.vue";

import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const profileStore = useProfileStore();
const profileApi = useProfileApi();
const showModal = ref(false);
const selectedId = ref(null);
const route = useRoute();
const goDetails = (data) => {
  selectedId.value = data;
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};

onBeforeMount(() => {
  profileApi.getReports(profileStore.profile.id);
});

onMounted(() => {
  const query = route.query;

  selectedId.value = query.selected_id;

  if (selectedId.value && query.target_id == "kt_absence_show_modal")
    showModal.value = true;
});
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("file") }}</th>
          <th>{{ $t("date") }}</th>
          <th>{{ $t("issuer") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.reports"
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
