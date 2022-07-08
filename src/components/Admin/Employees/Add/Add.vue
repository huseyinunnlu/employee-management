<script setup>
import {
  workTypes,
  insuranceStatuses,
  arrangmentTypes,
  disabilityStatues,
} from "@/core/datas/data";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useEmployeeApi } from "@/store/ApiServices/EmployeeApi";
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const employeeApi = useEmployeeApi();
const apiStore = useApiDataStore();
const apiData = useApiData();
const isReady = ref(false);
const isLoading = ref(false);
const isPerm = ref(false);
const isEdit = ref(route.name == "employee-edit" ? true : false);

const form = reactive({
  role_id: null,
  musteri_id: null,
  company_id: null,
  department_id: null,
  employeer_branch_id: null,
  position_id: null,
  manager_id: null,
  work_place_id: null,
  job_id: null,
  insurance_no: null,
  start_date: null,
  birthday: null,
  work_type: null,
  work_status: "full",
  insurance_status: null,
  language_id: null,
  businness_arragnment_type: null,
  arrangment_end_date: null,
  disability_status: null,
  first_name: null,
  last_name: null,
  id_number: null,
  id_serie_number: null,
  email: null,
  password: null,
  registration_number: null,
  can_sign_in: true,
  can_edit_profile: false,
  can_edit_email: false,
  can_see_salary: false,
});

onMounted(async () => {
  if (route.query) {
    form.musteri_id = route.query.musteri_id || null;
    form.company_id = route.query.company_id || null;
    form.department_id = route.query.department_id || null;
    form.department_id = route.query.work_place_id || null;
  }

  if (route.params.id) {
    await employeeApi.getSelectedEmployee(route.params.id).then((response) => {
      Object.entries(response).forEach((item) => {
        form[item[0]] = item[1];
      });
      isEdit.value = true;
    });
  }

  // if (form.musteri_id) {
  //   await apiData.getCompanies(form.musteri_id);
  //   await apiData.getEmployeerBranches(form.musteri_id);
  // }

  // if (form.company_id) {
  //   await apiData.getDepartments(form.company_id);
  //   await apiData.getPositions(form.company_id);
  // }

  // if (form.department_id) {
  //   await apiData.getWorkPlaces(form.department_id);
  //   if (form.role_id) {
  //     await apiData.getManagers(form.department_id, form.role_id);
  //   }
  // }

  isReady.value = true;
});

const submit = () => {
  isLoading.value = true;
  if (isEdit.value) {
    employeeApi.updateEmployee(route.params.id, form).finally(() => {
      isLoading.value = false;
    });
  } else {
    employeeApi.saveEmployee(form).finally(() => {
      isLoading.value = false;
    });
  }
};

const getJobs = (query) => {
  if (query) {
    apiData.getJobs(query);
  }
};
</script>
<template>
  <div class="row">
    <Form @submit="submit()">
      <div class="row" v-if="isReady">
        <Select
          v-model="form.role_id"
          name="role_id"
          :label="$t('role')"
          rules="required"
          :inline="false"
          :options="apiStore.roles"
          mainClass="col-md-6"
        />
        <Select
          name="musteri_id"
          v-model="form.musteri_id"
          :label="$t('musteri')"
          rules="required"
          :inline="false"
          :options="apiStore.musteris"
          @selected="
            apiData.getCompanies(form.musteri_id),
              apiData.getEmployeerBranches(form.musteri_id)
          "
          mainClass="col-md-6"
        />
        <Select
          v-model="form.company_id"
          name="company_id"
          :label="$t('company')"
          rules="required"
          :inline="false"
          :options="apiStore.companies"
          :disabled="!form.musteri_id"
          @selected="apiData.getDepartments(form.company_id)"
          mainClass="col-md-6"
        />
        <Select
          v-model="form.department_id"
          name="department_id"
          :label="$t('department')"
          :inline="false"
          :options="apiStore.departments"
          :disabled="!form.company_id"
          @selected="
            apiData.getPositions(form.company_id),
              apiData.getWorkPlaces(form.department_id),
              apiData.getManagers(form.department_id, form.role_id)
          "
          mainClass="col-md-6"
        />
        <Select
          v-model="form.employeer_branch_id"
          name="emplooyer_branch_id"
          :label="$t('employeerBranch')"
          :inline="false"
          selectLabel="employeer_title"
          rules="required"
          :disabled="!form.musteri_id"
          :options="apiStore.employeer_branches"
          mainClass="col-md-6"
        />
        <Select
          v-model="form.position_id"
          name="position_id"
          :label="$t('position')"
          :inline="false"
          :disabled="!form.department_id"
          :options="apiStore.positions"
          mainClass="col-md-6"
        />
        <Select
          v-model="form.manager_id"
          name="manager_id"
          :label="$t('manager')"
          :inline="false"
          :disabled="!form.department_id && !form.role_id"
          :options="apiStore.managers"
          mainClass="col-md-6"
        />
        <Select
          v-model="form.work_place_id"
          name="work_place_id"
          :label="$t('workPlace')"
          :inline="false"
          :options="apiStore.work_places"
          :disabled="!form.department_id"
          mainClass="col-md-6"
        />
        <Select
          v-model="form.job_id"
          name="job_id"
          :label="$t('job')"
          :inline="false"
          @searchChange="getJobs"
          :options="apiStore.jobs.length > 0 ? apiStore.jobs : []"
          mainClass="form-group col-md-8 mb-4"
        />
        <Input
          v-model="form.insurance_no"
          name="sgk_no"
          :label="$t('sgkInsurance')"
          inputType="number"
          rules="max:14|min:14"
          :inline="false"
          mainClass="form-group col-md-4 mb-4"
        />
        <DateInput
          v-model="form.start_date"
          :label="$t('startDate')"
          name="start_date"
          rules="required"
          :inline="false"
          mainClass="form-group col-md-6 mb-4"
        />
        <DateInput
          v-model="form.birthday"
          :label="$t('birthday')"
          name="birthday"
          rules="required"
          :inline="false"
          mainClass="form-group col-md-6 mb-4"
        />
        <Select
          v-model="form.work_type"
          name="work_type"
          :label="$t('workType')"
          rules="required"
          :inline="false"
          :options="workTypes"
          mainClass="form-group col-md-6 mb-4"
        />

        <div class="form-group row mb-4 col-md-6">
          <label class="fw-bold form-label mb-3">{{ $t("workStatus") }}</label>
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
        <Select
          v-model="form.insurance_status"
          name="insurance_status"
          :label="$t('insuranceStatus')"
          rules="required"
          :inline="false"
          :options="insuranceStatuses"
          mainClass="form-group col-md-6 mb-4"
        />

        <Select
          v-model="form.language_id"
          name="language_id"
          :label="$t('languageChoose')"
          rules="required"
          :inline="false"
          :options="apiStore.languages"
          mainClass="form-group col-md-6 mb-4"
        />
        <Select
          v-model="form.businness_arragnment_type"
          name="businness_arrangment_type"
          :label="$t('businnessArrangmentType')"
          rules="required"
          :inline="false"
          :options="arrangmentTypes"
          mainClass="form-group col-md-6 mb-4"
        />
        <DateInput
          v-model="form.arrangment_end_date"
          :label="$t('arrangmentEndDate')"
          :disabled="form.businness_arragnment_type == 'uncertain'"
          name="arrangment_end_date"
          :inline="false"
          mainClass="form-group col-md-6 mb-4"
        />
        <Select
          v-model="form.disability_status"
          name="disability_status"
          :label="$t('disabilityStatus')"
          rules="required"
          :inline="false"
          :options="disabilityStatues"
          mainClass="form-group col-md-12 mb-4"
        />
        <Input
          v-model="form.first_name"
          name="first_name"
          :label="$t('firstName')"
          rules="required|max:255"
          :inline="false"
          mainClass="form-group col-md-6 mb-4"
        />
        <Input
          v-model="form.last_name"
          name="last_name"
          :label="$t('lastName')"
          rules="required|max:255"
          :inline="false"
          mainClass="form-group col-md-6 mb-4"
        />
        <Input
          v-model="form.id_number"
          name="id_number"
          :label="$t('idNumber')"
          inputType="number"
          rules="required|max:11|min:11"
          :inline="false"
          mainClass="form-group col-md-8 mb-4"
        />
        <Input
          v-model="form.id_serie_number"
          name="id_serie_number"
          :label="$t('idSerieNo')"
          :inline="false"
          rules="max:9|max:9"
          mainClass="form-group col-md-4 mb-4"
        />
        <Input
          v-model="form.email"
          name="email"
          :label="$t('email')"
          :inline="false"
          rules="required|email|max:255"
          mainClass="form-group col-md-6 mb-4"
        />
        <Input
          v-if="!isEdit"
          v-model="form.password"
          name="password"
          inputType="password"
          :label="$t('password')"
          :inline="false"
          rules="required|max:35|min:6"
          mainClass="form-group col-md-6 mb-4"
        />
        <Input
          v-model="form.registration_number"
          name="registration_number"
          :label="$t('registrationNo')"
          :inline="false"
          mainClass="form-group col-md-6 mb-4"
        />

        <div class="my-5">
          <h4 class="mb-4">
            {{ $t("permsAndLimitations") }}
          </h4>
          <div class="d-flex flex-column">
            <div class="form-group">
              <div class="form-check form-check-custom form-check-solid my-2">
                <input
                  v-model="form.can_sign_in"
                  class="form-check-input"
                  type="checkbox"
                  id="can_sign_in"
                />
                <label class="form-check-label" for="can_sign_in">{{
                  $t("canSignIn")
                }}</label>
              </div>
            </div>
            <div class="form-group">
              <div
                v-if="form.role_id == 4"
                class="form-check form-check-custom form-check-solid my-2"
              >
                <input
                  v-model="form.can_edit_profile"
                  class="form-check-input"
                  type="checkbox"
                  id="can_edit_profile"
                />
                <label class="form-check-label" for="can_edit_profile">{{
                  $t("canEditProfile")
                }}</label>
              </div>
            </div>
            <div class="form-group">
              <div
                v-if="form.role_id == 4"
                class="form-check form-check-custom form-check-solid my-2"
              >
                <input
                  v-model="form.can_edit_email"
                  class="form-check-input"
                  type="checkbox"
                  id="can_edit_email"
                />
                <label class="form-check-label" for="can_edit_email">{{
                  $t("canEditEmail")
                }}</label>
              </div>
            </div>
            <div class="form-group">
              <div
                v-if="form.role_id != 4"
                class="form-check form-check-custom form-check-solid my-2"
              >
                <input
                  v-model="form.can_see_salary"
                  class="form-check-input"
                  type="checkbox"
                  id="can_see_salary"
                />
                <label class="form-check-label" for="can_see_salary">{{
                  $t("canSeeSalary")
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <Button
          color="success"
          :isLoading="isLoading"
          @handleClick="addModal = true"
          :text="isEdit ? 'update' : 'add'"
          :loadingText="isEdit ? 'updating' : 'update'"
          icon="fas fa-floppy-disk"
        />
      </div>
      <div class="text-center align-items-center py-5" v-else>
        <CSpinner color="success" />
      </div>
    </Form>
  </div>
</template>
