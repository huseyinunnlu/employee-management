<script setup>
import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";
import { defineProps, defineEmits, ref } from "vue";
import { useRoute } from "vue-router";
const props = defineProps(["item"]);
const expenseApi = useExpenseApi();
import { formatCurrency } from "@/core/helpers/StringHelpers";

const isLoading = ref(false);
const emit = defineEmits(["show"]);
const route = useRoute();
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
    .deleteExpense(props.item.id, route.name == "expense-list" ? true : false)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.user.full_name }}</td>
    <td>{{ props.item.created_at }}</td>
    <td>
      {{ formatCurrency(props.item.prices) }}
    </td>
    <td>{{ props.item.user.company }}</td>
    <td>{{ props.item.user.department }}</td>
    <td>
      <CBadge :color="props.item.status_color">{{
        $t(props.item.status)
      }}</CBadge>
    </td>
    <td>{{ props.item.notes }}</td>
    <td>
      <Button
        v-if="props.item.status == 'pending' || $route.name == 'expense-list'"
        :isLoading="isLoading"
        color="danger"
        icon="fas fa-trash"
        size="sm"
        @handleClick="deleteItem"
      />
    </td>
  </tr>
</template>
