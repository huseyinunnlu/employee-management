<script setup>
import { absenceDayTypes } from "@/core/datas/data";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileStore } from "@/store/Profile";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useApiData } from "@/store/ApiServices/ApiData";
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/store/Auth";

const profileStore = useProfileStore();
const apiStore = useApiDataStore();
const authStore = useAuthStore();
const apiData = useApiData();
const profileApi = useProfileApi();

const isLoading = ref(false);
const isReady = ref(false);
const addModal = ref(false);
const form = reactive({
  type_id: null,
  date: null,
  start_time: null,
  end_time: null,
  day_type: "full",
  contact_phone: null,
  place: null,
  status: "pending",
});

onMounted(async () => {
  await apiData.getAbsenceTypes(profileStore.profile.company_id || null);
  isReady.value = true;
});

const add = () => {
  isLoading.value = true;
  profileApi
    .addAbsence(profileStore.profile.id, form)
    .then(() => {
      form.type_id = null;
      form.date = null;
      form.start_time = null;
      form.end_time = null;
      form.day_type = "full";
      form.contact_phone = null;
      form.place = null;
      form.status = "pending";
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
    :text="authStore.role === 1 ? 'add' : 'addAbsenceRequest'"
    icon="fas fa-plus"
  />

  <CModal size="lg" :visible="addModal" @close="addModal = false">
    <CModalHeader>
      <CModalTitle>{{
        authStore.role === 1
          ? $t("addAttr", { attr: $t("absence") })
          : $t("addAbsenceRequest")
      }}</CModalTitle>
    </CModalHeader>
    <Form @submit="add()">
      <CModalBody>
        <div class="row" v-if="isReady">
          <Select
            v-model="form.type_id"
            :label="$t('absenceType')"
            name="type_id"
            :inline="false"
            mainClass="col-sm-6 mb-4 row"
            rules="required"
            :options="apiStore.absenceTypes"
          />
          <DateInput
            v-model="form.date"
            name="date"
            :label="$t('Select date')"
            rules="required"
            type="daterange"
            range-seperator="to"
            mainClass="col-sm-6 mb-4"
          />

          <Select
            v-if="form.date && form.date[0] == form.date[1]"
            v-model="form.day_type"
            name="day_type"
            :label="$t('dayType')"
            :inline="false"
            mainClass="col-sm-6 mb-4"
            rules="required"
            :options="absenceDayTypes"
          />
          <div
            v-if="
              form.date &&
              form.date[0] == form.date[1] &&
              form.day_type == 'hourly'
            "
          >
            <Input
              v-model="form.start_time"
              name="start_time"
              :label="$t('startTime')"
              :inline="false"
              mainClass="col-sm-6 mb-4"
              rules="required"
              :isMask="true"
              mask="##:##"
              placeholder="00:00"
            />
            <Input
              v-model="form.end_time"
              name="end_time"
              :label="$t('endTime')"
              :inline="false"
              mainClass="col-sm-6 mb-4"
              rules="required"
              :isMask="true"
              mask="##:##"
              placeholder="00:00"
            />
          </div>
          <Input
            v-model="form.contact_phone"
            name="contact_phone"
            :label="$t('contactPhone')"
            :inline="false"
            mainClass="col-sm-6 mb-4"
            :isMask="true"
            mask="+90(###) ### ## ##"
          />
          <Input
            v-model="form.place"
            name="place"
            :label="$t('place')"
            :inline="false"
            rules="max:255"
            mainClass="col-sm-6 mb-4"
          />
          <div class="form-group mb-4 col-sm-6" v-if="authStore.role === 1">
            <label class="fs-6 fw-bold form-label mb-4">{{
              $t("status")
            }}</label>
            <div class="d-flex justify-content-around align-items-center">
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="accepted"
                  id="accepted"
                  v-model="form.status"
                />
                <label class="form-check-label" for="accepted">{{
                  $t("accepted")
                }}</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="rejected"
                  id="rejected"
                  v-model="form.status"
                />
                <label class="form-check-label" for="rejected">{{
                  $t("rejected")
                }}</label>
              </div>
              <div class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  value="pending"
                  id="pending"
                  v-model="form.status"
                />
                <label class="form-check-label" for="pending">{{
                  $t("pending")
                }}</label>
              </div>
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
