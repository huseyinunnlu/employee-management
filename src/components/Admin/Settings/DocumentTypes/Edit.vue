<script setup>
import MultiLanguageTable from "@/components/Admin/CompanyTree/MultiLanguageTable.vue";

import { useDocumentTypeApi } from "@/store/ApiServices/DocumentTypeApi";

import { useApiDataStore } from "@/store/Api/ApiData";
import { useSettingsStore } from "@/store/Admin/Settings/Settings";
import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";

const props = defineProps(["selectedId", "showModal"]);

const apiDataStore = useApiDataStore();
const documentTypeApi = useDocumentTypeApi();
const settingsStore = useSettingsStore();

const isLoading = ref(false);
const form = reactive({
  title: null,
  lang_code: null,
  documentTypes: [],
});

const kt_document_type_edit_modal = ref();
const langs = ref(apiDataStore.languages);
const selectedLangs = ref([]);
const emit = defineEmits(["closeModal"]);
const setData = (value) => {
  form.documentTypes = value;
};

const selectedData = computed(() => {
  return props.selectedId;
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

const deleteData = (index, id) => {
  const code = form.documentTypes[index].lang_code;
  const selectedIndex = selectedLangs.value.indexOf(code);
  if (id) {
    documentTypeApi.deleteDocumentTypeTitle(props.selectedId, id).then(() => {
      selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
      form.documentTypes.splice(index, 1);
    });
    return;
  }

  selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
  form.documentTypes.splice(index, 1);
};

watch(selectedData, (value) => {
  const selectedValue = settingsStore.documentTypes.find((item) => {
    return item.id == value;
  });

  setData(selectedValue.titles);

  selectedLangs.value = selectedValue.titles.map((item) => {
    return item.lang_code;
  });
});

watch(
  selectedLangs,
  () => {
    const arr = apiDataStore.languages.filter(function (item) {
      return selectedLangs.value.indexOf(item.code) === -1;
    });
    langs.value = arr;
  },
  { deep: true }
);

const update = () => {
  isLoading.value = true;
  documentTypeApi.updateDocumentType(props.selectedId, form).finally(() => {
    isLoading.value = false;
    emit("closeModal");
  });
};

const updateTitle = (id, typeId, title) => {
  documentTypeApi.updateDocumentTypeTitle(id, typeId, title).then(() => {
    emit("closeModal");
  });
};
</script>
<template>
  <CModal :visible="showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("editAttr", { attr: $t("documentType") })
      }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Form @submit="addData">
        <div class="row">
          <Input
            v-model="form.title"
            :label="$t('documentType')"
            name="position"
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
          <i class="fas fa-plus"></i> {{ $t("add") }}
        </button>
      </Form>
      <MultiLanguageTable
        :data="form.documentTypes"
        :isEditing="true"
        parentName="type_id"
        @deleteItem="deleteData"
        @updateTitle="updateTitle"
      />
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('closeModal')"> Close </CButton>
      <Button
        :isLoading="isLoading"
        text="update"
        loadingText="updating"
        icon="fas fa-floppy-disk"
        @handleClick="update()"
      />
    </CModalFooter>
  </CModal>
</template>
