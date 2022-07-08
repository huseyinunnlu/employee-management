<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const isReady = ref(false);
const showModal = ref(false);
const apiData = useApiData();
const apiStore = useApiDataStore();
const form = reactive({
  company_id: null,
  department_id: null,
  type_id: null,
  is_have: false,
});

const date = ref(null);

onMounted(async () => {
  await apiData.getDocumentTypes();
  await apiData.getCompanies();
  await Object.entries(route.query).forEach(([key, value]) => {
    form[key] = value;
  });

  isReady.value = true;
});

const filter = async () => {
  let query = {};

  await Object.entries(form).forEach(([key, value]) => {
    if (value) {
      query[key] = value;
    }
  });

  showModal.value = false;

  router.replace({
    name: "document-reports",
    query: query,
  });
};
</script>
<template>
  <Button
    color="info"
    @handleClick="showModal = true"
    text="filter"
    icon="fas fa-filter"
  />

  <CModal :visible="showModal" @close="showModal = false">
    <Form @submit="filter()">
      <CModalHeader>
        <CModalTitle>{{ $t("filter") }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div v-if="isReady">
          <Select
            v-model="form.type_id"
            :label="$t('documentType')"
            name="type_id"
            :inline="false"
            mainClass="mb-4 row"
            :options="apiStore.document_types"
          />
          <Select
            v-model="form.company_id"
            :label="$t('company')"
            name="company_id"
            :inline="false"
            mainClass="mb-4 row"
            :options="apiStore.companies"
            @selected="apiData.getDepartments(form.company_id)"
          />
          <Select
            v-model="form.department_id"
            :label="$t('department')"
            name="department_id"
            :inline="false"
            mainClass="mb-4 row"
            :disabled="!form.company_id"
            :options="apiStore.departments"
          />
          <div class="col-sm-6 mb-4">
            <div class="form-check form-check-custom form-check-solid">
              <input
                class="form-check-input"
                type="checkbox"
                id="isHave"
                v-model="form.is_have"
              />
              <label class="form-check-label" for="isHave">{{
                $t("isHaveTextFilter")
              }}</label>
            </div>
          </div>
        </div>
        <div class="text-center align-items-center py-5" v-else>
          <CSpinner color="success" />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showModal = false"> Close </CButton>
        <Button @click="filter" text="filter" icon="fas fa-filter" />
      </CModalFooter>
    </Form>
  </CModal>
</template>
