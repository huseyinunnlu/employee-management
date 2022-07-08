<script setup>
import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, reactive, ref } from "vue";

const companyStore = useCompanyStore();
const companyApi = useCompanyApi();
const apiStore = useApiDataStore();
const apiData = useApiData();
const isLoading = ref(false);
const isReady = ref(false);
const form = reactive({
  logo: null,
  title: null,
  address: null,
  email: null,
  city_id: null,
  country_id: null,
});

const preview = ref(null);

onMounted(async () => {
  await apiData.getCountries();
  await setData(companyStore.company);

  isReady.value = true;
});

const setData = (value) => {
  form.logo = value.logo;
  form.title = value.title;
  form.address = value.address;
  form.email = value.email;
  form.city_id = value.city_id;
  form.country_id = value.country_id;
  preview.value = value.logo;
};

const changePhoto = (data) => {
  preview.value = URL.createObjectURL(data);
  form.logo = data;
};

const update = () => {
  isLoading.value = true;
  companyApi.update(companyStore.company.id, form).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <Form @submit="update()">
    <div v-if="isReady">
      <div v-if="preview">
        <img style="width: 100px; height: 100px" :src="preview" alt="image" />
        <i
          @click="(form.logo = null), (preview = null)"
          class="fas fa-times position-absolute rounded text-daner text-hover-primary cursor-pointer"
        ></i>
      </div>

      <FileInput
        :label="$t('logo')"
        name="logo"
        :inline="false"
        @handleUpdate="changePhoto"
        mainClass="col-sm-12 mb-4"
        rules="image|size:2048"
      />
      <Input
        v-model="form.title"
        :label="$t('companyName')"
        name="title"
        rules="required|max:255"
        :inline="false"
      />
      <Input
        v-model="form.email"
        :label="$t('email')"
        name="email"
        rules="required|email|max:255"
        :inline="false"
      />
      <Input
        v-model="form.address"
        :label="$t('address')"
        name="address"
        rules="required|max:500"
        :inline="false"
        inputType="textarea"
      />
      <div class="row">
        <Select
          v-model="form.country_id"
          :label="$t('country')"
          name="country_id"
          rules="required"
          mainClass="col-sm-6 mb-4"
          :inline="false"
          :options="apiStore.countries"
          @selected="apiData.getCities(form.country_id)"
        />
        <Select
          v-model="form.city_id"
          :label="$t('city')"
          name="city"
          rules="required"
          mainClass="col-sm-6 mb-4"
          :inline="false"
          :options="apiStore.cities"
        />
      </div>
    </div>
    <div class="text-center align-items-center py-5" v-else>
      <CSpinner color="success" />
    </div>
    <Button
      :isLoading="isLoading"
      text="update"
      loadingText="updating"
      icon="fas fa-floppy-disk"
    />
  </Form>
</template>
