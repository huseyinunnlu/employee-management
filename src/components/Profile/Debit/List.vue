<script setup>
import Item from "./Item.vue";
import Show from "./Show.vue";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const profileStore = useProfileStore();
const profileApi = useProfileApi();

const selectedId = ref(null);
const showModal = ref(false);

const goDetails = (id) => {
  selectedId.value = id;
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};

onBeforeMount(async () => {
  await profileApi.getDebits(profileStore.profile.id);
  if (route.query.target_id && route.query.selected_id) {
    if (route.query.target_id == "debit_edit" && route.query.selected_id) {
      goDetails(route.query.selected_id);
    } else {
      router.push({
        name: "debit-reports",
      });
    }
  }
});
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("inventoryType") }}</th>
          <th>{{ $t("inventory") }}</th>
          <th>{{ $t("serie") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("date") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in profileStore.debits"
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
