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
        <tr>
          <th>{{ $t("workplaceName") }}</th>
          <th>{{ $t("degree") }}</th>
          <th>{{ $t("startDate") }}</th>
          <th>{{ $t("leaveDate") }}</th>
          <th>{{ $t("leaveReason") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.profile.work_experience"
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
