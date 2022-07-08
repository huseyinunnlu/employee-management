<script setup>
import List from "@/components/Admin/CompanyTree/Department/Position/List.vue";
import Add from "@/components/Admin/CompanyTree/Department/Position/Add.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center">
    <h3 class="card-title text-primary">{{ $t("positions") }}</h3>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#kt_position_add_modal"
    >
      {{ $t("add") }}
    </button>
  </div>
  <List />
  <Add />
</template>
