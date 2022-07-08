<script setup>
import { mask } from "maska";
import { computed, defineProps } from "vue";
const props = defineProps(["item"]);

const phone = computed(() => {
  let maskedPhone = props.item.contact_phone
    ? mask(props.item.contact_phone, "+90(###) ### ## ##")
    : null;
  return maskedPhone;
});
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("absenceType") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.type.title }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("date") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark" v-html="props.item.date"></span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("dayCount") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{
          props.item.day_count != 0.5
            ? props.item.day_count
            : $t(props.item.day_type)
        }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("status") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder" :class="props.item.status.color">
        {{ $t(props.item.status.text) }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("contactPhone") }}:
    </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ phone }}
      </span>
    </div>
  </div>
</template>
