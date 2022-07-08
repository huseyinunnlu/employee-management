<script setup>
import List from "@/components/Admin/Settings/AbsenceTypes/List.vue";
import Add from "@/components/Admin/Settings/AbsenceTypes/Add.vue";
</script>
<template>
  <div class="card col-md-12 mb-5">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("absenceTypes") }}</h4>
      <Add />
    </div>
    <div class="card-body row">
      <List />
    </div>
  </div>
</template>
