<script setup>
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref, defineProps, defineEmits, computed, watch } from "vue";

const profileStore = useProfileStore();
const profileApi = useProfileApi();
const props = defineProps(["selectedData", "showModal"]);
const emit = defineEmits(["closeModal"]);

const isLoading = ref(false);
const selectedData = computed(() => {
  return props.selectedData;
});

const form = reactive({
  title: null,
  issuer: null,
  giving_date: null,
  finish_date: null,
});

const setData = (data) => {
  form.title = data.title;
  form.issuer = data.issuer;
  form.giving_date = data.giving_date;
  form.finish_date = data.finish_date;
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
    .updateCertificate(profileStore.profile.id, props.selectedData.id, form)
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
          mainClass="col-sm-12 mb-4"
          rules="required"
          :inline="false"
        />
        <DateInput
          v-model="form.finish_date"
          :label="$t('finishDateInput')"
          name="finishDate"
          mainClass="col-sm-12 mb-4"
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
