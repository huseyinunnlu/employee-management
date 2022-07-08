<script setup>
import List from "@/components/Admin/CompanyTree/Company/Inventory/List.vue";
import Add from "@/components/Admin/CompanyTree/Company/Inventory/Add.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("inventories") }}</h4>
    <Add />
  </div>
  <List />
</template>
