<script setup>
import EmergencyContact from "@/components/Profile/AnotherInfo/EmergencyContact/EmergencyContact.vue";
import { ref } from "vue";
import AddEducationInfo from "@/components/Profile/AnotherInfo/EducationInfo/Add.vue";
import EducationInfo from "@/components/Profile/AnotherInfo/EducationInfo/List.vue";
import AddCertificate from "@/components/Profile/AnotherInfo/Certificate/Add.vue";
import Certificate from "@/components/Profile/AnotherInfo/Certificate/List.vue";
import AddForeignLanguage from "@/components/Profile/AnotherInfo/ForeignLanguage/Add.vue";
import ForeignLanguage from "@/components/Profile/AnotherInfo/ForeignLanguage/List.vue";
import AddWorkExperience from "@/components/Profile/AnotherInfo/WorkExperience/Add.vue";
import WorkExperience from "@/components/Profile/AnotherInfo/WorkExperience/List.vue";
import AddReference from "@/components/Profile/AnotherInfo/Reference/Add.vue";
import Reference from "@/components/Profile/AnotherInfo/Reference/List.vue";
</script>

<template>
  <div class="card col-md-12 mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("emergencyInfo") }}</h4>
    </div>
    <div class="card-body row p-5">
      <EmergencyContact />
    </div>
  </div>
  <div class="card col-md-12 mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("educationInfo") }}</h4>
      <AddEducationInfo />
    </div>
    <div class="card-body row p-5">
      <EducationInfo />
    </div>
  </div>

  <div class="card col-md-12 mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("certificate") }}</h4>
      <AddCertificate />
    </div>
    <div class="card-body row p-5">
      <Certificate />
    </div>
  </div>

  <div class="card col-md-12 mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("foreignLanguage") }}</h4>
      <AddForeignLanguage />
    </div>
    <div class="card-body row p-5">
      <ForeignLanguage />
    </div>
  </div>
  <div class="card col-md-12 mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("workExperience") }}</h4>
      <AddWorkExperience />
    </div>
    <div class="card-body row p-5">
      <WorkExperience />
    </div>
  </div>

  <div class="card col-md-12 mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("reference") }}</h4>
      <AddReference />
    </div>
    <div class="card-body row p-5">
      <Reference />
    </div>
  </div>
</template>
