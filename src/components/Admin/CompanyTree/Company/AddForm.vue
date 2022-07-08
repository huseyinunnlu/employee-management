<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { ref } from "vue";

const apiStore = useApiDataStore();
const apiData = useApiData();
const companyStore = useCompanyStore();

const preview = ref(null);

const changePhoto = (data) => {
  preview.value = URL.createObjectURL(data);
  companyStore.form.logo = data;
};
</script>
<template>
  <Select
    name="musteri_id"
    v-model="companyStore.form.musteri_id"
    :label="$t('musteri')"
    rules="required"
    :inline="false"
    :options="apiStore.musteris"
    mainClass="col-md-12 mb-4"
  />
  <div
    v-if="preview"
    class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
  >
    <img :src="preview" style="width: 100px; height: 100px" alt="image" />
    <i
      @click="(companyStore.form.logo = null), (preview = null)"
      class="fas fa-times position-absolute fs-3 p-3 rounded text-daner text-hover-primary cursor-pointer"
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
    v-model="companyStore.form.title"
    :label="$t('companyName')"
    name="title"
    rules="required|max:255"
    :inline="false"
  />
  <Input
    v-model="companyStore.form.email"
    :label="$t('email')"
    name="email"
    rules="required|email|max:255"
    :inline="false"
  />
  <Textarea
    v-model="companyStore.form.address"
    :label="$t('address')"
    name="address"
    rules="required|max:500"
    :inline="false"
    inputType="textarea"
  />
  <div class="row">
    <Select
      v-model="companyStore.form.country_id"
      :label="$t('country')"
      name="country_id"
      rules="required"
      mainClass="col-sm-6 mb-4"
      :inline="false"
      :options="apiStore.countries"
      @selected="apiData.getCities(companyStore.form.country_id)"
    />
    <Select
      v-if="apiStore.cities.length > 0"
      v-model="companyStore.form.city_id"
      :label="$t('city')"
      name="city"
      rules="required"
      mainClass="col-sm-6 mb-4"
      :inline="false"
      :options="apiStore.cities"
    />
  </div>
</template>
