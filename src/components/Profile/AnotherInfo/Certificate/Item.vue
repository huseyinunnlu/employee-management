<script setup>
// import ProfileApiService from "@/core/services/ApiServices/ProfileApiService";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { defineProps, ref, defineEmits } from "vue";
const profileApi = useProfileApi();
const props = defineProps(["item"]);
const isLoading = ref(false);
const emit = defineEmits(["show"]);

const goDetails = (e) => {
  if (
    e.target.localName != "a" &&
    e.target.localName != "button" &&
    e.target.localName != "i"
  ) {
    emit("show", props.item.id);
  }
};

const deleteItem = () => {
  isLoading.value = true;
  profileApi.deleteCertificate(props.userId, props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.title }}</td>
    <td>{{ props.item.issuer }}</td>
    <td>{{ props.item.giving_date }}</td>
    <td>{{ props.item.finish_date }}</td>
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
