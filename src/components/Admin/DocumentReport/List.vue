<script setup>
import { useDocumentReportStore } from "@/store/Admin/DocumentReport/DocumentReport";
import Item from "./Item.vue";
const documentReportStore = useDocumentReportStore();
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("fullName") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("document") }}</th>
          <th>{{ $t("documentType") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in documentReportStore.users"
          :key="item.id"
          :item="item"
        />
      </tbody>
    </table>
  </div>
  <Pagination :paginationData="documentReportStore.pagination" />
</template>
