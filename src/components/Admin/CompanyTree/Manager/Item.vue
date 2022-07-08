<script setup>
import { useTreeApi } from "@/store/ApiServices/TreeApi";

import { defineProps, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const treeApi = useTreeApi();
const props = defineProps(["item"]);
const isLoading = ref(false);
const goDetails = (e) => {
  if (
    e.target.localName != "i" &&
    e.target.localName != "a" &&
    e.target.localName != "button"
  ) {
    router.push({
      name: "profile-index",
      params: {
        slug: props.item.slug,
      },
    });
  }
};

const deleteItem = () => {
  isLoading.value = true;
  treeApi.deleteManager(props.item.id).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <tr @click="goDetails" class="odd align-items-center cursor-pointer">
    <td>{{ props.item.first_name }}</td>
    <td>{{ props.item.last_name }}</td>
    <td>
      <Cbadge color="success"> {{ props.item.role.role }}</Cbadge>
    </td>
    <td>{{ props.item.start_date }}</td>
    <td>{{ props.item.company ? props.item.company.title : "-" }}</td>
    <td>{{ props.item.department ? props.item.department.title : "-" }}</td>
    <td>{{ $t("working") }}</td>
    <td class="d-flex gap-2">
      <Button
        :isLoading="isLoading"
        color="info"
        icon="fas fa-pen"
        size="sm"
        @handleClick="
          $router.push({ name: 'employee-edit', params: { id: item.id } })
        "
      />
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
