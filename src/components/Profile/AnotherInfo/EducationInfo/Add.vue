<script setup>
// import ProfileApiService from "@/core/services/ApiServices/ProfileApiService";
import { educationStatuses } from "@/core/datas/data";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  status: null,
  file: null,
  graduated_school: null,
  department: null,
  start_year: null,
  finish_year: null,
  certificate_grade: null,
});

const fileName = ref(null);

const handleFile = (data) => {
  form.file = data;
  fileName.value = data.name;
};

const add = () => {
  isLoading.value = true;
  profileApi
    .addEducationInfo(profileStore.profile.id, form)
    .then(() => {
      form.file = null;
      form.status = null;
      form.graduated_school = null;
      form.department = null;
      form.start_year = null;
      form.finish_year = null;
      form.certificate_grade = null;
      fileName.value = null;
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
      <CModalTitle>{{
        $t("addAttr", { attr: $t("educationInfo") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="add()">
      <CModalBody
        ><div class="row">
          <Select
            v-model="form.status"
            :label="$t('educationStatus')"
            name="status"
            rules="required"
            mainClass="mb-4"
            :inline="false"
            :options="educationStatuses"
          />

          <div
            class="d-flex align-items-center my-4 border py-3"
            v-if="fileName"
          >
            <span class="text-dark fw-bold fs-6 me-4">
              {{ fileName }}
            </span>
            <i
              class="fas fa-times text-primary cursor-pointer"
              @click="(form.file = null), (fileName = null)"
            ></i>
          </div>

          <FileInput
            :label="$t('diploma')"
            name="file"
            :inline="false"
            @handleUpdate="handleFile"
            mainClass="col-sm-12 mb-4"
            rules="mimes:doc,docx,pdf,xlsx,png,jpeg,bmp,webp|size:2048"
          />

          <Input
            v-model="form.graduated_school"
            :label="$t('graduatedSchool')"
            name="graduated_school"
            rules="required|required|max:255"
            mainClass="mb-4"
            :inline="false"
          />

          <Input
            v-model="form.department"
            :label="$t('schoolDepartment')"
            name="department"
            mainClass="mb-4"
            rules="max:255"
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
          /></div
      ></CModalBody>
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
