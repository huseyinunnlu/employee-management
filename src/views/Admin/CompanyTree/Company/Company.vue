<script setup>
import List from "@/components/Admin/CompanyTree/Musteri/Company/List.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center">
    <h3 class="card-title text-primary">{{ $t("companies") }}</h3>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#kt_employeer_branch_add_modal"
    >
      {{ $t("add") }}
    </button>
  </div>
  <List />
</template>
