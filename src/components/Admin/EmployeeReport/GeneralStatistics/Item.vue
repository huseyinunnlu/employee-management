<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["item"]);
const router = useRouter();
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "a") {
    router.push({
      name: "profile-index",
      params: {
        slug: props.item.slug,
      },
    });
  }
};
</script>
<template>
  <tr @click="goDetails" class="odd align-items-center cursor-pointer">
    <td>{{ props.item.full_name }}</td>
    <td>{{ props.item.company ? props.item.company.title : "-" }}</td>
    <td>{{ props.item.age }}</td>
    <td>
      <CBadge color="info">
        {{ props.item.role.role }}
      </CBadge>
    </td>
    <td>{{ props.item.age_range }}</td>
  </tr>
</template>
