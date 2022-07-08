<script setup>
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import {
  reactive,
  ref,
  defineProps,
  watch,
  computed,
  onMounted,
  defineEmits,
} from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["selectedId", "showModal"]);
const emit = defineEmits(["closeModal"]);
const route = useRoute();
const apiData = useApiData();
const companyApi = useCompanyApi();
const companyStore = useCompanyStore();
const apiStore = useApiDataStore();
const isReady = ref(false);
const isLoading = ref(false);
const form = reactive({
  type_id: null,
  title: null,
  serial: null,
});

onMounted(async () => {
  await apiData.getInventoryTypes(route.params.id || null);
  isReady.value = true;
});

const setData = (value) => {
  form.title = value.title;
  form.serial = value.serial;
  form.type_id = value.type.id;
};

const selectedData = computed(() => {
  return props.selectedId;
});

watch(selectedData, (value) => {
  const selectedValue = companyStore.inventories.find((item) => {
    return item.id == value;
  });

  setData(selectedValue);
});

const update = () => {
  isLoading.value = true;
  companyApi
    .updateInventory(route.params.id, props.selectedId, form)
    .then(() => {
      emit("closeModal");
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <CModal :visible="showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("editAttr", { attr: $t("inventoryType") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="update">
      <CModalBody>
        <div class="row" v-if="isReady && selectedData">
          <Select
            v-model="form.type_id"
            :label="$t('inventoryType')"
            name="inventory_type"
            rules="required"
            :options="apiStore.inventoryTypes"
            :inline="false"
            mainClass="mb-4"
          />
          <Input
            v-model="form.title"
            :label="$t('inventory')"
            name="title"
            rules="required|max:255"
            mainClass="mb-4"
            :inline="false"
          />

          <Input
            v-model="form.serial"
            :label="$t('serieNumber')"
            name="serial"
            rules="max:30"
            mainClass="mb-4"
            :inline="false"
          />
        </div>
        <div class="text-center align-items-center py-5" v-else>
          <CSpinner color="success" />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="$emit('closeModal')">
          Close
        </CButton>
        <Button
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
          @handleClick="update()"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
