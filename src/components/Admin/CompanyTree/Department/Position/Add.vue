<script setup>
import MultiLanguageTable from "@/components/Admin/CompanyTree/MultiLanguageTable.vue";
import { useDepartmentApi } from "@/store/ApiServices/DepartmentApi";
import { useApiDataStore } from "@/store/Api/ApiData";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const apiDataStore = useApiDataStore();
const departmentApi = useDepartmentApi();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  title: null,
  lang_code: null,
  positions: [],
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
  form.positions.unshift({
    title: form.title,
    lang_code: langTitle.code,
  });
  selectedLangs.value.push(langTitle.code);

  form.title = null;
  form.lang_code = null;
};

const deleteData = (index) => {
  const code = form.positions[index].lang_code;
  const selectedIndex = selectedLangs.value.indexOf(code);
  selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
  form.positions.splice(index, 1);
};

const add = () => {
  isLoading.value = true;
  departmentApi
    .addPosition(route.params.id, form.positions)
    .then(() => {
      form.title = null;
      form.positions = [];
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
      <CModalTitle>{{ $t("addAttr", { attr: "position" }) }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Form @submit="addData">
        <div class="row">
          <Input
            v-model="form.title"
            :label="$t('position')"
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

      <MultiLanguageTable :data="form.positions" @deleteItem="deleteData" />
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
