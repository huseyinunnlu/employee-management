<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { showModal } from "@/core/helpers/dom";
import { useAuthStore } from "@/store/Auth";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";

const profileApi = useProfileApi();
const authStore = useAuthStore();
const props = defineProps(["item", "userId"]);
const emit = defineEmits(["show"]);
const isLoading = ref(false);
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
  profileApi.deleteDocument(props.userId, props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails" class="cursor-pointer">
    <td>{{ props.item.type_title }}</td>
    <td>
      <a :href="props.item.url" target="__blank" class="text-primary">{{
        props.item.title
      }}</a>
    </td>
    <td>{{ props.item.created_at }}</td>
    <td>
      <Button
        v-if="authStore.role === 1"
        :isLoading="isLoading"
        color="danger"
        icon="fas fa-trash"
        size="sm"
        @handleClick="deleteItem"
      />
    </td>
  </tr>
</template>
