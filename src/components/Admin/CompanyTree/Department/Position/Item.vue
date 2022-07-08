<script setup>
import { useDepartmentApi } from "@/store/ApiServices/DepartmentApi";

import { defineProps, defineEmits, ref } from "vue";
const emit = defineEmits(["show"]);
const props = defineProps(["item"]);
const departmentApi = useDepartmentApi();
const isLoading = ref(false);
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "button") {
    emit("show", props.item.id);
  }
};

const deleteItem = () => {
  isLoading.value = true;
  departmentApi
    .deletePosition(props.item.department.id, props.item.id)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.title }}</td>
    <td class="d-flex flex-column">
      <span v-for="title in props.item.titles" :key="title.id">{{
        `${title.title} (${title.lang_code})`
      }}</span>
    </td>
    <td>{{ props.item.department.title }}</td>
    <td>{{ props.item.created_at }}</td>
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
