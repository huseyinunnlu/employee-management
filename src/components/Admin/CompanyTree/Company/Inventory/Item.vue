<script setup>
import { useCompanyApi } from "@/store/ApiServices/CompanyApi";

const companyApi = useCompanyApi();
import { defineProps, defineEmits, ref } from "vue";
import { useRoute } from "vue-router";
const emit = defineEmits(["show"]);
const props = defineProps(["item"]);
const isLoading = ref(false);
const route = useRoute();
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "button") {
    emit("show", props.item.id);
  }
};

const deleteItem = () => {
  isLoading.value = true;
  companyApi.deleteInventory(route.params.id, props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.title }}</td>
    <td>{{ props.item.type.title }}</td>
    <td>{{ props.item.serial }}</td>
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
