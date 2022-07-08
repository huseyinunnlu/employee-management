<script setup>
import List from "@/components/Admin/CompanyTree/Musteri/EmployeerBranch/List.vue";
import Add from "@/components/Admin/CompanyTree/Musteri/EmployeerBranch/Add.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center">
    <h4 class="card-title">{{ $t("employeerBranch") }}</h4>
    <Add />
  </div>
  <List />
</template>
