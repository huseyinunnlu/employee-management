<script setup>
import { useReportApi } from "@/store/ApiServices/ReportApi";
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["item"]);
const reportApi = useReportApi();
const router = useRouter();
const isLoading = ref(false);
const goDetails = (e) => {
  if (
    e.target.localName != "i" &&
    e.target.localName != "a" &&
    e.target.localName != "button"
  ) {
    router.push({
      name: "profile-absences",
      params: {
        slug: props.item.user.slug,
      },
      query: {
        target_id: "absence_edit",
        selected_id: props.item.id,
      },
    });
  }
};
const deleteItem = () => {
  isLoading.value = true;
  reportApi.deleteAbsence(props.item.user_id, props.item.id).finally(() => {
    isLoading.value = true;
  });
};
</script>
<template>
  <tr @click="goDetails" class="odd align-items-center cursor-pointer">
    <td>{{ props.item.user.full_name }}</td>
    <td>{{ props.item.user.company }}</td>
    <td>{{ props.item.user.department }}</td>
    <td>{{ props.item.type.title }}</td>
    <td v-html="props.item.date"></td>
    <td class="fw-bold" :class="props.item.status.color">
      {{ $t(props.item.status.text) }}
    </td>
    <td>
      {{
        props.item.day_count != 0.5
          ? props.item.day_count
          : $t(props.item.day_type)
      }}
    </td>
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
