<script setup>
import Add from "./ExpenseLineAdd.vue";
import ExpenseLineItem from "./ExpenseLineItem.vue";
import { useExpenseStore } from "@/store/Admin/Expense";
const expenseStore = useExpenseStore();
</script>

<template>
  <div class="row">
    <div class="d-flex justify-content-between mb-3 align-items-center">
      <h4 class="card-title">
        {{ $t("expenseList") }}
      </h4>
      <Add />
    </div>

    <table class="table table-hover table-rounded table-striped border">
      <thead>
        <tr>
          <th>{{ $t("expenseType") }}</th>
          <th>{{ $t("expenseDate") }}</th>
          <th>{{ $t("expensePrice") }}</th>
          <th>{{ $t("desc") }}</th>
          <th>{{ $t("file") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <ExpenseLineItem
          v-for="(item, index) in expenseStore.form.lines"
          :key="index"
          :item="item"
          :index="index"
        />
      </tbody>
    </table>
  </div>
</template>
