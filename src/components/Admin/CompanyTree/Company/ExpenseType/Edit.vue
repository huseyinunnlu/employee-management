<script setup>
import { useCompanyApi } from "@/store/ApiServices/CompanyApi";
import { useCompanyStore } from "@/store/Admin/Company/Company";
import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["selectedId", "showModal"]);
const emit = defineEmits(["closeModal"]);
const route = useRoute();
const companyStore = useCompanyStore();
const companyApi = useCompanyApi();

const isLoading = ref(false);
const form = reactive({
  title: null,
});

const setData = (value) => {
  form.title = value.title;
};

const selectedData = computed(() => {
  return props.selectedId;
});

watch(selectedData, (value) => {
  const selectedValue = companyStore.expenseTypes.find((item) => {
    return item.id == value;
  });

  setData(selectedValue);
});

const update = () => {
  isLoading.value = true;
  companyApi
    .updateExpenseType(route.params.id, props.selectedId, form)
    .then(() => {
      emit("closeModal");
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <CModal :visible="showModal" @close="$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>{{
        $t("editAttr", { attr: $t("expenseType") })
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="update">
      <CModalBody>
        <Input
          v-model="form.title"
          :label="$t('expenseType')"
          name="title"
          rules="required|max:255"
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
          @handleClick="update()"
        />
      </CModalFooter>
    </Form>
  </CModal>
</template>
