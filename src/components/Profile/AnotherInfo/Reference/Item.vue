<script setup>
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { mask } from "maska";

const profileApi = useProfileApi();
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps(["item", "userId"]);
const isLoading = ref(false);
const emit = defineEmits(["show"]);
const deleteItem = (id) => {
  isLoading.value = true;
  profileApi.deleteReference(props.userId, id).then(() => {
    isLoading.value = false;
  });
};

const goDetails = (e) => {
  if (
    e.target.localName != "a" &&
    e.target.localName != "button" &&
    e.target.localName != "i"
  ) {
    emit("show", props.item.id);
  }
};
</script>
<template>
  <tr @click="goDetails">
    <td>{{ props.item.full_name }}</td>
    <td>{{ props.item.work_place_name }}</td>
    <td>{{ props.item.experience }}</td>
    <td>{{ mask(props.item.phone, "+90(###) ### ## ##") }}</td>
    <td>
      <Button
        :isLoading="isLoading"
        color="danger"
        icon="fas fa-trash"
        size="sm"
        @handleClick="deleteItem(props.item.id)"
      />
    </td>
  </tr>
</template>
