<script setup>
import { useApiData } from "@/store/ApiServices/ApiData";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileStore } from "@/store/Profile";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const apiData = useApiData();
const profileApi = useProfileApi();
const profileStore = useProfileStore();
const apiStore = useApiDataStore();
const isLoading = ref(false);
const isReady = ref(false);
const route = useRoute();
const addModal = ref(false);
const form = reactive({
  type_id: route.query.type_id || null,
  file: null,
  desc: null,
  is_see_document: true,
});

const fileName = ref(null);

const handleFile = (data) => {
  form.file = data;
  fileName.value = data.name;
};

onMounted(async () => {
  const targetId = route.query.target_id || null;
  if (targetId && targetId == "document_add") {
    addModal.value = true;
  }
  await apiData.getDocumentTypes();

  isReady.value = true;
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addDocument(profileStore.profile.id, form)
    .then(() => {
      form.type_id = null;
      form.file = null;
      form.desc = null;
      form.is_see_document = true;
      fileName.value = null;
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
    <Form @submit="add">
      <CModalHeader>
        <CModalTitle>{{ $t("addAttr", { attr: $t("document") }) }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="row" v-if="isReady">
          <Select
            v-model="form.type_id"
            :label="$t('documentType')"
            name="document_type"
            rules="required"
            :options="apiStore.document_types"
            :inline="false"
            mainClass="col-sm-12 mb-4"
          />

          <div
            class="d-flex align-items-center my-2 border py-3"
            v-if="fileName"
          >
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
            mainClass="col-sm-12 mb-4"
            rules="required|mimes:doc,docx,pdf,xlsx,bmp,png,jpg,jpeg,webp|size:2048"
          />

          <Textarea
            v-model="form.desc"
            :label="$t('desc')"
            name="desc"
            rules="max:500"
            :inline="false"
            mainClass="mb-4"
            inputType="textarea"
          />

          <div class="mb-10">
            <div class="form-check form-check-custom form-check-solid">
              <input
                v-model="form.is_see_document"
                class="form-check-input"
                type="checkbox"
                id="canUserSeeFile"
              />
              <label class="form-check-label" for="canUserSeeFile">{{
                $t("canUserSeeFile")
              }}</label>
            </div>
          </div>
        </div>
        <div class="text-center align-items-center py-5" v-else>
          <CSpinner color="success" />
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
