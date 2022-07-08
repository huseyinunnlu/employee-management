<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileStore } from "@/store/Profile";
import { reactive, ref } from "vue";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const apiStore = useApiDataStore();

const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  work_place_name: null,
  experience: null,
  start_date: null,
  leave_date: null,
  leave_reason: null,
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addWorkExperience(profileStore.profile.id, form)
    .then(() => {
      form.work_place_name = null;
      form.experience = null;
      form.start_date = null;
      form.leave_date = null;
      form.leave_reason = null;
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
      <CModalTitle>
        {{ $t("addAttr", { attr: $t("workExperience") }) }}
      </CModalTitle>
    </CModalHeader>
    <Form @submit="add()">
      <CModalBody>
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
          rules="required|max:255"
          mainClass="mb-4"
          :inline="false"
        />
        <div class="row">
          <DateInput
            v-model="form.start_date"
            :label="$t('startDate')"
            name="start_date"
            rules="required"
            mainClass="mb-4 col-sm-6"
            :inline="false"
          />
          <DateInput
            v-model="form.leave_date"
            :label="$t('leaveDate')"
            name="leave_date"
            mainClass="mb-4 col-sm-6"
            :inline="false"
          />
        </div>
        <Input
          v-model="form.leave_reason"
          :label="$t('leaveReason')"
          name="leave_reason"
          rules="max:255"
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
