<script setup>
import { onMounted, reactive, ref } from "vue";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const apiData = useApiData();
const apiStore = useApiDataStore();
const form = reactive({
  user_id: route.params.id || null,
});
const isReady = ref(false);
const selectedUser = reactive({});
onMounted(async () => {
  await apiData.getUsers();
  selectedUser.value = apiStore.users.find(
    (item) => item.id == route.params.id
  );

  isReady.value = true;
});
const filterUser = () => {
  if (form.user_id) {
    router.push({
      name: "employee-edit",
      params: { id: form.user_id },
    });
  } else {
    router.push({
      name: "employees-add",
    });
  }
};
</script>
<template>
  <div class="card-header p-0">
    <select
      class="form-select form-select-solid"
      aria-label="Select example"
      v-model="form.user_id"
      @change="filterUser"
    >
      <option :value="null">{{ $t("addEmployee") }}</option>
      <option :value="user.id" v-for="user in apiStore.users" :key="user.id">
        {{ user.full_name }}
      </option>
    </select>
  </div>
  <div class="card-body">
    <div
      class="div d-flex flex-column p-1"
      v-if="selectedUser.value && isReady"
    >
      <h4 class="text-center mb-2">{{ selectedUser.value.full_name }}</h4>
      <img
        :src="selectedUser.value.photo"
        alt="avatar"
        class="w-100 h-auto border"
      />
    </div>
    <div class="text-center align-items-center py-5" v-if="!isReady">
      <CSpinner color="success" />
    </div>
  </div>
</template>
