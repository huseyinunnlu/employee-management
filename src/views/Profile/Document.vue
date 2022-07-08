<script setup>
import List from "@/components/Profile/Document/List.vue";
import Add from "@/components/Profile/Document/Add.vue";
import { useAuthStore } from "@/store/Auth";

const authStore = useAuthStore();
</script>
<template>
  <div class="card col-md-12 mb-5">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("documents") }}</h4>
      <Add />
    </div>
    <div class="card-body row p-9">
      <List />
    </div>
  </div>
</template>
