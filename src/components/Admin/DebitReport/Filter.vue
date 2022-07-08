<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";
import { onMounted, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const isReady = ref(false);
const apiStore = useApiDataStore();
const apiData = useApiData();
const form = reactive({
  start_date: null,
  end_date: null,
  company_id: null,
  department_id: null,
  status: "debit_employee",
  inventory_id: null,
  inventory_type: null,
});

const date = ref(null);

onMounted(async () => {
  await apiData.getCompanies(1);
  await apiData.getAbsenceTypes();

  await Object.entries(route.query).forEach(([key, value]) => {
    form[key] = value;
  });

  isReady.value = true;
  date.value = [form.start_date, form.end_date];
});

const filter = async () => {
  let query = {};

  await Object.entries(form).forEach(([key, value]) => {
    if (value) {
      query[key] = value;
    }
  });
  router.replace({
    name: "debit-reports",
    query: query,
  });
};

watch(date, (value) => {
  if (value) {
    form.start_date = value[0];
    form.end_date = value[1];

    return;
  }
  form.start_date = null;
  form.end_date = null;
});
</script>
<template>
  <el-dropdown :hide-on-click="false">
    <button class="btn btn-info text-light">
      <i class="fas fa-filter"></i> {{ $t("filter") }}
    </button>
    <template #dropdown>
      <div class="card" style="width: 650px">
        <div class="card-header">
          <h5 class="card-title">
            {{ $t("filter") }}
          </h5>
        </div>
        <div class="card-body">
          <div v-if="isReady" class="row">
            <div class="col-md-6">
              <Select
                v-model="form.company_id"
                :label="$t('company')"
                name="company_id"
                :inline="false"
                mainClass="mb-4 row"
                :options="apiStore.companies"
                labelClass="fs-6"
                @selected="
                  apiData.getDepartments(form.company_id),
                    apiData.getInventoryTypes(form.company_id)
                "
              />
              <Select
                v-model="form.department_id"
                :label="$t('department')"
                name="department_id"
                :inline="false"
                mainClass="mb-4 row"
                :disabled="!form.company_id"
                labelClass="fs-6"
                :options="apiStore.departments"
              />
              <Select
                v-model="form.inventory_type"
                :label="$t('inventoryType')"
                name="inventory_type"
                :disabled="!form.company_id"
                :options="apiStore.inventoryTypes"
                :inline="false"
                mainClass="mb-4"
                labelClass="fs-6"
                @selected="apiData.getInventoriesByType(form.inventory_type)"
              />
            </div>
            <div class="col-md-6">
              <Select
                v-model="form.inventory_id"
                :label="$t('inventory')"
                name="inventory"
                :disabled="!form.inventory_type"
                :options="apiStore.inventories"
                :inline="false"
                labelClass="fs-6"
                mainClass="mb-4"
              />
              <DateInput
                v-model="date"
                name="date"
                :label="$t('date')"
                type="daterange"
                range-seperator="to"
                mainClass="mb-4"
                :inline="false"
                labelClass="fs-6"
                inputClass="w-auto"
              />
              <div class="mb-4">
                <label for="status" class="fs-6 form-label">{{
                  $t("status")
                }}</label>
                <select
                  v-model="form.status"
                  id="status"
                  class="form-select form-select-solid"
                  aria-label="Select example"
                >
                  <option value="debit_employee">
                    {{ $t("debit_employee") }}
                  </option>
                  <option value="not_using">{{ $t("not_using") }}</option>
                  <option value="fixing">{{ $t("fixing") }}</option>
                  <option value="broken">{{ $t("broken") }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="text-center align-items-center py-5" v-else>
            <CSpinner color="success" />
          </div>
          <!--begin::Actions-->
        </div>
        <div class="card-footer">
          <div class="d-flex">
            <button
              type="reset"
              class="btn btn-danger me-2 text-light"
              @click="$router.push({ name: 'debit-reports' })"
            >
              {{ $t("reset") }}
            </button>
            <button class="btn btn-primary" @click="filter()">
              <i class="fas fa-search"></i> {{ $t("search") }}
            </button>
          </div>
        </div>
        <!--end::Actions-->
      </div>
    </template>
  </el-dropdown>
</template>
