<script setup>
import { useStatisticsStore } from "@/store/Admin/EmployeeReport/GeneralStatistics";
import { useRoute, useRouter } from "vue-router";
import Item from "./Item.vue";
const statisticStore = useStatisticsStore();
const route = useRoute();
const router = useRouter();
const changeQuery = (e) => {
  const query = route.query;

  router.replace({
    name: "general-statistics",
    query: { ...query, ...e },
  });
};
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("employee") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("age") }}</th>
          <th>{{ $t("role") }}</th>
          <th>{{ $t("ageRange") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in statisticStore.users"
          :key="item.id"
          :item="item"
        />
      </tbody>
    </table>
  </div>
  <Pagination :paginationData="statisticStore.pagination" />
</template>
