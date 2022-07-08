<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref, defineProps, watch, computed, defineEmits } from "vue";

const profileStore = useProfileStore();
const apiStore = useApiDataStore();
const profileApi = useProfileApi();
const props = defineProps(["selectedData", "showModal"]);
const isLoading = ref(false);

const form = reactive({
  language_id: null,
  status: null,
});

const selectedData = computed(() => {
  return props.selectedData;
});

const setData = (data) => {
  form.language_id = data.language_id;
  form.status = data.status;
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
    .updateForeignLanguage(profileStore.profile.id, props.selectedData.id, form)
    .then(() => {
      emit("closeModal");
    })
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
        <Select
          v-model="form.language_id"
          :label="$t('language')"
          name="language_id"
          rules="required"
          mainClass="mb-4"
          :inline="false"
          :options="apiStore.languages"
        />

        <div class="d-flex justify-content-around align-items-center">
          <div class="form-check form-check-custom form-check-solid">
            <input
              class="form-check-input"
              type="radio"
              value="beginner"
              v-model="form.status"
              id="beginner"
            />
            <label class="form-check-label" for="beginner">{{
              $t("beginner")
            }}</label>
          </div>
          <div class="form-check form-check-custom form-check-solid">
            <input
              class="form-check-input"
              type="radio"
              value="mid"
              v-model="form.status"
              id="mid"
            />
            <label class="form-check-label" for="mid">{{ $t("mid") }}</label>
          </div>
          <div class="form-check form-check-custom form-check-solid">
            <input
              class="form-check-input"
              type="radio"
              value="advanced"
              v-model="form.status"
              id="advanced"
            />
            <label class="form-check-label" for="advanced">{{
              $t("advanced")
            }}</label>
          </div>
        </div>
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
