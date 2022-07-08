<script setup>
import List from "@/components/Admin/CompanyTree/Department/Position/List.vue";
import Add from "@/components/Admin/CompanyTree/Department/Position/Add.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("positions") }}</h4>
    <Add />
  </div>
  <List />
</template>
