<script setup>
import { useReportApi } from "@/store/ApiServices/ReportApi";

import { defineProps, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const props = defineProps(["item"]);
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const deleteItem = () => {
  isLoading.value = true;
  reportApi
    .deleteDocument(props.item.id, props.item.file.file_id)
    .finally(() => {
      isLoading.value = false;
    });
};
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
const addDocument = () => {
  router.push({
    name: "profile-documents",
    params: { slug: props.item.slug },
    query: {
      type_id: route.query.type_id || null,
      target_id: "document_add",
    },
  });
};

const goDocumentDetail = () => {
  router.push({
    name: "profile-documents",
    params: { slug: props.item.slug },
    query: {
      item_id: props.item.file.file_id,
      target_id: "document_edit",
    },
  });
};
</script>
<template>
  <tr @click="goDetails" class="odd align-items-center cursor-pointer">
    <td>{{ props.item.full_name }}</td>
    <td>{{ props.item.company }}</td>
    <td>{{ props.item.department }}</td>
    <td>
      <a :href="props.item.file.file">{{ props.item.file.title }}</a>
    </td>
    <td>{{ props.item.file.type }}</td>
    <td>{{ props.item.file.created_at }}</td>

    <td class="d-flex align-items-center">
      <Button
        :color="props.item.file.is_have ? 'info' : 'success'"
        :icon="props.item.file.is_have ? 'fas fa-eye' : 'fas fa-plus'"
        size="sm"
        @handleClick="
          props.item.file.is_have ? goDocumentDetail() : addDocument()
        "
      />
    </td>
  </tr>
</template>
