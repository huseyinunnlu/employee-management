<script setup>
import { useAuthStore } from "@/store/Auth";
import { useProfileStore } from "@/store/Profile";
import { reactive, ref, defineProps, watch, computed } from "vue";
import { absenceDayTypes } from "@/core/datas/data";
import { useApiDataStore } from "@/store/Api/ApiData";
import { useProfileApi } from "@/store/ApiServices/ProfileApi";
import { useApiData } from "@/store/ApiServices/ApiData";

const apiStore = useApiDataStore();
const apiData = useApiData();
const profileApi = useProfileApi();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const props = defineProps(["item"]);

const isLoading = ref(false);
const form = reactive({
  type_id: null,
  date: null,
  start_time: null,
  end_time: null,
  day_type: null,
  contact_phone: null,
  place: null,
  status: "pending",
});

const setData = (value) => {
  form.type_id = value.type.id;
  form.date = [value.dates.start_date, value.dates.end_date];
  form.start_time = value.dates.start_time;
  form.end_time = value.dates.end_time;
  form.day_type = value.day_type;
  form.contact_phone = value.contact_phone;
  form.place = value.place;
  form.status = value.status.text;
  form.is_signed = value.is_signed;
};

const selectedData = computed(() => {
  return props.item;
});

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
    .updateAbsence(profileStore.profile.id, props.item.id, form)
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <Form @submit="update()">
    <div class="row">
      <Select
        v-model="form.type_id"
        :label="$t('absenceType')"
        name="type_id"
        :inline="false"
        mainClass="col-sm-6 mb-4"
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
          form.date && form.date[0] == form.date[1] && form.day_type == 'hourly'
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
        mainClass="col-sm-6 mb-4"
      />
      <div class="form-group mb-4 col-sm-6" v-if="authStore.role === 1">
        <label class="fs-6 fw-bold form-label mb-4">{{ $t("status") }}</label>
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
      <Button
        :isLoading="isLoading"
        text="update"
        loadingText="updating"
        icon="fas fa-floppy-disk"
      />
    </div>
  </Form>
</template>
