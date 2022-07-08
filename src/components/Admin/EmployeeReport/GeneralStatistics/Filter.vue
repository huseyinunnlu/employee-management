<script setup>
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
  role_id: route.query.role_id || null,
});

const changeFilter = () => {
  let newQuery = route.query;

  Object.entries(form).forEach((formItem) => {
    newQuery[formItem[0]] = formItem[1];
  });

  const reversedKeys = Object.keys(newQuery).reverse();
  let newReversedQuery = {};
  reversedKeys.forEach((key) => {
    newReversedQuery[key] = newQuery[key];
  });

  router.push({
    name: "general-statistics",
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
      <div class="card" style="width: 300px">
        <div class="card-header">
          <h5 class="card-title">
            {{ $t("filter") }}
          </h5>
        </div>
        <div class="card-body">
          <div v-if="isReady">
            <!--end::Input group-->
            <div class="mb-4">
              <label for="search" class="form-label fs-6 fw-bold">
                {{ $t("search") }}</label
              >
              <input
                v-model="form.search"
                type="text"
                id="search"
                class="form-control form-control-solid"
                :placeholder="$t('searchPlaceholder')"
                @change="changeFilter('search')"
              />
            </div>

            <div class="mb-4">
              <label for="search" class="form-label fs-6 fw-">{{
                $t("select", { attr: $t("company") })
              }}</label>

              <select
                class="form-select form-select-solid"
                v-model="form.company_id"
                @change="changeFilter('company')"
              >
                <option :value="null">
                  {{ $t("select", { attr: $t("company") }) }}
                </option>
                <option
                  :value="company.id"
                  v-for="company in apiStore.companies"
                  :key="company.id"
                >
                  {{ company.title }}
                </option>
              </select>
            </div>

            <div class="mb-4">
              <label for="search" class="form-label fs-6 fw-">
                {{ $t("select", { attr: $t("role") }) }}
              </label>

              <select
                class="form-select form-select-solid"
                aria-label="Select example"
                v-model="form.role_id"
                @change="changeFilter('role')"
              >
                <option :value="null">
                  {{ $t("select", { attr: $t("role") }) }}
                </option>
                <option
                  :value="role.id"
                  v-for="role in apiStore.roles"
                  :key="role.id"
                >
                  {{ role.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="text-center align-items-center py-5" v-else>
            <CSpinner color="success" />
          </div>
          <!--begin::Actions-->
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <button
              type="reset"
              class="btn btn-danger me-2 text-light"
              @click="
                () => {
                  $router.push({ name: 'general-statistics' });
                }
              "
            >
              {{ $t("reset") }}
            </button>
            <button class="btn btn-info text-light" @click="changeFilter()">
              <i class="fas fa-search"></i> {{ $t("search") }}
            </button>
          </div>
        </div>
        <!--end::Actions-->
      </div>
    </template>
  </el-dropdown>
</template>
