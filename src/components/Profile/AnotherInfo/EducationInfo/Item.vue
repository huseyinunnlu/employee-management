<script setup>
// import Edit from "@/components/Profile/AnotherInfo/EducationInfo/Edit.vue";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useProfileStore } from "@/store/Profile";
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps(["item", "userId"]);

const profileApi = useProfileApi();
const profileStore = useProfileStore();
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

const deleteItem = (id) => {
  isLoading.value = true;
  profileApi.deleteEducationInfo(profileStore.profile.id, id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails">
    <td>
      <a :href="props.item.url" target="__blank" class="text-primary">{{
        props.item.title
      }}</a>
    </td>
    <td>{{ $t(props.item.status) }}</td>
    <td>{{ props.item.graduated_school }}</td>
    <td>{{ props.item.department }}</td>
    <td>{{ props.item.certificate_grade }}</td>
    <td>{{ props.item.start_year }}</td>
    <td>{{ props.item.finish_year }}</td>
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
