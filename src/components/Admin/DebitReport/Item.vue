<script setup>
import { useReportApi } from "@/store/ApiServices/ReportApi";

import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["item"]);
const router = useRouter();
const reportApi = useReportApi();
const isLoading = ref(false);
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "a") {
    router.push({
      name: "profile-debits",
      params: {
        slug: props.item.user.slug,
      },
      query: {
        target_id: "debit_edit",
        selected_id: props.item.id,
      },
    });
  }
};

const deleteItem = () => {
  isLoading.value = true;
  reportApi.deleteDebit(props.item.user.id, props.item.id).finally(() => {
    isLoading.value = true;
  });
};
</script>
<template>
  <tr @click="goDetails" class="odd align-items-center cursor-pointer">
    <td>{{ props.item.user.full_name }}</td>
    <td>{{ props.item.user.company }}</td>
    <td>{{ props.item.user.department }}</td>
    <td>{{ props.item.inventory.type }}</td>
    <td>{{ props.item.inventory.title }}</td>
    <td>{{ props.item.inventory.serie }}</td>
    <td>{{ $t(props.item.status) }}</td>
    <td>{{ props.item.date }}</td>

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
