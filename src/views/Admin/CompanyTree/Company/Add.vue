<script setup>
import AddUser from "@/components/Admin/CompanyTree/Company/AddUser.vue";
import AddForm from "@/components/Admin/CompanyTree/Company/AddForm.vue";
import MultiStep from "@/components/FormElements/MultiStep.vue";
import Save from "@/components/Admin/CompanyTree/Company/Save.vue";

import { useApiData } from "@/store/ApiServices/ApiData";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const apiStore = useApiDataStore();
const treeStore = useTreeStore();
const apiData = useApiData();
const treeApi = useTreeApi();
const companyStore = useCompanyStore();

const pages = [
  {
    id: 1,
    title: "companyInfo",
  },
  {
    id: 2,
    title: "companyManagerInfo",
  },
  {
    id: 3,
    title: "save",
  },
];

onMounted(() => {
  apiData.getMusteris();
  apiData.getCountries();
  treeApi.getUsersForManagerAdding(null, "company_id");
});

const isLoading = ref(false);

const cityTitle = () => {
  return apiStore.cities.find((item) => {
    item.id == companyStore.form.city_id;
  });
};

const add = () => {
  isLoading.value = true;
  treeApi
    .addCompany(companyStore.form, companyStore.form.permittedUsers)
    .then(() => {
      companyStore.form.logo = null;
      companyStore.form.title = null;
      companyStore.form.address = null;
      companyStore.form.email = null;
      companyStore.form.city_id = null;
      companyStore.form.country_id = null;
      companyStore.form.permittedUsers = [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("addAttr", { attr: $t("company") }) }}</h4>
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
            <Save
              :data="companyStore.form"
              :managers="companyStore.form.permittedUsers"
            />
          </template>
        </MultiStep>
      </Form>
    </div>
  </div>
</template>
