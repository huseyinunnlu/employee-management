<script setup>
import ExpenseInfoForm from "@/components/Admin/ExpenseList/Add/ExpenseInfoForm.vue";
import ExpenseLines from "@/components/Admin/ExpenseList/Add/ExpenseLines.vue";
import MultiStep from "@/components/FormElements/MultiStep.vue";
import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";

import { useExpenseStore } from "@/store/Admin/Expense";
import { useAuthStore } from "@/store/Auth";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const authStore = useAuthStore();
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
];
const isLoading = ref(false);
const add = () => {
  isLoading.value = true;
  expenseApi.addExpense(expenseStore.form, false).then(() => {
    isLoading.value = false;
  });
};

onMounted(() => {
  expenseStore.form.company_id = authStore.user.company.id;
  expenseStore.form.user_id = authStore.user.id;
  expenseStore.form.status = "pending";
});
</script>
<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="card-title">
        {{
          $route.name == "expense-request-add"
            ? $t("addAttr", { attr: $t("expenseRequest") })
            : $t("addAttr", { attr: $t("expense") })
        }}
      </div>
      <router-link :to="{ name: 'expense-list' }" class="btn btn-primary"
        ><i class="fas fa-arrow-left"></i>{{ $t("goBack") }}</router-link
      >
    </div>
    <div class="card-body">
      <Form @submit="add()">
        <MultiStep :steps="pages" :isLoading="isLoading">
          <template #page-1>
            <ExpenseInfoForm />
          </template>
          <template #page-2>
            <ExpenseLines />
          </template>
        </MultiStep>
      </Form>
    </div>
  </div>
</template>
