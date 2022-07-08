<script setup>
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";
import { useApiDataStore } from "@/store/Api/ApiData";
import { computed, defineProps, ref, watch } from "vue";
import { mask } from "maska";

const apiStore = useApiDataStore();
const workPlaceStore = useWorkPlaceStore();
const cityTitle = ref(null);
const companyTitle = ref(null);
const departmentTitle = ref(null);
const musteriTitle = ref(null);

const data = computed(() => {
  return workPlaceStore.form;
});

const maskValue = (value) => {
  return value ? mask(value, "##:##") : "";
};

watch(
  data,
  (value) => {
    if (value.city_id) {
      const city = apiStore.cities.find((item) => {
        return item.id == value.city_id;
      });
      cityTitle.value = city.title;
    } else {
      cityTitle.value = null;
    }

    if (value.musteri_id) {
      const musteri = apiStore.musteris.find((item) => {
        return item.id == value.musteri_id;
      });
      musteriTitle.value = musteri.title;
    } else {
      musteriTitle.value = null;
    }
    if (value.company_id) {
      const company = apiStore.companies.find((item) => {
        return item.id == value.company_id;
      });
      companyTitle.value = company.title;
    } else {
      companyTitle.value = null;
    }
    if (value.department_id) {
      const department = apiStore.departments.find((item) => {
        return item.id == value.department_id;
      });
      departmentTitle.value = department.title;
    } else {
      departmentTitle.value = null;
    }
  },
  { deep: true }
);
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("title") }}: </label>
    <div class="col-lg-8">{{ data.title }}</div>
  </div>

  <div class="row my-3">
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("musteri") }}: </label>
      <div class="col-lg-8">{{ musteriTitle }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("company") }}: </label>
      <div class="col-lg-8">{{ companyTitle }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("department") }}:
      </label>
      <div class="col-lg-8">{{ departmentTitle }}</div>
    </div>
  </div>

  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("city") }}: </label>
    <div class="col-lg-8">{{ cityTitle }}</div>
  </div>

  <div class="col-md-12 mt-4">
    <table class="table table-rounded table-row-bordered border gy-7 gs-7">
      <thead>
        <tr class="fw- text-gray-800 border-bottom-2 border-gray-200">
          <th style="width: 150px">{{ $t("workType") }}</th>
          <th style="width: 200px">{{ $t("startTime") }}</th>
          <th style="width: 200px">{{ $t("endTime") }}</th>
          <th style="width: 200px">{{ $t("breakTime") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ $t("morning") }}
          </td>
          <td>
            {{ maskValue(data.morning.start_time) }}
          </td>
          <td>
            {{ maskValue(data.morning.end_time) }}
          </td>
          <td>
            {{ data.morning.break_time }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("afternoon") }}
          </td>
          <td>
            {{ maskValue(data.afternoon.start_time) }}
          </td>
          <td>
            {{ maskValue(data.afternoon.end_time) }}
          </td>
          <td>
            {{ data.afternoon.break_time }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("night") }}
          </td>
          <td>
            {{ maskValue(data.night.start_time) }}
          </td>
          <td>
            {{ maskValue(data.night.end_time) }}
          </td>
          <td>
            {{ data.night.break_time }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("fullDay") }}
          </td>
          <td>
            {{ maskValue(data.full.start_time) }}
          </td>
          <td>
            {{ maskValue(data.full.end_time) }}
          </td>
          <td>
            {{ data.full.break_time }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("report") }}
          </td>
          <td>
            {{ maskValue(data.report.start_time) }}
          </td>
          <td>
            {{ maskValue(data.report.end_time) }}
          </td>
          <td>
            {{ data.report.break_time }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("annual") }}
          </td>
          <td>
            {{ maskValue(data.annual.start_time) }}
          </td>
          <td>
            {{ maskValue(data.annual.end_time) }}
          </td>
          <td>
            {{ data.annual.break_time }}
          </td>
        </tr>

        <tr>
          <td>
            {{ $t("permit") }}
          </td>
          <td>
            {{ maskValue(data.permit.start_time) }}
          </td>
          <td>
            {{ maskValue(data.permit.end_time) }}
          </td>
          <td>
            {{ data.permit.break_time }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
