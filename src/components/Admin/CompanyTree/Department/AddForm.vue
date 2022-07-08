<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useDepartmentStore } from "@/store/Admin/Company/Department";

const apiStore = useApiDataStore();
const apiData = useApiData();
const departmentStore = useDepartmentStore();
</script>
<template>
  <div class="row">
    <Select
      name="musteri_id"
      v-model="departmentStore.form.musteri_id"
      :label="$t('musteri')"
      rules="required"
      :inline="false"
      :options="apiStore.musteris"
      @selected="apiData.getCompanies(departmentStore.form.musteri_id)"
      mainClass="col-md-6 mb-4"
    />
    <Select
      v-model="departmentStore.form.company_id"
      name="company_id"
      :label="$t('company')"
      rules="required"
      :inline="false"
      :options="apiStore.companies"
      mainClass="col-md-6 mb-4"
    />
    <Input
      v-model="departmentStore.form.title"
      :label="$t('departmentName')"
      name="title"
      rules="required|max:255"
      :inline="false"
      mainClass="col-md-12 mb-4"
    />
    <Select
      v-model="departmentStore.form.country_id"
      :label="$t('country')"
      name="country_id"
      rules="required"
      mainClass="col-md-6 mb-4"
      :inline="false"
      :options="apiStore.countries"
      @selected="apiData.getCities(departmentStore.form.country_id)"
    />
    <Select
      v-if="apiStore.cities.length > 0"
      v-model="departmentStore.form.city_id"
      :label="$t('city')"
      name="city"
      rules="required"
      mainClass="col-md-6 mb-4"
      :inline="false"
      :options="apiStore.cities"
    />
    <div class="row mb-4">
      <Input
        v-model="departmentStore.form.mountly_holiday"
        :label="$t('mountlyHoliday')"
        name="mountly_holiday"
        rules="required|max_value:30|min_value:0"
        :inline="false"
        inputType="number"
        mainClass="col-md-4"
      />
      <Input
        v-model="departmentStore.form.daily_work_hour"
        :label="$t('dailyWorkHour')"
        name="daily_work_hour"
        rules="required"
        :inline="false"
        mainClass="col-md-4"
        inputType="number"
      />
      <Input
        v-model="departmentStore.form.overtime_rate"
        :label="$t('overtimeRate') + '%'"
        name="overtime_rate"
        rules="required"
        :inline="false"
        mainClass="col-md-4"
        inputType="number"
      />
    </div>
    <div class="col-md-6 mb-4">
      <label class="fs-6 fw-bold departmentStore.form-label mb-3">{{
        $t("overtimeType")
      }}</label>
      <div class="d-flex align-items-center mb-4">
        <div
          class="departmentStore.form-check departmentStore.form-check-custom departmentStore.form-check-solid me-4"
        >
          <input
            class="departmentStore.form-check-input"
            type="radio"
            value="common"
            v-model="departmentStore.form.overtime_type"
            id="common"
          />
          <label class="departmentStore.form-check-label" for="common">{{
            $t("common")
          }}</label>
        </div>
        <div
          class="departmentStore.form-check departmentStore.form-check-custom departmentStore.form-check-solid"
        >
          <input
            class="departmentStore.form-check-input"
            type="radio"
            value="mall"
            v-model="departmentStore.form.overtime_type"
            id="mall"
          />
          <label class="departmentStore.form-check-label" for="mall">{{
            $t("mall")
          }}</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 my-4">
      <div
        class="departmentStore.form-check departmentStore.form-check-custom departmentStore.form-check-solid me-4 mb-4"
      >
        <input
          class="departmentStore.form-check-input"
          type="checkbox"
          value="foodFeeTax"
          v-model="departmentStore.form.food_fee_tax"
          id="foodFeeTax"
        />
        <label class="departmentStore.form-check-label" for="foodFeeTax">{{
          $t("foodFeeTax")
        }}</label>
      </div>
      <div
        class="departmentStore.form-check departmentStore.form-check-custom departmentStore.form-check-solid me-4"
      >
        <input
          class="departmentStore.form-check-input"
          type="checkbox"
          value="roadFeeTax"
          v-model="departmentStore.form.road_fee_tax"
          id="roadFeeTax"
        />
        <label class="departmentStore.form-check-label" for="roadFeeTax">{{
          $t("roadFeeTax")
        }}</label>
      </div>
    </div>
  </div>
</template>
