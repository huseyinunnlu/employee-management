<script setup>
import { onMounted, ref } from "vue";
import { useReportApi } from "@/store/ApiServices/ReportApi";
import { useRoute, useRouter } from "vue-router";
import List from "@/components/Admin/DocumentReport/List.vue";
import Filter from "@/components/Admin/DocumentReport/Filter.vue";

const reportApi = useReportApi();
const router = useRouter();
const route = useRoute();

const isReady = ref(false);

const routeChange = (value) => {
  router.replace({
    name: "document-reports",
    query: value,
  });
};

onMounted(async () => {
  const query = route.query;

  await reportApi
    .getDocumentReport(query)
    .then(() => {
      isReady.value = true;
    })
    .catch(() => {
      routeChange();
    });
});
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">
        {{ $t("documentReports") }}
      </h4>
      <Filter />
    </div>
    <div class="card-body">
      <List />
    </div>
  </div>
</template>
