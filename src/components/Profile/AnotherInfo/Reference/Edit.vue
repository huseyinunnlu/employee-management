<script setup>
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";

const profileApi = useProfileApi();
const profileStore = useProfileStore();

const props = defineProps(["selectedData", "showModal"]);
const isLoading = ref(false);
const form = reactive({
  full_name: null,
  work_place_name: null,
  experience: null,
  phone: null,
});
const emit = defineEmits(["closeModal"]);

const selectedData = computed(() => {
  return props.selectedData;
});

const setData = (data) => {
  form.full_name = data.full_name;
  form.work_place_name = data.work_place_name;
  form.experience = data.experience;
  form.phone = data.phone;
};
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
    .updateReference(profileStore.profile.id, props.selectedData.id, form)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <CModal :visible="props.showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{ $t("editAttr", { attr: $t("reference") }) }}</CModalTitle>
    </CModalHeader>
    <Form @submit="update()">
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
