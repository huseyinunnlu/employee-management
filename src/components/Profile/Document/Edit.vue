<script setup>
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useApiData } from "@/store/ApiServices/ApiData";
import { useApiDataStore } from "@/store/Api/ApiData";

import { reactive, ref, defineProps, computed, watch } from "vue";

const apiData = useApiData();
const profileApi = useProfileApi();
const apiDataStore = useApiDataStore();
const profileStore = useProfileStore();
const props = defineProps(["item"]);
const isLoading = ref(false);
const isReady = ref(false);
const form = reactive({
  type_id: null,
  file: null,
  desc: null,
  is_see_document: null,
});

const fileName = ref({
  title: null,
  url: null,
});

const selectedData = computed(() => {
  return props.item;
});

const setData = (value) => {
  form.type_id = value.type_id;
  form.file = null;
  form.desc = value.desc;
  form.is_see_document = value.is_see_document;
  fileName.value.title = value.title;
  fileName.value.url = value.url;
};

watch(
  selectedData,
  (value) => {
    setData(value);
  },
  { immediate: true }
);

const handleFile = (data) => {
  form.file = data;
  fileName.value.title = data.name;
  fileName.value.url = URL.createObjectURL(data);
};

const update = () => {
  isLoading.value = true;
  profileApi
    .updateDocument(profileStore.profile.id, props.item.id, form)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Form @submit="update()">
    <Select
      v-model="form.type_id"
      :label="$t('documentType')"
      name="document_type"
      rules="required"
      :options="apiDataStore.document_types"
      :inline="false"
      mainClass="mb-4"
    />

    <div class="col-sm-12 mb-4 border p-3" v-if="fileName.title">
      <span class="d-flex align-items-center text-dark fw-bold fs-6">
        <a :href="fileName.url" target="__blank" class="me-4">
          {{ fileName.title }}
        </a>
        <i
          class="fas fa-times text-danger cursor-pointer"
          @click="
            fileName = {
              title: null,
              url: null,
            };
            form.file = null;
          "
        ></i>
      </span>
    </div>

    <FileInput
      v-if="!fileName.title"
      :label="$t('file')"
      name="file"
      :inline="false"
      @handleUpdate="handleFile"
      mainClass="mb-4"
      rules="required|mimes:doc,docx,pdf,xlsx,jpg,jpeg,bmp,webp|size:2048"
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

    <div class="mb-4">
      <div class="form-check form-check-custom form-check-solid">
        <input
          v-model="form.is_see_document"
          class="form-check-input"
          type="checkbox"
          id="canUserSeeFile"
        />
        <label class="form-check-label" for="canUserSeeFile">{{
          $t("canUserSeeFile")
        }}</label>
      </div>
    </div>
    <Button
      :isLoading="isLoading"
      text="update"
      loadingText="updating"
      icon="fas fa-floppy-disk"
    />
  </Form>
</template>
