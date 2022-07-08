<script setup>
import { useProfileStore } from "@/store/Profile";
const educationStatus = useProfileStore().profile.education_status;
</script>
<template>
  <div class="col-md-6">
    <h4 class="card-title pb-3 border-bottom mb-2">
      {{ $t("educationStatus") }}
    </h4>
    <!--begin::Row-->
    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("educationStatus")
      }}</label>
      <div class="col-md-8">
        <span class="fw-bolder fs-6 text-dark" v-if="educationStatus">{{
          $t(educationStatus.status)
        }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("graduatedSchool")
      }}</label>
      <div class="col-md-8 fv-row" v-if="educationStatus">
        <span class="fw-bold fs-6">{{ educationStatus.graduated_school }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{ $t("bölüm") }}</label>
      <div class="col-md-8 fv-row" v-if="educationStatus">
        <span class="fw-bold fs-6">{{ educationStatus.department }}</span>
      </div>
    </div>
  </div>

  <!--end::Input group-->
</template>
