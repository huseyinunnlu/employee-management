<script setup>
import PersonalInformation from "@/components/Profile/Index/PersonalInformation.vue";
import ContactInformation from "@/components/Profile/Index/ContactInformation.vue";
import EducationStatus from "@/components/Profile/Index/EducationStatus.vue";
import EmergencyInformation from "@/components/Profile/Index/EmergencyInformation.vue";
</script>
<template>
  <div class="card mb-3">
    <div class="card-body row">
      <PersonalInformation />
      <ContactInformation />
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-body row">
      <EducationStatus />
      <EmergencyInformation />
    </div>
  </div>
</template>
