<script setup>
import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isLoading = ref(false);
const addModal = ref(false);
const companyApi = useCompanyApi();
const form = reactive({
  title: null,
});

const add = () => {
  isLoading.value = true;
  companyApi
    .addExpenseType(route.params.id, form)
    .then(() => {
      form.title = null;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Button
    color="success"
    @handleClick="addModal = true"
    text="add"
    icon="fas fa-plus"
  />
  <CModal :visible="addModal" @close="addModal = false">
    <Form @submit="add()">
      <CModalHeader>
        <CModalTitle>{{
          $t("addAttr", { attr: $t("expenseType") })
        }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Input
          v-model="form.title"
          :label="$t('expenseType')"
          name="title"
          rules="required|max:255"
          :inline="false"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="addModal = false"> Close </CButton>
        <Button
          :isLoading="isLoading"
          text="add"
          loadingText="adding"
          icon="fas fa-floppy-disk"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
