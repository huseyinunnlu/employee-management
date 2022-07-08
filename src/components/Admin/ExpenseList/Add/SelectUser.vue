<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";

import { useExpenseStore } from "@/store/Admin/Expense";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, ref } from "vue";

const expenseStore = useExpenseStore();
const apiDataStore = useApiDataStore();
const apiData = useApiData();

const isReady = ref(false);
onMounted(async () => {
  await apiData.getUsers({ company_id: expenseStore.form.company_id });
  isReady.value = true;
});
</script>
<template>
  <div class="row" v-if="isReady">
    <table class="table table-hover table-rounded table-striped">
      <thead>
        <tr>
          <th>{{ $t("profilePhoto") }}</th>
          <th>{{ $t("fullName") }}</th>
          <th>{{ $t("role") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in apiDataStore.users" :key="user.id">
          <td>
            <div class="symbol rounded me-5">
              <img
                alt="Logo"
                :src="user.photo"
                style="width: 50px; height: 50px"
              />
            </div>
          </td>
          <td>{{ user.full_name }}</td>
          <td>
            <CBadge color="success" shape="rounded-pill">{{
              user.role.role
            }}</CBadge>
          </td>
          <td>
            <div class="mb-10">
              <label class="form-check form-check-custom">
                <input
                  v-model="expenseStore.form.user_id"
                  class="form-check-input"
                  type="radio"
                  :value="user.id"
                />
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text-center align-items-center py-5" v-else>
    <CSpinner color="success" />
  </div>
</template>
