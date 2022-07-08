<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useProfileStore } from "@/store/Profile";
import { reactive, ref, defineProps, watch, computed } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const props = defineProps(["item"]);
const apiStore = useApiDataStore();

const isLoading = ref(false);
const form = reactive({
  file: null,
  date: null,
  issuer: null,
  desc: null,
});

const fileName = ref({
  title: null,
  url: null,
});

const selectedData = computed(() => {
  return props.item;
});

const setData = (value) => {
  form.date = [value.dates.start_date, value.dates.end_date];
  form.file = null;
  form.issuer = value.issuer;
  form.desc = value.desc;
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
    .updateReport(profileStore.profile.id, props.item.id, form)
    .then(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Form @submit="update()">
    <div class="row">
      <div class="col-sm-12 my-2 border p-3" v-if="fileName.title">
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
        mainClass="col-sm-12 mb-4"
        rules="required|mimes:doc,docx,pdf,xlsx,jpg,png,bmp,webp|size:2048"
      />

      <DateInput
        v-model="form.date"
        name="date"
        :label="$t('Select date')"
        rules="required"
        type="daterange"
        range-seperator="to"
        mainClass="col-sm-12 mb-4"
      />

      <Input
        v-model="form.issuer"
        :label="$t('issuer')"
        name="issuer"
        rules="required|max:255"
        :inline="false"
        mainClass="col-sm-12 mb-4"
      />

      <Textarea
        v-model="form.desc"
        :label="$t('desc')"
        name="desc"
        rules="max:500"
        :inline="false"
        mainClass="col-sm-12 mb-4"
        inputType="textarea"
      />
    </div>
    <Button
      :isLoading="isLoading"
      text="update"
      loadingText="updating"
      icon="fas fa-floppy-disk"
    />
  </Form>
</template>
