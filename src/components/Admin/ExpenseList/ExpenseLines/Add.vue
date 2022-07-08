<script setup>
import { onMounted, reactive, ref, defineProps } from "vue";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";

import { useExpenseApi } from "@/store/ApiServices/ExpenseApi";
import { useRoute } from "vue-router";

const route = useRoute();
const apiData = useApiData();
const apiStore = useApiDataStore();
const expenseApi = useExpenseApi();
const isReady = ref(false);
const isLoading = ref(false);
const showModal = ref(false);

const props = defineProps(["companyId", "expenseId"]);

const form = reactive({
  type_id: null,
  date: null,
  price: null,
  desc: null,
  file: null,
});
onMounted(async () => {
  if (apiStore.expenseTypes.length < 1 && props.companyId) {
    await apiData.getExpenseTypes(props.companyId);
  }

  isReady.value = true;
});

const changeFile = (data) => {
  form.file = data;
};

const clearInputs = () => {
  form.type_id = null;
  form.date = null;
  form.price = null;
  form.desc = null;
  form.file = null;
};

const add = async () => {
  isLoading.value = true;
  await expenseApi
    .addExpenseLine(
      props.expenseId,
      form,
      route.name == "expense-line" ? true : false
    )
    .finally(() => {
      isLoading.value = false;
    });

  await clearInputs();
  showModal.value = false;
};
</script>
<template>
  <Button
    color="success"
    @handleClick="showModal = true"
    text="add"
    icon="fas fa-plus"
  />

  <CModal :visible="showModal" @close="showModal = false">
    <Form @submit="add()">
      <CModalHeader>
        <CModalTitle>{{ $t("addAttr", { attr: "expenseLine" }) }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div v-if="isReady">
          <Select
            v-model="form.type_id"
            name="type_id"
            :label="$t('expenseType')"
            rules="required"
            :inline="false"
            :options="apiStore.expenseTypes"
            mainClass="mb-4"
          />
          <DateInput
            v-model="form.date"
            :label="$t('expenseDate')"
            name="date"
            rules="required"
            :inline="false"
            mainClass="mb-4"
          />
          <CurrencyInput
            v-model="form.price"
            :label="$t('expensePrice')"
            name="expense_price"
            rules="required|max:15"
            :inline="false"
            mainClass="mb-4"
          />

          <Textarea
            v-model="form.desc"
            :label="$t('desc')"
            name="desc"
            rules="max:500"
            :inline="false"
            mainClass="mb-4"
          />
          <FileInput
            :label="$t('file')"
            name="file"
            :inline="false"
            @handleUpdate="changeFile"
            mainClass="mb-4"
            rules="size:2048|mimes:png,jpg,jpeg,bmp,webp,pdf,doc,docx,slsx"
          />
        </div>
        <div class="text-center align-items-center py-5" v-else>
          <CSpinner color="success" />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showModal = false">
          {{ $t("close") }}
        </CButton>
        <Button :isLoading="isLoading" text="add" icon="fas fa-floppy-disk" />
      </CModalFooter>
    </Form>
  </CModal>
</template>
