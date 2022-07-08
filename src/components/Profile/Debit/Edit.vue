<script setup>
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";

import { reactive, ref, defineProps, onMounted } from "vue";

const apiData = useApiData();
const profileApi = useProfileApi();
const apiDataStore = useApiDataStore();
const profileStore = useProfileStore();
const props = defineProps(["item"]);
const isLoading = ref(false);
const isReady = ref(false);
const form = reactive({
  inventory_type: props.item.inventory.type.id,
  inventory_id: props.item.inventory.id,
  date: props.item.date,
  inventory_photo: null,
  desc: props.item.desc,
  preview: props.item.inventory_photo,
  status: props.item.status,
});

onMounted(async () => {
  apiDataStore.inventories.length == 0
    ? await apiData.getInventoriesByType(props.item.inventory.type.id)
    : "";
  isReady.value = true;
});

const changePhoto = (data) => {
  form.preview = URL.createObjectURL(data);
  form.inventory_photo = data;
};

const update = () => {
  isLoading.value = true;
  profileApi
    .updateDebit(profileStore.profile.id, props.item.id, form)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Form @submit="update()">
    <div class="row" v-if="isReady">
      <Select
        v-model="form.inventory_type"
        :label="$t('inventoryType')"
        name="inventory_type"
        rules="required"
        :options="apiDataStore.inventoryTypes"
        :inline="false"
        mainClass="col-sm-6 mb-4"
        @selected="apiData.getInventoriesByType(form.inventory_type)"
      />
      <Select
        v-model="form.inventory_id"
        :label="$t('inventory')"
        name="inventory"
        rules="required"
        :options="apiDataStore.inventories"
        :inline="false"
        mainClass="col-sm-6 mb-4"
      />
      <div class="col-sm-6 mb-4">
        <label for="status" class="col-form-label">{{ $t("status") }}</label>
        <select
          v-model="form.status"
          id="status"
          class="form-select form-select-solid"
          aria-label="Select example"
        >
          <option value="debit_employee">{{ $t("debit_employee") }}</option>
          <option value="not_using">{{ $t("not_using") }}</option>
          <option value="fixing">{{ $t("fixing") }}</option>
          <option value="broken">{{ $t("broken") }}</option>
        </select>
      </div>

      <DateInput
        v-model="form.date"
        :label="$t('date')"
        name="date"
        mainClass="col-sm-6 mb-4"
        :inline="false"
      />
      <div v-if="form.preview">
        <img
          :src="form.preview"
          style="width: 100px; height: 100px"
          alt="image"
        />
        <i
          @click="(form.preview = null), (form.inventory_photo = null)"
          class="fas fa-times position-absolute fs-3 p-3 rounded text-daner text-hover-primary cursor-pointer"
        ></i>
      </div>
      <FileInput
        :label="$t('inventoryPhoto')"
        name="inventory_photo"
        @handleUpdate="changePhoto"
        :inline="false"
        class="col-sm-10 mb-4"
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

    <Button
      :isLoading="isLoading"
      text="update"
      loadingText="updating"
      icon="fas fa-floppy-disk"
    />
  </Form>
</template>
