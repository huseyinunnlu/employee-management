<script setup>
import { defineProps, computed, ref } from "vue";
const props = defineProps(["item", "index"]);
import { formatCurrency } from "@/core/helpers/StringHelpers";

import { useExpenseStore } from "@/store/Admin/Expense";
import { useApiDataStore } from "@/store/Api/ApiData";
const expenseStore = useExpenseStore();
const apiStore = useApiDataStore();

const getTypeTitle = computed(() => {
  const type = apiStore.expenseTypes.find((type) => {
    return type.id == props.item.type_id;
  });

  return type.title;
});

const getFile = computed(() => {
  if (!props.item.file) {
    return null;
  }

  return {
    url: URL.createObjectURL(props.item.file),
    title: props.item.file.name,
  };
});
</script>

<template>
  <tr>
    <td>{{ getTypeTitle }}</td>
    <td>{{ props.item.date.replaceAll("-", ".") }}</td>
    <td>{{ formatCurrency(props.item.price) }}</td>
    <td>{{ props.item.desc }}</td>
    <td>
      <a v-if="getFile" :href="getFile.url" target="__blank">{{
        getFile.title
      }}</a>
    </td>
    <td>
      <Button
        color="danger"
        icon="fas fa-trash"
        size="sm"
        @handleClick="expenseStore.deleteLine(props.index)"
      />
    </td>
  </tr>
</template>
