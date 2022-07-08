<script setup>
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";

const workPlace = useWorkPlaceStore().workPlace;
</script>
<template>
  <div class="row">
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("workPlace") }}: </label>
      <div class="col-lg-8">{{ workPlace.title }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("email") }}: </label>
      <div class="col-lg-8">{{ workPlace.email }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("city") }}: </label>
      <div class="col-lg-8">
        {{ workPlace.city.title }}
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("department") }}:
      </label>
      <div class="col-lg-8">{{ workPlace.department.title }}</div>
    </div>
  </div>
</template>
