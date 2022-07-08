<script setup>
import MultiLanguageTable from "@/components/Admin/CompanyTree/MultiLanguageTable.vue";
import { useDocumentTypeApi } from "@/store/ApiServices/DocumentTypeApi";
import { useApiDataStore } from "@/store/Api/ApiData";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const apiDataStore = useApiDataStore();
const documentTypeApi = useDocumentTypeApi();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  title: null,
  lang_code: null,
  documentTypes: [],
});
const langs = ref(apiDataStore.languages);
const selectedLangs = ref([]);

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
  form.documentTypes.unshift({
    title: form.title,
    lang_code: langTitle.code,
  });
  selectedLangs.value.push(langTitle.code);

  form.title = null;
  form.lang_code = null;
};

const deleteData = (index) => {
  const code = form.documentTypes[index].lang_code;
  const selectedIndex = selectedLangs.value.indexOf(code);
  selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
  form.documentTypes.splice(index, 1);
};

const add = () => {
  isLoading.value = true;
  documentTypeApi
    .addDocumentType({ documentTypes: form.documentTypes })
    .then(() => {
      form.title = null;
      form.lang_code = null;
      form.documentTypes = [];
      addModal.value = false;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Button
    color="success"
    @handleClick="addModal = true"
    text="add"
    icon="fas fa-plus"
  />

  <CModal :visible="addModal" @close="addModal = false">
    <CModalHeader>
      <CModalTitle>{{
        $t("addAttr", { attr: $t("documentType") })
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

      <MultiLanguageTable :data="form.documentTypes" @deleteItem="deleteData" />
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="addModal = false"> Close </CButton>
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
