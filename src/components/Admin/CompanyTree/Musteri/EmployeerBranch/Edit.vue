<script setup>
import { useMusteriApi } from "@/store/ApiServices/MusteriApi";
import { useMusteriStore } from "@/store/Admin/Company/Musteri";

import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["selectedId", "showModal"]);

const route = useRoute();
const musteriStore = useMusteriStore();
const musteriApi = useMusteriApi();
const showModal = ref(false);
const emit = defineEmits(["closeModal"]);
const isLoading = ref(false);
const form = reactive({
  employeer_title: null,
  tax: null,
  tax_no: null,
  website: null,
  workplace_registration_number: null,
  commercial_registration_number: null,
  address: null,
  phone: null,
});

const setData = (value) => {
  form.employeer_title = value.employeer_title;
  form.tax = value.tax;
  form.tax_no = value.tax_no;
  form.website = value.website;
  form.workplace_registration_number = value.workplace_registration_number;
  form.commercial_registration_number = value.commercial_registration_number;
  form.address = value.address;
};

const selectedData = computed(() => {
  return props.selectedId;
});

watch(selectedData, (value) => {
  const selectedValue = musteriStore.employeerBranch.find((item) => {
    return item.id == value;
  });

  setData(selectedValue);
});

const update = () => {
  isLoading.value = true;
  musteriApi
    .updateEmployeerBranch(route.params.id, props.selectedId, form)
    .then(() => {
      emit("closeModal");
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <CModal :visible="props.showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>
        {{ $t("editAttr", { attr: $t("employeerBranch") }) }}
      </CModalTitle>
    </CModalHeader>
    <Form @submit="update">
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
        <CButton color="secondary" @click="$emit('closeModal')">
          Close
        </CButton>
        <Button
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
