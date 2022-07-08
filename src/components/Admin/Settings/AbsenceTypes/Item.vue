<script setup>
import { useAbsenceTypeApi } from "@/store/ApiServices/AbsenceTypeApi";

import { defineProps, defineEmits, ref } from "vue";
const absenceTypeApi = useAbsenceTypeApi();
const emit = defineEmits(["show"]);
const props = defineProps(["item"]);
const isLoading = ref(false);
const goDetails = (e) => {
  if (e.target.localName != "i") {
    emit("show", props.item.id);
  }
};

const deleteItem = () => {
  isLoading.value = true;
  absenceTypeApi.deleteAbsenceType(props.item.id).finally(() => {
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
    <td>{{ props.item.created_at }}</td>
    <td>
      <Button
        :isLoading="isLoading"
        @handleClick="deleteItem"
        size="sm"
        color="danger"
        icon="fas fa-trash"
      />
    </td>
  </tr>
</template>
