<script setup>
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
const profileApi = useProfileApi();
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps(["item", "userId"]);
const isLoading = ref(false);
const emit = defineEmits(["show"]);
const deleteItem = (id) => {
  isLoading.value = true;
  profileApi.deleteForeignLanguage(props.userId, id).then(() => {
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
    <td>{{ props.item.language }}</td>
    <td>{{ $t(props.item.status) }}</td>
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
