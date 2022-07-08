<script setup>
import ExpenseInfoForm from "@/components/Admin/ExpenseList/Add/ExpenseInfoForm.vue";
import ExpenseLines from "@/components/Admin/ExpenseList/Add/ExpenseLines.vue";
import AddUser from "@/components/Admin/ExpenseList/Add/SelectUser.vue";
import MultiStep from "@/components/FormElements/MultiStep.vue";

import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";
import { useExpenseStore } from "@/store/Admin/Expense";

import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const expenseStore = useExpenseStore();
const expenseApi = useExpenseApi();
const pages = [
  {
    id: 1,
    title: "expenseInfo",
  },
  {
    id: 2,
    title: "expenseLines",
  },
  {
    id: 3,
    title: "selectUser",
  },
];

const add = () => {
  expenseApi.addExpense(expenseStore.form, true);
};
</script>
<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="card-title">
        {{ $t("addAttr", { attr: $t("expense") }) }}
      </div>
      <router-link
        :to="{ name: 'expense-list' }"
        class="btn btn-success text-light"
        ><i class="fas fa-arrow-left"></i> {{ $t("goBack") }}</router-link
      >
    </div>
    <div class="card-body">
      <Form @submit="add()">
        <MultiStep :steps="pages">
          <template #page-1>
            <ExpenseInfoForm />
          </template>
          <template #page-2>
            <ExpenseLines />
          </template>
          <template #page-3>
            <AddUser />
          </template>
        </MultiStep>
      </Form>
    </div>
  </div>
</template>
