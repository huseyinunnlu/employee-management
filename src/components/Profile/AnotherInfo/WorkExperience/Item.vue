<script setup>
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
const profileApi = useProfileApi();
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps(["item", "userId"]);
const isLoading = ref(false);
const emit = defineEmits(["show"]);
const deleteItem = (id) => {
  isLoading.value = true;
  profileApi.deleteWorkExperience(props.userId, id).then(() => {
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
    <td>{{ props.item.work_place_name }}</td>
    <td>{{ props.item.experience }}</td>
    <td>{{ props.item.start_date }}</td>
    <td>{{ props.item.leave_date }}</td>
    <td>{{ props.item.leave_reason }}</td>
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
