<script setup>
import { useProfileStore } from "@/store/Profile";
const profile = useProfileStore().profile.personal_information;
</script>
<template>
  <div class="col-md-6">
    <h4 class="card-title pb-3 border-bottom mb-2">{{ $t("personalData") }}</h4>
    <!--begin::Row-->
    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{ $t("idNumber") }}</label>
      <div class="col-md-8">
        <span class="fw-bolder text-dark">{{ profile.id_number }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{ $t("idSerieNo") }}</label>
      <div class="col-md-8">
        <span class="fw-bolder text-dark">{{ profile.id_serie_number }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("registrationNo")
      }}</label>
      <div class="col-md-8 fv-row">
        <span class="fw-bold">{{ profile.registration_number }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("sgkInsurance")
      }}</label>
      <div class="col-md-8 fv-row">
        <span class="fw-bold">{{ profile.insurance_no }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{ $t("bornPlace") }}</label>
      <div class="col-md-8 fv-row">
        <span class="fw-bold">{{ profile.born_place }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{ $t("birthday") }}</label>
      <div class="col-md-8 fv-row">
        <span class="fw-bold">{{ profile.birthday }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("marialStatus")
      }}</label>
      <div class="col-md-8 fv-row">
        <span class="fw-bold">{{ profile.mariance_status }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("driverLisence")
      }}</label>
      <div class="col-md-8 fv-row d-flex flex-wrap">
        <span
          class="fw-bold"
          v-for="(licence, index) in profile.licences"
          :key="index"
          >{{ licence.toUpperCase() }}
          {{ profile.licences.length - 1 != index ? " , " : "" }}</span
        >
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-md-4 fw-bold text-muted">{{
        $t("militaryStatus")
      }}</label>
      <div class="col-md-8 fv-row" v-if="profile.military_status">
        <span class="fw-bold">{{ $t(profile.military_status) }}</span>
      </div>
    </div>
  </div>

  <!--end::Input group-->
</template>
