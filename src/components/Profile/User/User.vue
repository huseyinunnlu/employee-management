<script setup>
import { useProfileStore } from "@/store/Profile";
import { computed } from "vue";
// import UserDropdown from "./UserDropdown.vue";
const profileStore = useProfileStore();

const profile = computed(() => {
  return profileStore.profile.card;
});
</script>
<template>
  <div class="flex-grow-1">
    <div
      class="d-flex justify-content-between align-items-start flex-wrap mb-2"
    >
      <!--begin::User-->
      <div class="d-flex flex-column">
        <!--begin::Name-->
        <div class="d-flex align-items-center mb-2 gap-2">
          <span class="text-gray-800 fw-bolder">{{ profile.full_name }}</span>
          <CBadge color="success">
            {{ profile.role.title }}
          </CBadge>
          <router-link
            class="btn btn-info text-light btn-sm"
            :to="{
              name: 'employee-edit',
              params: {
                id: profileStore.profile.id,
              },
            }"
            ><i class="fas fa-pen"></i
          ></router-link>
        </div>
        <!--end::Name-->

        <!--begin::Info-->
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center mb-2">
            <span class="me-3"> {{ $t("status") }} : </span>
            <span class="fw-bold text">
              <i class="fas fa-check me-1"></i>
              {{ $t("working") }}</span
            >
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center mb-2">
            <span class="me-3"> {{ $t("startDate") }} : </span>
            <span class="fw-bold">
              {{
                `${profile.start_date.date} (${profile.start_date.formatted})`
              }}</span
            >
          </div>
          <div class="d-flex align-items-center mb-2">
            <span class="me-3"> {{ $t("workType") }} : </span>
            <span class="fw-bold"> {{ $t(profile.work_type) }}</span>
          </div>
          <div class="d-flex align-items-center mb-2">
            <span class="me-3"> {{ $t("insuranceStatus") }} : </span>
            <span class="fw-bold"> {{ $t(profile.insurance_status) }}</span>
          </div>
        </div>
        <!--end::Info-->
      </div>
      <!--end::User-->
      <div class="d-flex flex-column">
        <div class="d-flex align-items-center mb-2">
          <span class="me-3"> {{ $t("company") }} : </span>
          <span class="fw-bold" v-if="profile.company">
            {{ profile.company }}</span
          >
        </div>
        <div class="d-flex align-items-center mb-2">
          <span class="me-3"> {{ $t("department") }} : </span>
          <span class="fw-bold" v-if="profile.department">
            {{ profile.department || "-" }}</span
          >
        </div>
        <div class="d-flex align-items-center mb-2">
          <span class="me-3"> {{ $t("position") }} : </span>
          <span class="fw-bold" v-if="profile.position">
            {{ profile.position.title || "-" }}</span
          >
        </div>
        <div class="d-flex align-items-center mb-2">
          <span class="me-3"> {{ $t("workPlace") }} : </span>
          <span class="fw-bold" v-if="profile.work_place">
            {{ profile.work_place || "-" }}</span
          >
        </div>
        <div class="d-flex align-items-center mb-2">
          <span class="me-3"> {{ $t("manager") }} : </span>
          <span class="fw-bold" v-if="profile.manager">
            {{ profile.manager || "-" }}</span
          >
        </div>
      </div>
    </div>
  </div>
  <!--end::Info-->
</template>
