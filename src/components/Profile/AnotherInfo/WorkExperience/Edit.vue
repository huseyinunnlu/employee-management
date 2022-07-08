<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileStore } from "@/store/Profile";
import { reactive, ref, defineProps, computed, defineEmits, watch } from "vue";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";

const profileApi = useProfileApi();
const profileStore = useProfileStore();
const apiStore = useApiDataStore();

const props = defineProps(["selectedData", "showModal"]);
const isLoading = ref(false);

const form = reactive({
  work_place_name: null,
  experience: null,
  start_date: null,
  leave_date: null,
  leave_reason: null,
});

const selectedData = computed(() => {
  return props.selectedData;
});

const setData = (data) => {
  form.work_place_name = data.work_place_name;
  form.experience = data.experience;
  form.start_date = data.start_date;
  form.leave_date = data.leave_date;
  form.leave_reason = data.leave_reason;
};
const emit = defineEmits(["closeModal"]);
watch(
  selectedData,
  (value) => {
    setData(value);
  },
  { immediate: true }
);

const update = () => {
  isLoading.value = true;
  profileApi
    .updateWorkExperience(profileStore.profile.id, props.selectedData.id, form)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <CModal :visible="props.showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("editAttr", { attr: $t("certificate") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="update()">
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
        <CButton color="secondary" @click="$emit('closeModal')">
          Close
        </CButton>
        <Button
          :isLoading="isLoading"
          text="update"
          loadingText="updating"
          icon="fas fa-floppy-disk"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
