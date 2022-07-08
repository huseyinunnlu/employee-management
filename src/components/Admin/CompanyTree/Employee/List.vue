<script setup>
import Item from "./Item.vue";
import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { useTreeStore } from "@/store/Admin/Company/Tree";

const treeStore = useTreeStore();
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("firstName") }}</th>
          <th>{{ $t("lastName") }}</th>
          <th>{{ $t("role") }}</th>
          <th>{{ $t("startDate") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item v-for="item in treeStore.employees" :key="item.id" :item="item" />
      </tbody>
    </table>
  </div>
</template>
