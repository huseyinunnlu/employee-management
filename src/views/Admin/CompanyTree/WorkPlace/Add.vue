<script setup>
import Save from "./Save.vue";
import MultiStep from "@/components/FormElements/MultiStep.vue";
import AddForm from "@/components/Admin/CompanyTree/WorkPlace/AddForm.vue";
import WorkingHour from "@/components/Admin/CompanyTree/WorkPlace/WorkingHour.vue";

import { useApiData } from "@/store/ApiServices/ApiData";
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const apiData = useApiData();
const router = useRouter();
const workPlaceStore = useWorkPlaceStore();
const treeApi = useTreeApi();
const pages = [
  {
    id: 1,
    title: "workPlaceInfo",
  },
  {
    id: 2,
    title: "workingHourInfo",
  },
  {
    id: 3,
    title: "save",
  },
];

onMounted(() => {
  apiData.getMusteris();
  apiData.getCountries();
});

const isLoading = ref(false);

const add = () => {
  isLoading.value = true;
  treeApi
    .addWorkPlace(workPlaceStore.form)
    .then(() => {
      router.push({ name: "company-cards" });
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
        {{ $t("addAttr", { attr: $t("workplace") }) }}
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
            <WorkingHour />
          </template>
          <template #page-3>
            <Save />
          </template>
        </MultiStep>
      </Form>
    </div>
  </div>
</template>
