<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useDepartmentApi } from "@/store/ApiServices/DepartmentApi";
import { useDepartmentStore } from "@/store/Admin/Company/Department";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, reactive, ref } from "vue";

const departmentStore = useDepartmentStore();
const departmentApi = useDepartmentApi();
const apiStore = useApiDataStore();
const apiData = useApiData();
const isLoading = ref(false);
const isReady = ref(false);
const form = reactive({
  title: null,
  country_id: null,
  city_id: null,
  mountly_holiday: null,
  daily_work_hour: null,
  overtime_rate: null,
  overtime_type: "common",
  food_fee_tax: false,
  road_fee_tax: false,
});

onMounted(async () => {
  await apiData.getCountries();
  await setData(departmentStore.department);
  isReady.value = true;
});

const setData = (value) => {
  form.title = value.title;
  form.city_id = value.city.id;
  form.country_id = value.city.country_id;
  form.mountly_holiday = value.mountly_holiday;
  form.daily_work_hour = value.daily_work_hour;
  form.overtime_rate = value.overtime_rate;
  form.overtime_type = value.overtime_type;
  form.food_fee_tax = value.food_fee_tax;
  form.road_fee_tax = value.road_fee_tax;
};

const update = () => {
  isLoading.value = true;
  departmentApi.update(departmentStore.department.id, form).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <Form @submit="update()">
    <div class="row" v-if="isReady">
      <Input
        v-model="form.title"
        :label="$t('companyName')"
        name="title"
        rules="required|max:255"
        :inline="false"
      />
      <div class="row">
        <Select
          v-model="form.country_id"
          :label="$t('country')"
          name="country_id"
          rules="required"
          mainClass="col-sm-6 mb-4"
          :inline="false"
          :options="apiStore.countries"
          @selected="apiData.getCities(form.country_id)"
        />
        <Select
          v-model="form.city_id"
          :label="$t('city')"
          name="city"
          rules="required"
          mainClass="col-sm-6 mb-4"
          :inline="false"
          :options="apiStore.cities"
        />
      </div>
      <Input
        v-model="form.mountly_holiday"
        :label="$t('mountlyHoliday')"
        name="mountly_holiday"
        rules="required|max_value:30|min_value:0"
        :inline="false"
        inputType="number"
      />
      <Input
        v-model="form.daily_work_hour"
        :label="$t('dailyWorkHour')"
        name="daily_work_hour"
        rules="required"
        :inline="false"
        inputType="number"
      />
      <Input
        v-model="form.overtime_rate"
        :label="$t('overtimeRate')"
        name="overtime_rate"
        rules="required"
        :inline="false"
        inputType="number"
      />

      <div class="col-sm-8 mb-4">
        <label class="fs-6 fw-bold form-label mb-3">{{
          $t("overtimeType")
        }}</label>
        <div class="d-flex align-items-center">
          <div class="form-check form-check-custom form-check-solid me-4">
            <input
              class="form-check-input"
              type="radio"
              value="common"
              v-model="form.overtime_type"
              id="common"
            />
            <label class="form-check-label" for="common">{{
              $t("common")
            }}</label>
          </div>
          <div class="form-check form-check-custom form-check-solid">
            <input
              class="form-check-input"
              type="radio"
              value="mall"
              v-model="form.overtime_type"
              id="mall"
            />
            <label class="form-check-label" for="mall">{{ $t("mall") }}</label>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="form-check form-check-custom form-check-solid me-4 mb-4">
          <input
            class="form-check-input"
            type="checkbox"
            value="foodFeeTax"
            v-model="form.food_fee_tax"
            id="foodFeeTax"
          />
          <label class="form-check-label" for="foodFeeTax">{{
            $t("foodFeeTax")
          }}</label>
        </div>
        <div class="form-check form-check-custom form-check-solid me-4">
          <input
            class="form-check-input"
            type="checkbox"
            value="roadFeeTax"
            v-model="form.road_fee_tax"
            id="foodFeeTax"
          />
          <label class="form-check-label" for="roadFeeTax">{{
            $t("roadFeeTax")
          }}</label>
        </div>
      </div>

      <Button
        :isLoading="isLoading"
        text="update"
        loadingText="updating"
        icon="fas fa-floppy-disk"
      />
    </div>
    <div class="text-center align-items-center py-5" v-else>
      <CSpinner color="success" />
    </div>
  </Form>
</template>
