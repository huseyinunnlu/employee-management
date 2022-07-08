<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useApiData } from "@/store/ApiServices/ApiData";
import { onMounted, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const isReady = ref(false);
const apiStore = useApiDataStore();
const apiData = useApiData();
const addModal = ref(false);

const form = reactive({
  start_date: null,
  end_date: null,
  company_id: null,
  department_id: null,
  status: null,
  type_id: null,
  isSigned: false,
});

const date = ref(null);

const kt_filter_modal = ref();
onMounted(async () => {
  await apiData.getCompanies();
  await apiData.getAbsenceTypes();

  await Object.entries(route.query).forEach(([key, value]) => {
    form[key] = value;
  });

  isReady.value = true;
  date.value = [form.start_date, form.end_date];
});

const filter = async () => {
  let query = {};

  await Object.entries(form).forEach(([key, value]) => {
    if (value) {
      query[key] = value;
    }
  });

  addModal.value = false;

  router.replace({
    name: "absence-reports",
    query: query,
  });
};

watch(date, (value) => {
  if (value) {
    form.start_date = value[0];
    form.end_date = value[1];

    return;
  }
  form.start_date = null;
  form.end_date = null;
});
</script>
<template>
  <Button
    color="info"
    @handleClick="addModal = true"
    text="filter"
    icon="fas fa-filter"
  />

  <CModal :visible="addModal" @close="addModal = false">
    <Form @submit="filter()">
      <CModalHeader>
        <CModalTitle>{{ $t("filter") }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div v-if="isReady">
          <div class="mb-4">
            <label for="search" class="fw-bold form-label fs-6">
              {{ $t("search") }}</label
            >
            <input
              v-model="form.search"
              type="text"
              id="search"
              class="form-control form-control-solid"
              :placeholder="$t('searchPlaceholder')"
            />
          </div>

          <Select
            v-model="form.company_id"
            :label="$t('select', { attr: $t('company') })"
            name="company"
            :inline="false"
            mainClass="mb-4"
            :options="apiStore.companies"
            @selected="apiData.getDepartments(form.company_id)"
          />

          <Select
            v-model="form.department_id"
            :label="$t('select', { attr: $t('department') })"
            name="department"
            :inline="false"
            mainClass="mb-4"
            :options="apiStore.departments"
            @selected="apiData.getPositions(form.department_id)"
          />

          <Select
            v-model="form.position_id"
            :label="$t('select', { attr: $t('position') })"
            name="position"
            :inline="false"
            mainClass="mb-4"
            :options="apiStore.positions"
          />

          <Select
            v-model="form.role"
            :label="$t('select', { attr: $t('role') })"
            name="role"
            :inline="false"
            :options="apiStore.roles"
          />
        </div>
        <div class="text-center align-items-center py-5" v-else>
          <CSpinner color="success" />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="addModal = false"> Close </CButton>
        <Button text="filter" icon="fas fa-filter" />
      </CModalFooter>
    </Form>
  </CModal>
</template>
