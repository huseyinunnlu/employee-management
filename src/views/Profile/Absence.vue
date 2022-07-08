<script setup>
import List from "@/components/Profile/Absence/List.vue";
import Add from "@/components/Profile/Absence/Add.vue";
import { useProfileStore } from "@/store/Profile";
import { onBeforeMount } from "vue";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";

const profileStore = useProfileStore();
const profileApi = useProfileApi();

onBeforeMount(() => {
  profileApi.getAbsences(profileStore.profile.id);
});
</script>
<template>
  <div class="card col-md-12 mb-5">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="card-title">
        {{
          $t("absenceTitle", {
            deserved: profileStore.absenceStats.deserved || 0,
            used: profileStore.absenceStats.used || 0,
            remaining: profileStore.absenceStats.remaining || 0,
          })
        }}
      </h5>
      <Add />
    </div>
    <div class="card-body row p-9">
      <List v-if="profileStore.absences.length > 0" />
    </div>
  </div>
</template>
