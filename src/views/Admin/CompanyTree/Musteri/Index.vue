<script setup>
import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { formatString } from "@/core/helpers/StringHelpers";

const musteri = useMusteriStore().musteri;
</script>
<template>
  <div class="content" v-if="musteri">
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("title") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.title }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("address") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.address }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("zipcode") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.zipcode }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("phone") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{
          formatString(musteri.phone)
        }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("fax") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ formatString(musteri.fax) }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("email") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.email }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("tax") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.tax }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("taxNo") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.tax_no }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("website") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{ musteri.website }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("workplaceRegistrationRumber") }}:
      </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{
          musteri.workplace_registration_number
        }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("registrationNo/mersisNo") }}:
      </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{
          musteri.registration_no || null
        }}</span>
      </div>
    </div>
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("iban") }}: </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">{{
          formatString(musteri.iban, "iban")
        }}</span>
      </div>
    </div>
  </div>
</template>
