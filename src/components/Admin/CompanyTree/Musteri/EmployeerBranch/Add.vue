<script setup>
import { useMusteriApi } from "@/store/ApiServices/MusteriApi";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const musteriApi = useMusteriApi();

const isLoading = ref(false);
const form = reactive({
  employeer_title: null,
  tax: null,
  tax_no: null,
  website: null,
  workplace_registration_number: null,
  commercial_registration_number: null,
  address: null,
});
const showModal = ref(false);

const add = () => {
  isLoading.value = true;
  musteriApi
    .addEmployeerBranch(route.params.id, form)
    .then(() => {
      form.employeer_title = null;
      form.tax = null;
      form.tax_no = null;
      form.website = null;
      form.workplace_registration_number = null;
      form.commercial_registration_number = null;
      form.address = null;
      showModal.value = false;
    })
    .finally(() => {
      isLoading.value = false;
    });
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
    <CModalHeader>
      <CModalTitle>{{
        $t("addAttr", { attr: $t("employeerBranch") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="add()">
      <CModalBody>
        <Input
          v-model="form.employeer_title"
          :label="$t('employeerBranch')"
          name="employeer_title"
          rules="required|max:255"
          :inline="false"
          mainClass="col-sm-12 mb-4"
        />
        <Input
          v-model="form.tax"
          :label="$t('tax')"
          name="tax"
          rules="required|max:255"
          :inline="false"
          mainClass="col-sm-12 mb-4"
        />
        <Input
          v-model="form.tax_no"
          :label="$t('taxNo')"
          name="taxNo"
          rules="required|max:255"
          :inline="false"
          mainClass="col-sm-12 mb-4"
        />
        <Input
          v-model="form.website"
          :label="$t('website')"
          name="website"
          :inline="false"
          rules="max:255|url"
        />
        <Input
          v-model="form.workplace_registration_number"
          :label="$t('workplaceRegistrationRumber')"
          name="workplace_registration_number"
          :inline="false"
          rules="required|max:255"
        />
        <Input
          v-model="form.commercial_registration_number"
          :label="$t('registrationNo/mersisNo')"
          name="commercial_registration_number"
          :inline="false"
          rules="required|max:255"
        />
        <Textarea
          v-model="form.address"
          :label="$t('address')"
          name="address"
          rules="required|max:500"
          :inline="false"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showModal = false"> Close </CButton>
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
