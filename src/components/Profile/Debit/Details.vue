<script setup>
import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("inventoryPhoto") }}:
    </label>
    <div class="col-lg-8" v-if="props.item.inventory_photo">
      <div
        class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
      >
        <img
          style="width:100px height:100px"
          :src="props.item.inventory_photo"
        />
      </div>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted"
      >{{ $t("inventoryType") }}:
    </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{
        props.item.inventory.type.title
      }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("inventory") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ props.item.inventory.title }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("serie") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{
        props.item.inventory.serial || "-"
      }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("desc") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ props.item.desc }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("status") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark" v-if="props.item.status">{{
        $t(props.item.status)
      }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("date") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ props.item.date }}</span>
    </div>
  </div>
</template>
