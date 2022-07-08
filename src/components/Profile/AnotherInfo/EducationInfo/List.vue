<script setup>
// import ProfileApiService from "@/core/services/ApiServices/ProfileApiService";
import Item from "./Item.vue";
import Show from "./Show.vue";
import { useProfileStore } from "@/store/Profile";
// import { showModal } from "@/core/helpers/dom";
import { ref } from "vue";

const profileStore = useProfileStore();
const selectedId = ref(null);
const showModal = ref(false);
const goDetails = (data) => {
  selectedId.value = data;
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
          <th>{{ $t("diploma") }}</th>
          <th>{{ $t("educationStatus") }}</th>
          <th>{{ $t("graduatedSchool") }}</th>
          <th>{{ $t("schoolDepartment") }}</th>
          <th>{{ $t("diplomaGrade") }}</th>
          <th>{{ $t("startYear") }}</th>
          <th>{{ $t("finishYear") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.profile.education_info"
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
