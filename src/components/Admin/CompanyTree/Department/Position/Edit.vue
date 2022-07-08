<script setup>
import MultiLanguageTable from "@/components/Admin/CompanyTree/MultiLanguageTable.vue";
import { useDepartmentApi } from "@/store/ApiServices/DepartmentApi";
import { useDepartmentStore } from "@/store/Admin/Company/Department";
import { useApiDataStore } from "@/store/Api/ApiData";
import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["selectedId", "showModal"]);
const emit = defineEmits(["closeModal"]);
const route = useRoute();
const departmentStore = useDepartmentStore();
const departmentApi = useDepartmentApi();

const apiDataStore = useApiDataStore();
const isLoading = ref(false);
const form = reactive({
  title: null,
  lang_code: null,
  positions: [],
});

const langs = ref(apiDataStore.languages);
const selectedLangs = ref([]);

const setData = (value) => {
  form.positions = value;
};

const selectedData = computed(() => {
  return props.selectedId;
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

const deleteData = (index, id) => {
  const code = form.positions[index].lang_code;
  const selectedIndex = selectedLangs.value.indexOf(code);
  if (id) {
    departmentApi
      .deletePositionTitle(route.params.id, props.selectedId, id)
      .then(() => {
        selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
        form.positions.splice(index, 1);
      });
    return;
  }

  selectedIndex > -1 ? selectedLangs.value.splice(selectedIndex, 1) : "";
  form.positions.splice(index, 1);
};

watch(selectedData, (value) => {
  const selectedValue = departmentStore.positions.find((item) => {
    return item.id == value;
  });

  setData(selectedValue.titles);

  selectedLangs.value = selectedValue.titles.map((item) => {
    return item.lang_code;
  });
});

watch(selectedLangs, (value) => {
  const arr = apiDataStore.languages.filter(function (item) {
    return selectedLangs.value.indexOf(item.code) === -1;
  });
  langs.value = arr;
});

const update = () => {
  isLoading.value = true;
  departmentApi
    .updatePosition(route.params.id, props.selectedId, form)
    .then(() => {
      emit("closeModal");
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const updateTitle = (id, typeId, form) => {
  departmentApi
    .updatePositionTitle(route.params.id, id, typeId, form)
    .then(() => {
      emit("closeModal");
    });
};
</script>
<template>
  <CModal :visible="showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{ $t("editAttr", { attr: $t("position") }) }}</CModalTitle>
    </CModalHeader>
    <Form @submit="update()">
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
          <button type="submit" class="btn btn-success text-light my-1">
            {{ $t("add") }}
          </button>
        </Form>

        <MultiLanguageTable
          :data="form.positions"
          :isEditing="true"
          parentName="position_id"
          @deleteItem="deleteData"
          @updateTitle="updateTitle"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="$emit('closeModal')">
          Close
        </CButton>
        <Button
          :disabled="form.positions.length < 1"
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
