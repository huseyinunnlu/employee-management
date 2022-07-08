<script setup>
import PersonalInfo from "@/components/Profile/PersonalInfo/PersonalInfo.vue";
import { onBeforeMount, onMounted, reactive } from "vue";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(() => {
  if (authStore.role !== 1 && authStore.user.perms.can_edit_profile) {
    router.push({ name: "dashboard" });
  }
});
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <h4 class="card-title">{{ $t("personalInfo") }}</h4>
    </div>
    <div class="card-body row p-4">
      <PersonalInfo />
    </div>
  </div>
</template>
