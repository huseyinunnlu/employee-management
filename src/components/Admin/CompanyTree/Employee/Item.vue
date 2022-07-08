<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["item"]);
const goDetails = (e) => {
  if (e.target.localName != "i" && e.target.localName != "button") {
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
    <td>{{ props.item.first_name }}</td>
    <td>{{ props.item.last_name }}</td>
    <td>
      <CBadge color="info">
        {{ props.item.role.role }}
      </CBadge>
    </td>
    <td>{{ props.item.start_date }}</td>
    <td>{{ props.item.company ? props.item.company.title : "-" }}</td>
    <td>{{ props.item.department ? props.item.department.title : "-" }}</td>
    <td>{{ $t("working") }}</td>
    <td>
      <Button
        color="info"
        icon="fas fa-pen"
        size="sm"
        @handleClick="
          $router.push({ name: 'employee-edit', params: { id: item.id } })
        "
      />
    </td>
  </tr>
</template>
