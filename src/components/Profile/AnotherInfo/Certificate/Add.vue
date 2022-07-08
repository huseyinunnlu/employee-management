<script setup>
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref } from "vue";

const profileStore = useProfileStore();
const profileApi = useProfileApi();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  title: null,
  issuer: null,
  giving_date: null,
  finish_date: null,
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addCertificate(profileStore.profile.id, form)
    .then(() => {
      form.title = null;
      form.issuer = null;
      form.giving_date = null;
      form.finish_date = null;
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
        $t("addAttr", { attr: $t("certificate") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="add()">
      <CModalBody>
        <Input
          v-model="form.title"
          :label="$t('certificateName')"
          name="title"
          rules="required|max:255"
          mainClass="mb-4"
          :inline="false"
        />
        <Input
          v-model="form.issuer"
          :label="$t('issuer')"
          name="issuer"
          rules="required|max:255"
          mainClass="mb-4"
          :inline="false"
        />
        <DateInput
          v-model="form.giving_date"
          :label="$t('givingDate')"
          name="giving_date"
          mainClass="mb-4"
          rules="required"
          :inline="false"
        />
        <DateInput
          v-model="form.finish_date"
          :label="$t('finishDateInput')"
          name="finishDate"
          mainClass="mb-4"
          :inline="false"
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
