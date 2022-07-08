<script setup>
import { educationStatuses } from "@/core/datas/data";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref, defineProps, watch, computed } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const props = defineProps(["item"]);

const isLoading = ref(false);
const isReady = ref(false);
const form = reactive({
  status: null,
  file: null,
  graduated_school: null,
  department: null,
  certificate_grade: null,
  start_year: null,
  finish_year: null,
});

const fileName = ref({
  title: null,
  url: null,
});

const selectedData = computed(() => {
  return props.item;
});

const setData = (value) => {
  form.status = "primary";
  form.file = null;
  form.graduated_school = value.graduated_school;
  form.department = value.department;
  form.start_year = value.start_year;
  form.certificate_grade = value.certificate_grade;
  form.finish_year = value.finish_year;
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
    .updateEducationInfo(profileStore.profile.id, props.item.id, form)
    .then(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <div class="content my-5 row">
    <Form @submit="update">
      <Select
        v-model="form.status"
        :label="$t('educationStatus')"
        name="status"
        rules="required"
        mainClass="mb-4"
        :inline="false"
        :options="educationStatuses"
      />

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
        :label="$t('diploma')"
        name="file"
        :inline="false"
        @handleUpdate="handleFile"
        mainClass="col-sm-12 mb-4"
        rules="mimes:doc,docx,pdf,xlsx,bmp,png,jpeg,jpg,webp|size:2048"
      />

      <Input
        v-model="form.graduated_school"
        :label="$t('graduatedSchool')"
        name="graduated_school"
        rules="required|max:255"
        mainClass="mb-4"
        :inline="false"
      />

      <Input
        v-model="form.department"
        :label="$t('schoolDepartment')"
        name="department"
        rules="max:255"
        mainClass="mb-4"
        :inline="false"
      />

      <Input
        v-model="form.certificate_grade"
        :label="$t('diplomaGrade')"
        name="certificate_grade"
        mainClass="mb-4"
        inputType="number"
        rules="max:11"
        :inline="false"
      />

      <Input
        v-model="form.start_year"
        :label="$t('startYear')"
        name="start_year"
        :rules="`required|max:4|max_value:${
          form.finish_year || 0
        }|min_value:1900`"
        mainClass="mb-4"
        :inline="false"
        inputType="number"
      />
      <Input
        v-model="form.finish_year"
        :label="$t('finishYear')"
        name="finish_year"
        :rules="`required|max:4|max_value:2100|min_value:${
          form.start_year || 0
        }`"
        mainClass="mb-4"
        :inline="false"
        inputType="number"
      />
      <Button
        :isLoading="isLoading"
        text="update"
        loadingText="updating"
        icon="fas fa-floppy-disk"
      />
    </Form>
  </div>
</template>
