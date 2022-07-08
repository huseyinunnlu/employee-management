<script setup>
import { useProfileApi } from "@/store/ApiServices/ProfileApi";

import { useProfileStore } from "@/store/Profile";
import { reactive, ref } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  full_name: null,
  work_place_name: null,
  experience: null,
  phone: null,
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addReference(profileStore.profile.id, form)
    .then(() => {
      form.full_name = null;
      form.work_place_name = null;
      form.experience = null;
      form.phone = null;
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
        <CModalTitle>
          {{ $t("addAttr", { attr: $t("reference") }) }}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Input
          v-model="form.full_name"
          :label="$t('fullName')"
          name="full_name"
          rules="required|max:255"
          mainClass="mb-4"
          :inline="false"
        />
        <Input
          v-model="form.work_place_name"
          :label="$t('workplaceName')"
          name="work_place_name"
          rules="required|max:255"
          mainClass="mb-4"
          :inline="false"
        />
        <Input
          v-model="form.experience"
          :label="$t('degree')"
          name="experience"
          rules="max:255"
          mainClass="mb-4"
          :inline="false"
        />
        <Input
          v-model="form.phone"
          :label="$t('phone')"
          name="phone"
          :isMask="true"
          mask="+90(###) ### ## ##"
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
