<script setup>
import { defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["data"]);

const goDetails = (e) => {
  if (e.target.localName != "a" && e.target.localName != "i") {
    router.push({
      name: "profile-index",
      params: { slug: props.data.slug },
    });
  }
};
</script>
<template>
  <tr @click="goDetails" class="odd align-items-center cursor-pointer">
    <td>{{ props.data.first_name }}</td>
    <td>{{ props.data.last_name }}</td>
    <td>
      <span class="text-success">
        {{ props.data.role.role }}
      </span>
    </td>
    <td>{{ props.data.start_date }}</td>
    <td>{{ props.data.company ? props.data.company.title : "-" }}</td>
    <td>{{ props.data.department ? props.data.department.title : "-" }}</td>
    <td>{{ "Çalışıyor" }}</td>
    <td>
      <router-link
        class="btn btn-info btn-sm text-light"
        :to="{ name: 'employee-edit', params: { id: data.id } }"
      >
        <i class="fas fa-pen"></i>
      </router-link>
    </td>
  </tr>
</template>
