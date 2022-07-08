<script setup>
import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>
<template>
  <div class="content my-5 row" v-if="props.item">
    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted">{{ $t("diploma") }}: </label>
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
        >{{ $t("educationStatus") }}:
      </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">
          {{ $t(props.item.status) }}
        </span>
      </div>
    </div>

    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("graduatedSchool") }}:
      </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">
          {{ props.item.graduated_school }}
        </span>
      </div>
    </div>

    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("schoolDepartment") }}:
      </label>
      <div class="col-lg-8" v-if="props.item.department">
        <span class="fw-bolder text-dark">
          {{ $t(props.item.department) }}
        </span>
      </div>
    </div>

    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ $t("diplomaGrade") }}:
      </label>
      <div class="col-lg-8" v-if="props.item.certificate_grade">
        <span class="fw-bolder text-dark">
          {{ props.item.certificate_grade }}
        </span>
      </div>
    </div>

    <div class="row mb-2">
      <label class="col-lg-4 fw-bold text-muted"
        >{{ `${$t("startYear")} - ${$t("finishYear")}` }}:
      </label>
      <div class="col-lg-8">
        <span class="fw-bolder text-dark">
          {{ `${props.item.start_year} - ${props.item.finish_year}` }}
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
  </div>
</template>
