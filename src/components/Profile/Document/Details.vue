<script setup>
import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("documentType") }}:
    </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.type_title }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("document") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        <a :href="props.item.url" target="__blank">
          {{ props.item.title }}
        </a>
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("canUserSeeFile") }}:
    </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        <i
          class="fs-4"
          :class="
            props.item.is_see_document
              ? 'fas fa-check text-primary'
              : 'fas fa-times text-danger'
          "
        ></i>
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
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("createdAt") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.created_at }}
      </span>
    </div>
  </div>
</template>
