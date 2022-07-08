<script setup>
import { useDebitReportStore } from "@/store/Admin/DebitReport/DebitReport";
import Item from "./Item.vue";
const debitReportStore = useDebitReportStore();
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("fullName") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("inventoryType") }}</th>
          <th>{{ $t("inventory") }}</th>
          <th>{{ $t("serie") }}</th>
          <th>{{ $t("date") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in debitReportStore.users"
          :key="item.id"
          :item="item"
        />
      </tbody>
    </table>
  </div>
</template>
