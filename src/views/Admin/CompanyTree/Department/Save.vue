<script setup>
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { useApiDataStore } from "@/store/Api/ApiData";
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps(["data"]);

const treeStore = useTreeStore();
const apiStore = useApiDataStore();
const managerList = ref([]);
const cityTitle = ref(null);
const companyTitle = ref(null);

const data = computed(() => {
  return props.data;
});

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

    if (value.company_id) {
      const company = apiStore.companies.find((item) => {
        return item.id == value.company_id;
      });
      companyTitle.value = company.title;
    } else {
      companyTitle.value = null;
    }
    if (value.permittedUsers.length > 0) {
      value.permittedUsers.forEach((item) => {
        managerList.value.unshift(
          treeStore.addUsers.find((user) => {
            return user.id == item;
          })
        );
      });
    } else {
      managerList.value = [];
    }
  },
  { deep: true }
);
</script>
<template>
  <div class="content row my-4">
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("title") }}: </label>
      <div class="col-lg-8">{{ props.data.title }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("company") }}: </label>
      <div class="col-lg-8">{{ companyTitle }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("city") }}: </label>
      <div class="col-lg-8">{{ cityTitle }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("mountlyHoliday") }}:
      </label>
      <div class="col-lg-8">{{ props.data.mountly_holiday }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("dailyWorkHour") }}:
      </label>
      <div class="col-lg-8">{{ props.data.daily_work_hour }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("overtimeRate") }}:
      </label>
      <div class="col-lg-8">{{ props.data.overtime_rate }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("overtimeType") }}:
      </label>
      <div class="col-lg-8">{{ $t(props.data.overtime_type) }}</div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("foodFeeTax") }}:
      </label>
      <div class="col-lg-8">
        <i
          class="fs-3"
          :class="
            props.data.food_fee_tax
              ? 'fas fa-check text-primary'
              : 'fas fa-times text-danger'
          "
        ></i>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("roadFeeTax") }}:
      </label>
      <div class="col-lg-8">
        <i
          class="fs-3"
          :class="
            props.data.road_fee_tax
              ? 'fas fa-check text-primary'
              : 'fas fa-times text-danger'
          "
        ></i>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("managers") }}: </label>
      <div class="col-lg-8">
        <span
          class="d-flex flex-column fw-bolder mb-4 text-dark"
          v-for="user in managerList"
          :key="user.id"
        >
          {{ user.full_name }}
        </span>
      </div>
    </div>
  </div>
</template>
