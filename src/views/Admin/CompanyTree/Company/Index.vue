<script setup>
import { useCompanyStore } from "@/store/Admin/Company/Company";

const company = useCompanyStore().company;
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("logo") }}: </label>
    <div class="col-lg-8" v-if="company.logo">
      <div>
        <img
          style="width: 100px; height: 100px"
          :src="company.logo"
          alt="image"
        />
      </div>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("title") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ company.title }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("address") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ company.address }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("city") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ company.city }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("email") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ company.email }}</span>
    </div>
  </div>
</template>
