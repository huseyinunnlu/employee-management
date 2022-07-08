<script setup>
import Item from "./Item.vue";
import Show from "./Show.vue";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const profileStore = useProfileStore();
const profileApi = useProfileApi();

const selectedId = ref(null);
const showModal = ref(false);

const route = useRoute();
const goDetails = (id) => {
  selectedId.value = id;
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};

onMounted(async () => {
  const query = route.query;

  selectedId.value = query.selected_id;

  if (selectedId.value && query.target_id == "absence_edit")
    showModal.value = true;
});
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("absenceType") }}</th>
          <th>{{ $t("date") }}</th>
          <th>{{ $t("dayCount") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("contactPhone") }}</th>
          <th>{{ $t("place") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.absences"
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
