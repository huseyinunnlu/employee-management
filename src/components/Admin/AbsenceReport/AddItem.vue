<script setup>
import { defineProps, ref } from "vue";
const props = defineProps(["item"]);
const isActive = ref(false);
</script>
<template>
  <tr>
    <td>{{ props.item.full_name }}</td>
    <td>
      <Cbadge color="success"> {{ props.item.role.role }}</Cbadge>
    </td>
    <td>{{ props.item.company }}</td>
    <td>{{ props.item.department }}</td>
    <td>
      <div class="form-check form-switch form-check-custom form-check-solid">
        <input
          v-model="isActive"
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexSwitchDefault"
          @click="$emit('addUser', props.item.user_id)"
        />
        <label class="form-check-label" for="flexSwitchDefault">{{
          isActive ? $t("onVacation") : $t("not")
        }}</label>
      </div>
    </td>
  </tr>
</template>
