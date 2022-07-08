<script setup>
import { useProfileStore } from "@/store/Profile";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import {
  lisences,
  militaryStatuses,
  bloodGroups,
  marianceStatuses,
  educationStatuses,
  workDays,
} from "@/core/datas/data";
import { reactive, ref, onMounted } from "vue";

const profileApi = useProfileApi();
const apiData = useApiData();
const profileStore = useProfileStore();
const apiStore = useApiDataStore();
const isLoading = ref(false);
const form = reactive({
  id: profileStore.profile.id || null,
  first_name: null,
  last_name: null,
  country_id: null,
  born_place_id: null,
  birthday: null,
  gender: null,
  nation_id: null,
  licences: [],
  work_status: null,
  work_days: [],
  licence_date: null,
  military_status: null,
  iban: null,
  id_number: null,
  id_serie_number: null,
  blood_grup: null,
  mariance_status: null,
  is_smoking: null,
  father_name: null,
  mother_name: null,
  important_or_surgeon: null,
  address: null,
  address_country_id: null,
  city_id: null,
  home_phone: null,
  personal_phone: null,
  work_phone: null,
  whatsapp_phone: null,
  pdks_id: null,
  exempt_rate: null,
  tgb_start_date: null,
});

const isReady = ref(false);

onMounted(async () => {
  await Object.entries(profileStore.profile.form).forEach((item) => {
    form[item[0]] = item[1];
  });
  await apiData.getCountries().then(() => {
    if (form.city_id) {
      apiData.getCities(form.country_id);
    }
    if (form.born_place_id) {
      apiData.getCities(form.address_country_id);
    }
  });
  await apiData.getNations();
  isReady.value = true;
});

const updateInfo = () => {
  isLoading.value = true;
  profileApi.updatePersonalInfo(profileStore.profile.id, form).finally(() => {
    isLoading.value = false;
  });
};
</script>
<template>
  <Form @submit="updateInfo" v-if="isReady">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <Input
            v-model="form.first_name"
            :label="$t('firstName')"
            name="first_name"
            rules="required|max:255"
            mainClass="col-md-6 mb-4"
            :inline="false"
          />
          <Input
            v-model="form.last_name"
            :label="$t('lastName')"
            name="last_name"
            rules="required|max:255"
            mainClass="col-md-6 mb-4"
            :inline="false"
          />
          <Select
            v-model="form.country_id"
            :label="$t('country')"
            name="country_id"
            rules="required"
            mainClass="col-md-6 mb-4"
            :inline="false"
            @selected="apiData.getCities(form.country_id)"
            :options="apiStore.countries"
          />
          <Select
            v-if="form.country_id"
            v-model="form.born_place_id"
            :label="$t('bornPlace')"
            name="born_place_id"
            rules="required"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :options="apiStore.cities"
          />
          <DateInput
            v-model="form.birthday"
            :label="$t('birthday')"
            name="birthday"
            rules="required"
            mainClass="col-md-6 mb-4"
            :inline="false"
          />
          <div class="col-md-6">
            <label class="fs-6 fw-bold form-label mb-3">{{
              $t("gender")
            }}</label>
            <div class="d-flex align-items-center mb-4">
              <div class="form-check form-check-custom form-check-solid me-4">
                <input
                  class="form-check-input"
                  type="radio"
                  value="male"
                  v-model="form.gender"
                  id="male"
                />
                <label class="form-check-label" for="male">{{
                  $t("male")
                }}</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="female"
                  v-model="form.gender"
                  id="female"
                />
                <label class="form-check-label" for="female">{{
                  $t("female")
                }}</label>
              </div>
            </div>
          </div>
          <Select
            v-model="form.nation_id"
            :label="$t('nation')"
            name="nation_id"
            rules="required"
            mainClass="col-md-12 mb-4"
            :inline="false"
            :options="apiStore.nations"
          />
          <div class="col-md-12 mb-4">
            <label class="fs-6 fw-bold form-label mb-3">{{
              $t("driverLisence")
            }}</label>
            <div class="d-flex align-items-center flex-wrap mb-4">
              <div
                class="form-check form-check-custom form-check-solid me-3 mb-2"
                v-for="(licence, index) in lisences"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="licence"
                  v-model="form.licences"
                  :id="licence"
                />
                <label class="form-check-label" :for="licence">{{
                  licence.toUpperCase()
                }}</label>
              </div>
            </div>
          </div>
          <DateInput
            v-if="form.licences.length > 0"
            v-model="form.licence_date"
            :label="$t('licenceDate')"
            name="licence_date"
            mainClass="col-md-6 mb-4"
            :inline="false"
          />
          <div class="d-flex flex-column col-md-6 mb-4">
            <label class="form-label fw-bold mb-4">{{
              $t("militaryStatus")
            }}</label>
            <div class="d-flex align-items-center flex-wrap">
              <div
                class="form-check form-check-custom form-check-solid me-3 mb-2"
                v-for="(status, index) in militaryStatuses"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :value="status"
                  v-model="form.military_status"
                  :id="status"
                />
                <label class="form-check-label" :for="status">{{
                  $t(status)
                }}</label>
              </div>
            </div>
          </div>
          <Input
            v-model="form.iban"
            :label="$t('iban')"
            name="iban"
            mainClass="mb-4"
            :inline="false"
            :isMask="true"
            mask="TR## #### #### #### #### #### ##"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <Input
            v-model="form.id_number"
            name="id_number"
            :label="$t('idNumber')"
            inputType="number"
            rules="required|max:11|min:11"
            :inline="false"
            mainClass="form-group col-md-6 mb-4"
          />
          <Input
            v-model="form.id_serie_number"
            name="id_serie_number"
            :label="$t('idSerieNo')"
            :inline="false"
            rules="max:9|max:9"
            mainClass="form-group col-md-6 mb-4"
          />

          <Select
            v-model="form.blood_grup"
            :label="$t('bloodGroup')"
            name="blood_group"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :options="bloodGroups"
          />
          <Select
            v-model="form.mariance_status"
            :label="$t('marianceStatus')"
            name="marianceStatus"
            rules="required"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :options="marianceStatuses"
          />
          <div class="col-md-12 mb-4">
            <label class="fs-6 fw-bold form-label mb-3">{{
              $t("smokeUsing")
            }}</label>
            <div class="d-flex align-items-center mb-4">
              <div class="form-check form-check-custom form-check-solid me-4">
                <input
                  class="form-check-input"
                  type="radio"
                  value="true"
                  v-model="form.is_smoking"
                  id="true"
                />
                <label class="form-check-label" for="true">{{
                  $t("yes")
                }}</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="false"
                  v-model="form.is_smoking"
                  id="false"
                />
                <label class="form-check-label" for="false">{{
                  $t("no")
                }}</label>
              </div>
            </div>
          </div>
          <Input
            v-model="form.father_name"
            :label="$t('fatherName')"
            name="fatherName"
            mainClass="col-md-6 mb-4"
            rules="max:255"
            :inline="false"
          />
          <Input
            v-model="form.mother_name"
            :label="$t('motherName')"
            name="motherName"
            rules="max:255"
            mainClass="col-md-6 mb-4"
            :inline="false"
          />
          <Input
            v-model="form.important_or_surgeon"
            :label="$t('importantIllnessOrSurgeon')"
            name="important_or_surgeon"
            mainClass="col-md-12 mb-4"
            rules="max:255"
            :inline="false"
          />
          <div class="form-group mb-4 col-md-12">
            <label class="fs-6 fw-bold form-label mb-3">{{
              $t("workStatus")
            }}</label>
            <div class="d-flex justify-content-around align-items-center">
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="full"
                  v-model="form.work_status"
                />
                <label class="form-check-label" for="flexRadioChecked">{{
                  $t("full")
                }}</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="part"
                  v-model="form.work_status"
                />
                <label class="form-check-label" for="flexRadioChecked">{{
                  $t("part")
                }}</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="home"
                  v-model="form.work_status"
                />
                <label class="form-check-label" for="flexRadioChecked">{{
                  $t("home")
                }}</label>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column col-md-12 mb-4">
            <label class="col-form-label fw-bold mb-4">{{
              $t("canWorkDays")
            }}</label>
            <div class="d-flex align-items-center flex-wrap">
              <div
                class="form-check form-check-custom form-check-solid me-3 mb-2"
                v-for="(day, index) in workDays"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="day"
                  v-model="form.work_days"
                  :id="day"
                />
                <label class="form-check-label" :for="day">{{ $t(day) }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <h4 class="card-title text-dark my-5">{{ $t("contactInfo") }}</h4>
        <Textarea
          v-model="form.address"
          :label="$t('address')"
          name="address"
          rules="max:2500"
          mainClass="col-md-12 mb-4"
          :inline="false"
          inputType="textarea"
        />
        <div class="col-md-6 row">
          <Select
            v-model="form.address_country_id"
            :label="$t('country')"
            name="country_id"
            rules="required"
            mainClass="col-md-12 mb-4"
            :inline="false"
            :options="apiStore.countries"
            @selected="apiData.getCities(form.address_country_id)"
          />
          <Select
            v-if="form.address_country_id"
            v-model="form.city_id"
            :label="$t('city')"
            name="city_id"
            rules="required"
            mainClass="col-md-12 mb-4"
            :inline="false"
            :options="apiStore.cities"
          />
        </div>
        <div class="col-md-6 row">
          <Input
            v-model="form.home_phone"
            :label="$t('homePhone')"
            name="home_phone"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :isMask="true"
            mask="+90(###) ### ## ##"
          />
          <Input
            v-model="form.personal_phone"
            :label="$t('personalPhone')"
            name="personal_phone"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :isMask="true"
            mask="+90(###) ### ## ##"
          />
          <Input
            v-model="form.work_phone"
            :label="$t('workPhone')"
            name="work_phone"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :isMask="true"
            mask="+90(###) ### ## ##"
          />
          <Input
            v-model="form.whatsapp_phone"
            :label="$t('whatsappPhone')"
            name="whatsapp_phone"
            mainClass="col-md-6 mb-4"
            :inline="false"
            :isMask="true"
            mask="+90(###) ### ## ##"
          />
        </div>
        <h4 class="card-title text-dark my-5">
          {{ $t("teknokentInfo") }}
        </h4>
        <div class="row">
          <Input
            v-model="form.pdks_id"
            :label="$t('pdksId')"
            name="pdks_id"
            :inline="false"
            rules="max:255"
            mainClass="col-md-6 mb-4"
          />
          <Input
            v-model="form.exempt_rate"
            :label="$t('exemptRate')"
            name="exempt_rate"
            :inline="false"
            mainClass="col-md-6 mb-4"
            :isMask="true"
            rules="max_value:100"
            mask="#*%"
          />
          <DateInput
            v-model="form.tgb_start_date"
            :label="$t('tgbStartDate')"
            name="tgb_start_date"
            mainClass="col-md-6 mb-4"
            :inline="false"
          />
        </div>
        <Button
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
        />
      </div>
    </div>
  </Form>
  <div class="text-center align-items-center py-5" v-else>
    <CSpinner color="success" />
  </div>
</template>
