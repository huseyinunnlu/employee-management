<script setup>
import List from "@/components/Admin/CompanyTree/Company/ExpenseType/List.vue";
import Add from "@/components/Admin/CompanyTree/Company/ExpenseType/Add.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("expenseTypes") }}</h4>
    <Add />
  </div>
  <List />
</template>
