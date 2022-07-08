<script setup>
import { useProfileStore } from "@/store/Profile";
import { mask } from "maska";
import { computed } from "vue";

const profile = useProfileStore().profile.contact_info;

const formatPhone = (phone) => {
  if (phone) {
    return mask(phone, "+90(###) ### ## ##");
  }

  return null;
};
</script>
<template>
  <div class="col-md-6">
    <h4 class="card-title pb-3 border-bottom mb-2">{{ $t("contactInfo") }}</h4>
    <!--begin::Row-->
    <div class="row mb-1">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("email") }}</label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ profile.email }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-lg-4 fw-bold text-muted">{{
        $t("personalPhone")
      }}</label>
      <div class="col-lg-8 fv-row">
        <span class="fw-bold"> {{ formatPhone(profile.personal_phone) }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("homePhone") }}</label>
      <div class="col-lg-8 fv-row">
        <span class="fw-bold">{{ formatPhone(profile.home_phone) }}</span>
      </div>
    </div>

    <div class="row mb-1">
      <label class="col-lg-4 fw-bold text-muted">{{
        $t("whatsappPhone")
      }}</label>
      <div class="col-lg-8 fv-row">
        <span class="fw-bold">{{ formatPhone(profile.whatsapp_phone) }}</span>
      </div>
    </div>
    <div class="row mb-1">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("address") }}</label>
      <div class="col-lg-8 fv-row">
        <span class="fw-bold">{{ profile.address }}</span>
      </div>
    </div>
  </div>

  <!--end::Input group-->
</template>
