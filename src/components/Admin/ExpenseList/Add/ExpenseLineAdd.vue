<script setup>
import { hideModal } from "@/core/helpers/dom";

import { onMounted, reactive, ref } from "vue";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";

import { useExpenseStore } from "@/store/Admin/Expense";

const apiStore = useApiDataStore();
const expenseStore = useExpenseStore();
const apiData = useApiData();
const isReady = ref(false);
const showModal = ref(false);

const form = reactive({
  type_id: null,
  date: null,
  price: null,
  desc: null,
  file: null,
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
  await expenseStore.form.lines.push({
    type_id: form.type_id,
    date: form.date,
    price: form.price,
    desc: form.desc,
    file: form.file,
  });

  await clearInputs();
  showModal.value = false;
};
</script>
<template>
  <Button
    type="button"
    color="success"
    @handleClick="showModal = true"
    text="addExpenseLine"
    icon="fas fa-plus"
  />

  <CModal :visible="showModal" @close="showModal = false">
    <Form @submit="add()">
      <CModalHeader>
        <CModalTitle>{{
          $t("addAttr", { attr: $t("expenseLine") })
        }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
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
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showModal = false"> Close </CButton>
        <Button text="add" icon="fas fa-floppy-disk" />
      </CModalFooter>
    </Form>
  </CModal>
</template>
