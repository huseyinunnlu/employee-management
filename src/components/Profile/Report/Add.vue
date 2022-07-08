<script setup>
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useProfileStore } from "@/store/Profile";
import { reactive, ref } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  file: null,
  date: null,
  issuer: null,
  desc: null,
});

const fileName = ref(null);

const handleFile = (data) => {
  form.file = data;
  fileName.value = data.name;
};

const add = () => {
  isLoading.value = true;
  profileApi
    .addReport(profileStore.profile.id, form)
    .then(() => {
      form.date = null;
      form.file = null;
      form.issuer = null;
      form.desc = null;
      fileName.value = null;
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
        <CModalTitle>{{ $t("addAttr", { attr: $t("report") }) }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="d-flex align-items-center my-2 border p-3" v-if="fileName">
          <span class="text-dark fw-bold fs-6 me-4">
            {{ fileName }}
          </span>
          <i
            class="fas fa-times text-primary cursor-pointer"
            @click="(form.file = null), (fileName = null)"
          ></i>
        </div>

        <FileInput
          :label="$t('file')"
          name="file"
          :inline="false"
          @handleUpdate="handleFile"
          mainClass="mb-4"
          rules="required|mimes:doc,docx,pdf,xlsx,jpg,png,bmp,webp|size:2048"
        />

        <DateInput
          v-model="form.date"
          name="date"
          :label="$t('Select date')"
          rules="required"
          type="daterange"
          range-seperator="to"
          mainClass="mb-4"
        />

        <Input
          v-model="form.issuer"
          :label="$t('issuer')"
          name="issuer"
          rules="required|max:255"
          :inline="false"
          mainClass="mb-4"
        />

        <Textarea
          v-model="form.desc"
          :label="$t('desc')"
          name="desc"
          rules="max:500"
          :inline="false"
          mainClass="mb-4"
        />
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
