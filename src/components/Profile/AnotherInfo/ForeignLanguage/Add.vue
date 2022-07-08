<script setup>
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { reactive, ref } from "vue";

const profileStore = useProfileStore();
const profileApi = useProfileApi();
const apiStore = useApiDataStore();
const isLoading = ref(false);
const addModal = ref(false);
const form = reactive({
  language_id: null,
  status: null,
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addForeignLanguage(profileStore.profile.id, form)
    .then(() => {
      form.language_id = null;
      form.status = null;
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
        {{ $t("addAttr", { attr: $t("foreignLanguage") }) }}
      </CModalTitle>
    </CModalHeader>
    <Form @submit="add()">
      <CModalBody>
        <div class="row">
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
        </div>
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
