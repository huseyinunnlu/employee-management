<script setup>
import AddUser from "@/components/Admin/CompanyTree/Department/AddUser.vue";
import AddForm from "@/components/Admin/CompanyTree/Department/AddForm.vue";
import MultiStep from "@/components/FormElements/MultiStep.vue";
import Save from "./Save.vue";

import { useApiData } from "@/store/ApiServices/ApiData";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { useDepartmentStore } from "@/store/Admin/Company/Department";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const apiStore = useApiDataStore();
const treeStore = useTreeStore();
const apiData = useApiData();
const treeApi = useTreeApi();
const departmentStore = useDepartmentStore();

const pages = [
  {
    id: 1,
    title: "departmentInfo",
  },
  {
    id: 2,
    title: "departmentManagerInfo",
  },
  {
    id: 3,
    title: "save",
  },
];

onMounted(() => {
  apiData.getMusteris();
  apiData.getCountries();
  treeApi.getUsersForManagerAdding(null, "department_id");
});

const isLoading = ref(false);

const add = () => {
  isLoading.value = true;
  treeApi
    .addDepartment(departmentStore.form, departmentStore.form.permittedUsers)
    .then(() => {
      departmentStore.form.musteri_id = null;
      departmentStore.form.company_id = null;
      departmentStore.form.title = null;
      departmentStore.form.country_id = null;
      departmentStore.form.city_id = null;
      departmentStore.form.mountly_holiday = null;
      departmentStore.form.daily_work_hour = null;
      departmentStore.form.overtime_rate = null;
      departmentStore.form.overtime_type = "common";
      departmentStore.form.food_fee_tax = false;
      departmentStore.form.road_fee_tax = false;
      departmentStore.form.permittedUsers = [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">
        {{ $t("addAttr", { attr: $t("department") }) }}
      </h4>
      <div class="d-flex gap-2">
        <router-link
          class="btn btn-info text-light btn-sm"
          :to="{ name: 'company-cards' }"
        >
          <i class="fas fa-arrow-left"></i> {{ $t("companyCards") }}
        </router-link>
        <button class="btn btn-info text-light btn-sm" @click="$router.go(-1)">
          <i class="fas fa-arrow-left"></i> {{ $t("goBack") }}
        </button>
      </div>
    </div>
    <div class="card-body">
      <Form @submit="add()">
        <MultiStep :steps="pages" :isLoading="isLoading">
          <template #page-1>
            <AddForm />
          </template>
          <template #page-2>
            <AddUser />
          </template>
          <template #page-3>
            <Save :data="departmentStore.form" />
          </template>
        </MultiStep>
      </Form>
    </div>
  </div>
</template>
