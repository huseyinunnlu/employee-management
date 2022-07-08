<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useWorkPlaceApi } from "@/store/ApiServices/WorkPlaceApi";
import { useWorkPlaceStore } from "@/store/Admin/Company/WorkPlace";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, reactive, ref } from "vue";

const workPlaceStore = useWorkPlaceStore();
const apiStore = useApiDataStore();
const apiData = useApiData();
const workPlaceApi = useWorkPlaceApi();
const isLoading = ref(false);
const isReady = ref(false);
const form = reactive({
  title: null,
  country_id: null,
  city_id: null,
  email: null,
});

onMounted(async () => {
  await apiData.getCountries();
  await setData(workPlaceStore.workPlace);

  isReady.value = true;
});

const setData = (value) => {
  form.title = value.title;
  form.email = value.email;
  form.city_id = value.city.id;
  form.country_id = value.city.country_id;
};

const update = () => {
  isLoading.value = true;
  workPlaceApi.update(workPlaceStore.workPlace.id, form).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <Form @submit="update()">
    <div v-if="isReady">
      <Input
        v-model="form.title"
        :label="$t('workPlace')"
        name="title"
        rules="required|max:255"
        :inline="false"
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

      <Input
        v-model="form.email"
        name="email"
        :label="$t('email')"
        :inline="false"
        rules="email|max:255"
        mainClass="form-group col-md-12 my-4"
      />
      <Button
        :isLoading="isLoading"
        text="update"
        loadingText="updating"
        icon="fas fa-floppy-disk"
      />
    </div>
    <div class="text-center align-items-center py-5" v-else>
      <CSpinner color="success" />
    </div>
  </Form>
</template>
