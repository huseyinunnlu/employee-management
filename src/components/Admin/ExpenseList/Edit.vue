<script setup>
import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";

import { useExpenseStore } from "@/store/Admin/Expense";
import { useApiDataStore } from "@/store/Api/ApiData";
import { reactive, ref, defineProps, watch } from "vue";
import { useAuthStore } from "@/store/Auth";
import { useRoute } from "vue-router";

const route = useRoute();
const form = reactive({
  status: "pending",
  notes: null,
});

const isLoading = ref(false);

const props = defineProps(["item"]);

const isReady = ref(false);
const apiStore = useApiDataStore();
const expenseApi = useExpenseApi();

const setData = (data) => {
  form.status = data.status;
  form.notes = data.notes;
};

watch(
  props,
  (value) => {
    setData(value.item);
    isReady.value = true;
  },
  { immediate: true }
);

const update = () => {
  isLoading.value = true;

  expenseApi
    .updateExpense(
      props.item.id,
      form,
      route.name == "expense-list" ? true : false
    )
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <div v-if="isReady">
    <Form @submit="update">
      <div v-if="$route.name == 'expense-list'">
        <label class="fs-6 fw-bold form-label mb-3">{{ $t("status") }}</label>
        <div class="d-flex align-items-center mb-4">
          <div class="form-check form-check-custom form-check-solid me-4">
            <input
              class="form-check-input"
              type="radio"
              value="pending"
              v-model="form.status"
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
              v-model="form.status"
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
              v-model="form.status"
              id="rejected"
            />
            <label class="form-check-label" for="rejected">{{
              $t("rejected")
            }}</label>
          </div>
        </div>
      </div>
      <Input
        v-model="form.notes"
        :label="$t('notes')"
        name="notes"
        rules="max:1000"
        inputType="textarea"
        :inline="false"
      />
      <div class="d-flex justify-content-between">
        <div></div>
        <Button
          v-if="$route.name != 'myexpense'"
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
        />
      </div>
    </Form>
  </div>
  <div class="text-center" v-else>
    <div class="spinner-border text-primary my-10" role="status"></div>
  </div>
</template>
