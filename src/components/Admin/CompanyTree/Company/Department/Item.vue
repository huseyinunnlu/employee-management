<script setup>
import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { defineProps, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["item"]);
const router = useRouter();
const treeApi = useTreeApi();
const isLoading = ref(false);
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "button") {
    router.push(`/admin/tree/department/${props.item.id}`);
  }
};

const deleteItem = () => {
  isLoading.value = true;
  treeApi.deleteCompany(props.item.id, "Department").finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.title }}</td>
    <td>{{ props.item.company.title }}</td>
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
