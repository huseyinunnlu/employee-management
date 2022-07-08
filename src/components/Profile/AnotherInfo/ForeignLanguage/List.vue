<script setup>
import Item from "./Item.vue";
import Edit from "./Edit.vue";

import { useProfileStore } from "@/store/Profile";
import { ref } from "vue";

const profileStore = useProfileStore();
const selectedData = ref(null);
const showModal = ref(false);
const goDetails = (data) => {
  selectedData.value = data;
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr class="fw-bolder fs-5 text-gray-800">
          <th>{{ $t("language") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.profile.foreign_language"
          :key="item.id"
          :item="item"
          :userId="profileStore.profile.id"
          @show="goDetails(item)"
        />
      </tbody>
    </table>
  </div>
  <Edit
    v-if="selectedData"
    :selectedData="selectedData"
    :showModal="showModal"
    @closeModal="showModal = false"
  />
</template>
