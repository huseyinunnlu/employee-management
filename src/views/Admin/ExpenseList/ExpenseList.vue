<script setup>
import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";
import { onBeforeMount } from "vue";
import List from "@/components/Admin/ExpenseList/List.vue";
import Filter from "@/components/Admin/ExpenseList/Filter.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const expenseApi = useExpenseApi();
onBeforeMount(() => {
  const query = route.query;
  expenseApi.get(query).catch(() => {
    router.push("/dashboard");
  });
});
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="card-title">
        {{ $t("expenseList") }}
      </h4>
      <div class="d-flex ml-auto">
        <router-link
          :to="{ name: 'expense-add' }"
          class="btn btn-success text-light me-2"
          ><i class="fas fa-plus"></i>
          {{ $t("addAttr", { attr: $t("expense") }) }}</router-link
        >
        <Filter />
      </div>
    </div>
    <div class="card-body">
      <List />
    </div>
  </div>
</template>
