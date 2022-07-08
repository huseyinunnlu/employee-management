<script setup>
import { useMusteriApi } from "@/store/ApiServices/MusteriApi";
import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { onMounted, reactive, ref } from "vue";

const musteriStore = useMusteriStore();
const musteriApi = useMusteriApi();
const isLoading = ref(false);
const form = reactive({
  title: null,
  address: null,
  zipcode: null,
  phone: null,
  fax: null,
  email: null,
  tax: null,
  tax_no: null,
  website: null,
  workplace_registration_number: null,
  registration_no: null,
  iban: null,
});

onMounted(() => {
  Object.entries(musteriStore.musteri).forEach((item) => {
    form[item[0]] = item[1];
  });
});

const update = () => {
  isLoading.value = true;
  musteriApi.update(musteriStore.musteri.id, form).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <Form @submit="update()">
    <div class="row">
      <Input
        v-model="form.title"
        :label="$t('title')"
        name="title"
        rules="required|max:255"
        :inline="false"
      />
      <Input
        v-model="form.address"
        :label="$t('address')"
        name="address"
        rules="max:500"
        :inline="false"
        inputType="textarea"
      />
      <Input
        v-model="form.zipcode"
        :label="$t('zipcode')"
        name="zipcode"
        rules="max:500"
        :inline="false"
        inputType="number"
      />
      <Input
        v-model="form.phone"
        :label="$t('phone')"
        name="phone"
        rules="max:500"
        :inline="false"
        :isMask="true"
        mask="+90(###) ### ## ##"
      />
      <Input
        v-model="form.fax"
        :label="$t('fax')"
        name="fax"
        rules="max:500"
        :inline="false"
        :isMask="true"
        mask="+90-###-### ####"
      />
      <Input
        v-model="form.email"
        :label="$t('email')"
        name="email"
        :inline="false"
        rules="email"
      />
      <Input
        v-model="form.tax"
        :label="$t('tax')"
        name="tax"
        :inline="false"
        rules="max:255"
        mainClass="col-sm-6"
      />
      <Input
        v-model="form.tax_no"
        :label="$t('taxNo')"
        name="tax_no"
        :inline="false"
        rules="max:255"
        mainClass="col-sm-6"
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
        rules="max:255"
      />
      <Input
        v-model="form.registration_no"
        :label="$t('registrationNo')"
        name="registration_no"
        :inline="false"
        rules="max:255"
      />
      <Input
        v-model="form.iban"
        :label="$t('iban')"
        name="iban"
        mainClass="mb-4"
        :inline="false"
        :isMask="true"
        mask="TR## #### #### #### #### #### ##"
      />
    </div>
    <Button
      :isLoading="isLoading"
      text="update"
      loadingText="updating"
      icon="fas fa-floppy-disk"
    />
  </Form>
</template>
