<script setup>
import Show from "./Show.vue";
import Item from "./Item.vue";
import { useExpenseStore } from "@/store/Admin/Expense";

import { ref } from "vue";
const expenseStore = useExpenseStore();
const selectedId = ref(null);
const showModal = ref(false);
const goDetails = async (data) => {
  selectedId.value = data;
  showModal.value = true;
};
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("fullName") }}</th>
          <th>{{ $t("createdAt") }}</th>
          <th>{{ $t("totalPrice") }}</th>
          <th>{{ $t("company") }}</th>
          <th>{{ $t("department") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("notes") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in expenseStore.expenses"
          :key="item.id"
          :item="item"
          @show="goDetails(item.id)"
        />
      </tbody>
    </table>
  </div>
  <Pagination :paginationData="expenseStore.pagination" />

  <Show
    :selectedId="selectedId"
    :show="showModal"
    @closeModal="showModal = false"
  />
</template>
