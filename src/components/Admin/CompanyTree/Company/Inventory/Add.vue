<script setup>
import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";

import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const apiData = useApiData();
const apiStore = useApiDataStore();
const companyApi = useCompanyApi();

const isLoading = ref(false);
const isReady = ref(false);
const addModal = ref(false);
const form = reactive({
  type_id: null,
  title: null,
  serial: null,
});

onMounted(async () => {
  await apiData.getInventoryTypes(route.params.id || null);
  isReady.value = true;
});

const add = () => {
  isLoading.value = true;
  companyApi
    .addInventory(route.params.id, form)
    .then(() => {
      form.title = null;
      form.type_id = null;
      form.serial = null;
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
    <Form @submit="add()">
      <CModalHeader>
        <CModalTitle>{{
          $t("addAttr", { attr: $t("inventory") })
        }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div v-if="isReady">
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
        <CButton color="secondary" @click="addModal = false"> Close </CButton>
        <Button
          :isLoading="isLoading"
          text="add"
          loadingText="adding"
          icon="fas fa-floppy-disk"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
