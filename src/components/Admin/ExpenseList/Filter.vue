<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useAuthStore } from "@/store/Auth";

import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const apiStore = useApiDataStore();
const apiData = useApiData();

const isReady = ref(false);
const form = reactive({
  start_date: null,
  end_date: null,
  company_id: null,
  department_id: null,
  status: null,
  type_id: null,
});

const date = ref(null);

onMounted(async () => {
  const query = route.query;
  const companyId =
    route.name == "expense-list" ? query.company_id : authStore.user.company.id;

  route.name == "expense-list" ? await apiData.getCompanies() : "";
  if (route.name == "expense_list") {
    apiData.getDepartments(companyId);
  }

  if (companyId) {
    apiData.getExpenseTypes(companyId);
  }

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
    name: route.name,
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
      <div class="card" style="width: 450px">
        <div class="card-header">
          <h5 class="card-title">
            {{ $t("filter") }}
          </h5>
        </div>
        <div class="card-body">
          <div v-if="isReady" class="row">
            <Select
              v-if="$route.name == 'expense-list'"
              v-model="form.company_id"
              :label="$t('company')"
              name="company_id"
              :inline="false"
              mainClass="mb-4"
              labelClass="fw-bold mb-4 form-label fs-6"
              :options="apiStore.companies"
              @selected="
                apiData.getExpenseTypes(form.company_id),
                  apiData.getDepartments(form.company_id)
              "
            />
            <Select
              v-if="$route.name == 'expense-list'"
              v-model="form.department_id"
              :label="$t('department')"
              name="department_id"
              :inline="false"
              mainClass="mb-4"
              labelClass="fw-bold mb-4 form-label fs-6"
              :disabled="!form.company_id"
              :options="apiStore.departments"
            />
            <Select
              v-model="form.type_id"
              :label="$t('expenseType')"
              name="expenseType"
              labelClass="fw-bold mb-4 form-label fs-6"
              :options="apiStore.expenseTypes"
              :inline="false"
              mainClass="mb-4"
            />

            <DateInput
              v-model="date"
              name="date"
              :label="$t('date')"
              type="daterange"
              range-seperator="to"
              labelClass="fw-bold mb-4 form-label fs-6"
              mainClass="mb-4"
              :inline="false"
              inputClass="w-auto"
            />

            <div class="mb-4">
              <label for="status" class="form-label fw-bold fs-6 mb-4">{{
                $t("status")
              }}</label>
              <select
                v-model="form.status"
                id="status"
                class="form-select form-select-solid"
                aria-label="Select example"
              >
                <option value="pending">{{ $t("pending") }}</option>
                <option value="accepted">{{ $t("accepted") }}</option>
                <option value="rejected">{{ $t("rejected") }}</option>
              </select>
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
              @click="$router.push({ name: $route.name })"
            >
              {{ $t("reset") }}
            </button>
            <button class="btn btn-primary" @click="filter()">
              <i class="fas fa-search"></i> {{ $t("search") }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>
