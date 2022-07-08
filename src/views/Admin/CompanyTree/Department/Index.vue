<script setup>
import { useDepartmentStore } from "@/store/Admin/Company/Department";

const department = useDepartmentStore().department;
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("title") }}: </label>
    <div class="col-lg-8">{{ department.title }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("company") }}: </label>
    <div class="col-lg-8">{{ department.company.title }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("city") }}: </label>
    <div class="col-lg-8">{{ department.city.title }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("mountlyHoliday") }}:
    </label>
    <div class="col-lg-8">{{ department.mountly_holiday }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("dailyWorkHour") }}:
    </label>
    <div class="col-lg-8">{{ department.daily_work_hour }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("overtimeRate") }}:
    </label>
    <div class="col-lg-8">{{ department.overtime_rate }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("overtimeType") }}:
    </label>
    <div class="col-lg-8">{{ $t(department.overtime_type) }}</div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("foodFeeTax") }}: </label>
    <div class="col-lg-8">
      <i
        class="fs-3"
        :class="
          department.food_fee_tax
            ? 'fas fa-check text-success'
            : 'fas fa-times text-danger'
        "
      ></i>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("roadFeeTax") }}: </label>
    <div class="col-lg-8">
      <i
        class="fs-3"
        :class="
          department.road_fee_tax
            ? 'fas fa-check text-success'
            : 'fas fa-times text-danger'
        "
      ></i>
    </div>
  </div>
</template>
