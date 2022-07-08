<script setup>
import MultiLanguageTable from "@/components/Admin/CompanyTree/MultiLanguageTable.vue";
import { useAbsenceTypeApi } from "@/store/ApiServices/AbsenceTypeApi";

import { useApiDataStore } from "@/store/Api/ApiData";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const apiDataStore = useApiDataStore();
const absenceTypeApi = useAbsenceTypeApi();
const isLoading = ref(false);
const form = reactive({
  title: null,
  lang_code: null,
  absenceTypes: [],
});
const langs = ref(apiDataStore.languages);
const selectedLangs = ref([]);
const showModal = ref(false);

watch(selectedLangs.value, (value) => {
  const arr = apiDataStore.languages.filter(function (item) {
    return selectedLangs.value.indexOf(item.code) === -1;
  });
  langs.value = arr;
});

const addData = () => {
  const langTitle = apiDataStore.languages.find((item) => {
    return item.id == form.lang_code;
  });
  form.absenceTypes.unshift({
    title: form.title,
    lang_code: langTitle.code,
  });
  selectedLangs.value.push(langTitle.code);

  form.title = null;
  form.lang_code = null;
};

const deleteData = (index) => {
  const code = form.absenceTypes[index].lang_code;
  const selectedIndex = selectedLangs.value.indexOf(code);
  selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
  form.absenceTypes.splice(index, 1);
};

const add = () => {
  isLoading.value = true;
  absenceTypeApi
    .addAbsenceType({ absenceTypes: form.absenceTypes })
    .then(() => {
      form.title = null;
      form.lang_code = null;
      form.absenceTypes = [];
      showModal.value = false;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Button
    color="success"
    @handleClick="showModal = true"
    text="add"
    icon="fas fa-plus"
  />

  <CModal :visible="showModal" @close="showModal = false">
    <CModalHeader>
      <CModalTitle>{{
        $t("addAttr", { attr: $t("absenceType") })
      }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Form @submit="addData">
        <div class="row">
          <Input
            v-model="form.title"
            :label="$t('documentType')"
            name="documentType"
            rules="required|max:255"
            :inline="false"
            mainClass="col-sm-6 mb-4"
          />
          <Select
            v-model="form.lang_code"
            :label="$t('language')"
            name="lang_code"
            rules="required"
            :inline="false"
            mainClass="col-sm-6 mb-4"
            :options="langs"
          />
        </div>
        <button type="submit" class="btn btn-success text-light my-2">
          {{ $t("add") }}
        </button>
      </Form>

      <MultiLanguageTable :data="form.absenceTypes" @deleteItem="deleteData" />
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="showModal = false"> Close </CButton>
      <Button
        :isLoading="isLoading"
        text="add"
        loadingText="adding"
        icon="fas fa-floppy-disk"
        @handleClick="add()"
      />
    </CModalFooter>
  </CModal>
</template>
