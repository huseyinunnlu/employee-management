<script setup>
import { useProfileStore } from "@/store/Profile";
const contact = useProfileStore().profile.emergency_contact;
import { mask } from "maska";
const formatPhone = (phone) => {
  if (phone) {
    return mask(phone, "+90(###) ### ## ##");
  }

  return null;
};
</script>
<template>
  <div class="col-md-6">
    <h4 class="card-title pb-3 border-bottom mb-2">
      {{ $t("emergencyInfo") }}
    </h4>
    <div class="row mb-6" v-for="item in contact" :key="item.id">
      <label class="col-md-6 fw-bold text-muted">{{ item.full_name }}</label>
      <div class="col-md-6 fv-row">
        <span class="fw-bold fs-6">{{ formatPhone(item.phone) }}</span>
      </div>
    </div>
  </div>

  <!--end::Input group-->
</template>
