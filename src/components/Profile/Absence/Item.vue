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
  profileApi.deleteAbsence(props.userId, props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails" class="cursor-pointer">
    <td>{{ props.item.type.title }}</td>
    <td v-html="props.item.date"></td>
    <td>
      {{
        props.item.day_count != 0.5
          ? props.item.day_count
          : $t(props.item.day_type)
      }}
    </td>
    <td class="fw-bold" :class="props.item.status.color">
      {{ $t(props.item.status.text) }}
    </td>
    <td>{{ maska(props.item.phone, "+90(###) ### ## ##") }}</td>
    <td>{{ props.item.place }}</td>
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
