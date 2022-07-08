<script setup>
import AddForm from "@/components/Admin/AbsenceReport/AddForm.vue";
import AddUser from "@/components/Admin/AbsenceReport/AddUser.vue";
import Save from "@/components/Admin/AbsenceReport/Save.vue";
import MultiStep from "@/components/FormElements/MultiStep.vue";
import { useAbsenceReportStore } from "@/store/Admin/AbsenceReport/AbsenceReport";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useReportApi } from "@/store/ApiServices/ReportApi";

import { onMounted, ref } from "vue";

const pages = [
  {
    id: 1,
    title: "absenceInfo",
  },
  {
    id: 2,
    title: "selectUser",
  },
  {
    id: 3,
    title: "save",
  },
];

const dataApi = useApiData();
const reportApi = useReportApi();
const absenceReportStore = useAbsenceReportStore();

const isLoading = ref(false);
const isReady = ref(false);
onMounted(async () => {
  await dataApi.getAbsenceTypes();
  await reportApi.getUsers();
});

const add = () => {
  isLoading.value = true;
  reportApi
    .addAbsence(absenceReportStore.form)
    .then(() => {
      absenceReportStore.form.type_id = null;
      absenceReportStore.form.date = null;
      absenceReportStore.form.start_time = null;
      absenceReportStore.form.end_time = null;
      absenceReportStore.form.day_type = "full";
      absenceReportStore.form.status = "pending";
      absenceReportStore.form.users = [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">{{ $t("addAttr", { attr: $t("absence") }) }}</h4>
      <router-link
        class="btn btn-info btn-sm text-light"
        :to="{
          name: 'absence-reports',
        }"
        ><i class="fas fa-arrow-left"></i> {{ $t("goBack") }}</router-link
      >
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
            <Save />
          </template>
        </MultiStep>
      </Form>
    </div>
  </div>
</template>
