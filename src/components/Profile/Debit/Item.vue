<script setup>
import { defineProps, ref } from "vue";
import { useAuthStore } from "@/store/Auth";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
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
  profileApi.deleteDebit(props.userId, props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails" class="cursor-pointer">
    <td>{{ props.item.inventory.type.title }}</td>
    <td>{{ props.item.inventory.title }}</td>
    <td>{{ props.item.inventory.serial }}</td>
    <td>{{ $t(props.item.status) }}</td>
    <td>{{ props.item.date }}</td>
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
