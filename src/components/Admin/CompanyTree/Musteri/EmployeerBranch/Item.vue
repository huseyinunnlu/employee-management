<script setup>
import { useMusteriApi } from "@/store/ApiServices/MusteriApi";

const musteriApi = useMusteriApi();
import { defineProps, defineEmits, ref } from "vue";
const emit = defineEmits(["show"]);
const props = defineProps(["item"]);
const isLoading = ref(false);
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "button") {
    emit("show", props.item.id);
  }
};
const deleteItem = () => {
  isLoading.value = true;
  musteriApi
    .deleteEmployeerBranch(props.item.musteri_id, props.item.id)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.employeer_title }}</td>
    <td>{{ props.item.tax }}</td>
    <td>{{ props.item.tax_no }}</td>
    <td>{{ props.item.workplace_registration_number }}</td>
    <td>{{ props.item.commercial_registration_number }}</td>
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
