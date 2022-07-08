<script setup>
// import DataApiService from "@/core/services/ApiServices/DataApiService";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const apiData = useApiData();
const apiStore = useApiDataStore();
const router = useRouter();
const route = useRoute();
const isReady = ref(false);
const form = reactive({
  search: route.query.search || null,
  company_id: route.query.company_id || null,
  department_id: route.query.department_id || null,
  position_id: route.query.position_id || null,
  role: route.query.role || null,
});

const changeFilter = () => {
  let newQuery = {};
  Object.entries(form).map(([key, value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

  const reversedKeys = Object.keys(newQuery).reverse();
  let newReversedQuery = {};
  reversedKeys.forEach((key) => {
    newReversedQuery[key] = newQuery[key];
  });

  router.replace({
    name: "employees",
    query: newReversedQuery,
  });
};

onMounted(async () => {
  await apiData.getCompanies();
  await apiData.getRoles();

  isReady.value = true;
});
</script>

<template>
  <el-dropdown :hide-on-click="false">
    <button class="btn btn-info text-light">
      <i class="fas fa-filter"></i> {{ $t("filter") }}
    </button>
    <template #dropdown>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">
            {{ $t("filter") }}
          </h5>
        </div>
        <Form @submit="changeFilter" v-slot="{ resetForm }">
          <div class="card-body" style="width: 300px; height: auto">
            <div v-if="isReady">
              <div class="mb-4">
                <label for="search" class="fw-bold form-label fs-6">
                  {{ $t("search") }}</label
                >
                <input
                  v-model="form.search"
                  type="text"
                  id="search"
                  class="form-control form-control-solid"
                  :placeholder="$t('searchPlaceholder')"
                />
              </div>

              <Select
                v-model="form.company_id"
                :label="$t('select', { attr: $t('company') })"
                name="company"
                :inline="false"
                mainClass="mb-4"
                labelClass="fw-bold form-label fs-6"
                :options="apiStore.companies"
                @selected="apiData.getDepartments(form.company_id)"
              />

              <Select
                v-model="form.department_id"
                :label="$t('select', { attr: $t('department') })"
                name="department"
                :inline="false"
                mainClass="mb-4"
                labelClass="fw-bold form-label fs-6"
                :options="apiStore.departments"
                :disabled="!form.company_id"
                @selected="apiData.getPositions(form.department_id)"
              />

              <Select
                v-model="form.position_id"
                :label="$t('select', { attr: $t('position') })"
                name="position"
                :inline="false"
                mainClass="mb-4"
                labelClass="fw-bold form-label fs-6"
                :disabled="!form.department_id"
                :options="apiStore.positions"
              />

              <Select
                v-model="form.role"
                :label="$t('select', { attr: $t('role') })"
                name="role"
                :inline="false"
                labelClass="fw-bold form-label fs-6"
                :options="apiStore.roles"
              />
            </div>
            <div class="text-center align-items-center py-5" v-else>
              <CSpinner color="success" />
            </div>
            <!--begin::Actions-->
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-danger me-2 text-light"
                @click="
                  async () => {
                    await resetForm();
                    await $router.push({ name: 'employees' });
                  }
                "
              >
                {{ $t("reset") }}
              </button>
              <button class="btn btn-info text-light" type="submit">
                <i class="fas fa-search"></i> {{ $t("search") }}
              </button>
            </div>
          </div>
        </Form>
        <!--end::Actions-->
      </div>
    </template>
  </el-dropdown>
</template>
