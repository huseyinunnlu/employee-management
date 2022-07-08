<script setup>
import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";
import { formatCurrency } from "@/core/helpers/StringHelpers";

import { defineProps, computed, defineEmits, ref } from "vue";
const props = defineProps(["item"]);
const emit = defineEmits(["show"]);
import { useExpenseStore } from "@/store/Admin/Expense";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useRoute } from "vue-router";
const expenseStore = useExpenseStore();
const apiStore = useApiDataStore();
const expenseApi = useExpenseApi();
const route = useRoute();
const isLoading = ref(false);
const goDetails = (e) => {
  if (
    e.target.localName != "a" &&
    e.target.localName != "i" &&
    e.target.localName != "button"
  ) {
    emit("show", props.item.id);
  }
};
const deleteItem = () => {
  isLoading.value = true;
  expenseApi
    .deleteExpenseLine(
      props.item.expense_id,
      props.item.id,
      route.name == "expense-list" ? true : false
    )
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <tr @click="goDetails">
    <td>{{ props.item.type }}</td>
    <td>{{ props.item.date }}</td>
    <td>
      {{ formatCurrency(props.item.price) }}
    </td>
    <td>{{ props.item.desc }}</td>
    <td>
      <a v-if="props.item.file" :href="props.item.file" target="__blank">{{
        $t("seeFile")
      }}</a>
    </td>
    <td>
      <Button
        :isLoading="isLoading"
        color="danger"
        icon="fas fa-trash"
        size="sm"
        @handleClick="deleteItem"
      />
    </td>
  </tr>
</template>
