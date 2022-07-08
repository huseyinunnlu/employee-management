<script setup>
import { useAuthApi } from "@/store/ApiServices/Auth";
import { ref } from "vue";

const isLoading = ref(false);
const authApi = useAuthApi();
const signOut = () => {
  isLoading.value = true;
  authApi.signOut().finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <CDropdownItem
    @click="signOut"
    :disabled="isLoading"
    class="fw-semibold py-2 fs-6 d-flex gap-2 align-items-center"
  >
    <i class="fas fa-lock"></i>
    {{ $t(isLoading ? "signingOut" : "signOut") }}
  </CDropdownItem>
</template>
