<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useExpenseStore } from "@/store/Admin/Expense";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const expenseStore = useExpenseStore();
const isReady = ref(false);
const route = useRoute();
const apiStore = useApiDataStore();
const apiData = useApiData();
onMounted(async () => {
  if (apiStore.companies.length < 1 && route.name == "expense-add") {
    await apiData.getCompanies(1);
  } else {
    await apiData.getExpenseTypes(expenseStore.form.company_id);
  }

  isReady.value = true;
});
</script>
<template>
  <div class="row" v-if="isReady">
    <Select
      v-if="$route.name == 'expense-add'"
      v-model="expenseStore.form.company_id"
      name="company_id"
      :label="$t('company')"
      rules="required"
      :inline="false"
      :options="apiStore.companies"
      mainClass="col-sm-6"
      @selected="apiData.getExpenseTypes(expenseStore.form.company_id)"
    />
    <div class="col-sm-6" v-if="$route.name == 'expense-add'">
      <label class="fs-6 fw-bold form-label mb-3">{{ $t("status") }}</label>
      <div class="d-flex align-items-center mb-4">
        <div class="form-check form-check-custom form-check-solid me-4">
          <input
            class="form-check-input"
            type="radio"
            value="pending"
            v-model="expenseStore.form.status"
            id="pending"
          />
          <label class="form-check-label" for="pending">{{
            $t("pending")
          }}</label>
        </div>
        <div class="form-check form-check-custom form-check-solid">
          <input
            class="form-check-input"
            type="radio"
            value="accepted"
            v-model="expenseStore.form.status"
            id="accepted"
          />
          <label class="form-check-label" for="accepted">{{
            $t("accepted")
          }}</label>
        </div>
        <div class="form-check form-check-custom form-check-solid">
          <input
            class="form-check-input"
            type="radio"
            value="rejected"
            v-model="expenseStore.form.status"
            id="rejected"
          />
          <label class="form-check-label" for="rejected">{{
            $t("rejected")
          }}</label>
        </div>
      </div>
    </div>
    <Textarea
      v-model="expenseStore.form.notes"
      :label="$t('notes')"
      name="notes"
      rules="max:1000"
      :inline="false"
    />
  </div>
  <div class="text-center align-items-center py-5" v-else>
    <CSpinner color="success" />
  </div>
</template>
