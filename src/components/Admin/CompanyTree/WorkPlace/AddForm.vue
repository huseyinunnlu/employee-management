<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";

const apiStore = useApiDataStore();
const apiData = useApiData();
const workPlaceStore = useWorkPlaceStore();
</script>
<template>
  <div class="row">
    <Input
      v-model="workPlaceStore.form.title"
      :label="$t('workPlace')"
      name="title"
      rules="required|max:255"
      :inline="false"
    />
    <Select
      v-model="workPlaceStore.form.country_id"
      :label="$t('country')"
      name="country_id"
      rules="required"
      mainClass="col-sm-6 mb-4"
      :inline="false"
      :options="apiStore.countries"
      @selected="apiData.getCities(workPlaceStore.form.country_id)"
    />
    <Select
      v-model="workPlaceStore.form.city_id"
      :label="$t('city')"
      name="city"
      rules="required"
      mainClass="col-sm-6 mb-4"
      :inline="false"
      :options="apiStore.cities"
    />

    <Select
      name="musteri_id"
      v-model="workPlaceStore.form.musteri_id"
      :label="$t('musteri')"
      rules="required"
      :inline="false"
      :options="apiStore.musteris"
      @selected="apiData.getCompanies(workPlaceStore.form.musteri_id)"
      mainClass="col-md-6"
    />
    <Select
      v-model="workPlaceStore.form.company_id"
      name="company_id"
      :label="$t('company')"
      rules="required"
      :inline="false"
      :options="apiStore.companies"
      @selected="apiData.getDepartments(workPlaceStore.form.company_id)"
      mainClass="col-md-6"
    />
    <Select
      v-model="workPlaceStore.form.department_id"
      name="department_id"
      :label="$t('department')"
      :inline="false"
      :options="apiStore.departments"
      @selected="apiData.getPositions(workPlaceStore.form.company_id)"
      mainClass="col-md-6"
    />
    <Input
      v-model="workPlaceStore.form.email"
      name="email"
      :label="$t('email')"
      :inline="false"
      rules="email|max:255"
      mainClass="form-group col-md-12 my-4"
    />
  </div>
</template>
