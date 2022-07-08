<script setup>
import { useProfileStore } from "@/store/Profile";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { onMounted, reactive, ref } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const apiData = useApiData();
const apiDataStore = useApiDataStore();

const isLoading = ref(false);
const isReady = ref(false);
const addModal = ref(false);

const form = reactive({
  inventory_type: null,
  inventory_id: null,
  date: null,
  inventory_photo: null,
  desc: null,
});
const preview = ref();

const changePhoto = (data) => {
  preview.value = URL.createObjectURL(data);
  form.inventory_photo = data;
};

onMounted(async () => {
  if (profileStore.profile.company_id) {
    await apiData.getInventoryTypes(profileStore.profile.company_id || null);
  }

  isReady.value = true;
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addDebit(profileStore.profile.id, form)
    .then(() => {
      form.inventory_id = null;
      form.inventory_type = null;
      form.date = null;
      form.inventory_photo = null;
      form.desc = null;
      preview.value = null;
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
    <Form @submit="add()">
      <CModalHeader>
        <CModalTitle>{{ $t("addAttr", { attr: $t("debit") }) }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="row" v-if="isReady">
          <Select
            v-model="form.inventory_type"
            :label="$t('inventoryType')"
            name="inventory_type"
            rules="required"
            :options="apiDataStore.inventoryTypes"
            :inline="false"
            mainClass="mb-4"
            @selected="apiData.getInventoriesByType(form.inventory_type)"
          />

          <Select
            v-model="form.inventory_id"
            :label="$t('inventory')"
            name="inventory"
            rules="required"
            :options="apiDataStore.inventories"
            :inline="false"
            mainClass="mb-4"
          />
          <DateInput
            v-model="form.date"
            :label="$t('date')"
            name="date"
            mainClass="mb-4"
            :inline="false"
          />
          <div
            v-if="preview"
            class="text-center"
            style="width: 160px; height: 160px"
          >
            <img :src="preview" alt="image" class="w-100" />
            <i
              @click="(preview = null), (form.inventory_photo = null)"
              class="fas fa-times p-3 rounded text-danger"
              style="position: absolute"
            ></i>
          </div>
          <FileInput
            :label="$t('inventoryPhoto')"
            name="inventory_photo"
            @handleUpdate="changePhoto"
            :inline="false"
            class="mb-4"
            rules="image"
          />
          <Textarea
            v-model="form.desc"
            :label="$t('desc')"
            name="desc"
            rules="max:500"
            :inline="false"
            mainClass="mb-4"
            inputType="textarea"
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
