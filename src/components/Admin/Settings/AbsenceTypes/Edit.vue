<script setup>
import MultiLanguageTable from "@/components/Admin/CompanyTree/MultiLanguageTable.vue";

import { useAbsenceTypeApi } from "@/store/ApiServices/AbsenceTypeApi";
import { useSettingsStore } from "@/store/Admin/Settings/Settings";
import { useApiDataStore } from "@/store/Api/ApiData";
import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";

const props = defineProps(["selectedId", "showModal"]);

const settingsStore = useSettingsStore();
const apiDataStore = useApiDataStore();
const absenceTypeApi = useAbsenceTypeApi();

const isLoading = ref(false);
const form = reactive({
  title: null,
  lang_code: null,
  absenceTypes: [],
});

const emit = defineEmits(["closeModal"]);

const langs = ref(apiDataStore.languages);
const selectedLangs = ref([]);
const setData = (value) => {
  form.absenceTypes = value;
};

const selectedData = computed(() => {
  return props.selectedId;
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

const deleteData = (index, id) => {
  const code = form.absenceTypes[index].lang_code;
  const selectedIndex = selectedLangs.value.indexOf(code);
  if (id) {
    absenceTypeApi.deleteAbsenceTypeTitle(props.selectedId, id).then(() => {
      selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
      form.absenceTypes.splice(index, 1);
    });
    return;
  }

  selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
  form.absenceTypes.splice(index, 1);
};

watch(selectedData, (value) => {
  const selectedValue = settingsStore.absenceTypes.find((item) => {
    return item.id == value;
  });

  setData(selectedValue.titles);

  selectedLangs.value = selectedValue.titles.map((item) => {
    return item.lang_code;
  });
});

watch(
  selectedLangs,
  (value) => {
    const arr = apiDataStore.languages.filter(function (item) {
      return selectedLangs.value.indexOf(item.code) === -1;
    });
    langs.value = arr;
  },
  { deep: true }
);

const update = () => {
  isLoading.value = true;
  absenceTypeApi.updateAbsenceType(props.selectedId, form).finally(() => {
    isLoading.value = false;
    emit("closeModal");
  });
};

const updateTitle = (id, typeId, title) => {
  absenceTypeApi.updateAbsenceTypeTitle(id, typeId, title).then(() => {
    form.title = null;
    form.lang_code = null;
    form.absenceTypes = [];
    emit("closeModal");
  });
};
</script>
<template>
  <CModal :visible="showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("editAttr", { attr: $t("absenceType") })
      }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Form @submit="addData">
        <div class="row">
          <Input
            v-model="form.title"
            :label="$t('absenceType')"
            name="absenceType"
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
        :data="form.absenceTypes"
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
