<script setup>
import { onMounted } from "vue";
import { useReportApi } from "@/store/ApiServices/ReportApi";
import { useRoute, useRouter } from "vue-router";
import List from "@/components/Admin/DebitReport/List.vue";
import Filter from "@/components/Admin/DebitReport/Filter.vue";
const reportApi = useReportApi();
const router = useRouter();
const route = useRoute();

const routeChange = (value) => {
  router.replace({
    name: "debit-reports",
    query: value,
  });
};

onMounted(() => {
  reportApi.getDebitReport(route.query).catch(() => {
    router.push({
      name: "dashboard",
    });
  });
});
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">
        {{ $t("debitReports") }}
      </h4>
      <div class="ml-auto">
        <Filter />
      </div>
    </div>
    <div class="card-body">
      <List />
    </div>
  </div>
</template>
