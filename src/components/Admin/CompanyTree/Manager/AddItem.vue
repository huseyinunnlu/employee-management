<script setup>
import { defineProps, ref } from "vue";
const props = defineProps(["item"]);
const isActive = ref(false);
</script>
<template>
  <tr>
    <td>{{ props.item.full_name }}</td>
    <td>
      <CBadge color="info">
        {{ props.item.role.role }}
      </CBadge>
    </td>
    <td>
      <div class="form-check form-switch form-check-custom form-check-solid">
        <input
          v-model="isActive"
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexSwitchDefault"
          @click="$emit('addUser', props.item.id)"
        />
        <label class="form-check-label" for="flexSwitchDefault">{{
          isActive ? $t("authorized") : $t("unAuthorized")
        }}</label>
      </div>
    </td>
  </tr>
</template>
