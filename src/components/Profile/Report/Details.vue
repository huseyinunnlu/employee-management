<script setup>
import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("file") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        <a :href="props.item.url" target="__blank">
          {{ props.item.title }}
        </a>
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("date") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.date }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("issuer") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.issuer }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("createdAt") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.created_at }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("desc") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.desc }}
      </span>
    </div>
  </div>
</template>
