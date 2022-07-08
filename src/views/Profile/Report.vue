<script setup>
import List from "@/components/Profile/Report/List.vue";
import Add from "@/components/Profile/Report/Add.vue";
</script>
<template>
  <div class="card col-md-12 mb-5">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("reports") }}</h4>
      <Add />
    </div>
    <div class="card-body row py-4">
      <List />
    </div>
  </div>
</template>
