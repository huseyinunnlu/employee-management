<script setup>
import { useAbsenceReportStore } from "@/store/Admin/AbsenceReport/AbsenceReport";
import Item from "./Item.vue";
const absenceReportStore = useAbsenceReportStore();
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("employee") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("absenceType") }}</th>
          <th>{{ $t("absenceDate") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("dayCount") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in absenceReportStore.users"
          :key="item.id"
          :item="item"
        />
      </tbody>
    </table>
  </div>
  <Pagination :paginationData="absenceReportStore.pagination" />
</template>
