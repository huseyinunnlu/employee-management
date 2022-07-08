<script setup>
import { useAbsenceReportStore } from "@/store/Admin/AbsenceReport/AbsenceReport";
import { useApiDataStore } from "@/store/Api/ApiData";
import { absenceDayTypes } from "@/core/datas/data";

const apiDataStore = useApiDataStore();
const absenceReport = useAbsenceReportStore().form;
</script>
<template>
  <div class="row">
    <Select
      v-model="absenceReport.type_id"
      :label="$t('absenceType')"
      name="type_id"
      :inline="false"
      mainClass="col-sm-5 mb-4"
      rules="required"
      :options="apiDataStore.absenceTypes"
    />
    <DateInput
      v-model="absenceReport.date"
      name="date"
      :label="$t('Select date')"
      rules="required"
      type="daterange"
      range-seperator="to"
      mainClass="col-sm-7 mb-4"
    />

    <Select
      v-if="
        absenceReport.date && absenceReport.date[0] == absenceReport.date[1]
      "
      v-model="absenceReport.day_type"
      name="day_type"
      :label="$t('dayType')"
      :inline="false"
      mainClass="col-sm-6 mb-4"
      rules="required"
      :options="absenceDayTypes"
    />
    <div
      class="row"
      v-if="
        absenceReport.date &&
        absenceReport.date[0] == absenceReport.date[1] &&
        absenceReport.day_type == 'hourly'
      "
    >
      <Input
        v-model="absenceReport.start_time"
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
        v-model="absenceReport.end_time"
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
    <div class="form-group mb-4 col-sm-6">
      <label class="fs-6 fw-bold form-label mb-4">{{ $t("status") }}</label>
      <div class="d-flex justify-content-around align-items-center">
        <div class="form-check form-check-custom form-check-solid">
          <input
            class="form-check-input"
            type="radio"
            value="accepted"
            id="accepted"
            v-model="absenceReport.status"
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
            v-model="absenceReport.status"
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
            v-model="absenceReport.status"
          />
          <label class="form-check-label" for="pending">{{
            $t("pending")
          }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
