<script setup>
import { onMounted } from "vue";
import { useReportApi } from "@/store/ApiServices/ReportApi";
import { useRoute, useRouter } from "vue-router";
import List from "@/components/Admin/AbsenceReport/List.vue";
import DateFilter from "@/components/Admin/AbsenceReport/DateFilter.vue";
import Filter from "@/components/Admin/AbsenceReport/Filter.vue";

const router = useRouter();
const route = useRoute();
const reportApi = useReportApi();
const routeChange = (value) => {
  router.replace({
    name: "absence-reports",
    query: value,
  });
};

onMounted(() => {
  const query = route.query;

  reportApi.getAbsenceReport(query).catch(() => {
    routeChange();
  });
});
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">
        {{ $t("absenceReports") }}
      </h4>
      <div class="d-flex gap-2">
        <router-link
          :to="{ name: 'add-absence' }"
          class="btn btn-success text-light"
          ><i class="fas fa-plus"></i>
          {{ $t("addAttr", { attr: $t("absence") }) }}</router-link
        >
        <Filter />
        <DateFilter />
      </div>
    </div>
    <div class="card-body">
      <List />
    </div>
  </div>
</template>
