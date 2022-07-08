<script setup>
import { defineProps, ref } from "vue";
import { useAuthStore } from "@/store/Auth";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { maska } from "maska";
const isLoading = ref(false);

const profileApi = useProfileApi();
const props = defineProps(["item", "userId"]);
const authStore = useAuthStore();
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
  profileApi.deleteReport(props.userId, props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails" class="cursor-pointer">
    <td>
      <a :href="props.item.url" target="__blank" class="text-primary">{{
        props.item.title
      }}</a>
    </td>
    <td>{{ props.item.date }}</td>
    <td>{{ props.item.issuer }}</td>
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
