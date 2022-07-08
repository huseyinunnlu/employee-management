<script setup>
import { defineProps } from "vue";
const props = defineProps(["item"]);
</script>

<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("fullName") }}: </label>
    <div class="col-lg-8">
      <router-link
        :to="{
          name: 'profile-index',
          params: {
            slug: props.item.user.slug,
          },
        }"
        class="fw-bolder"
      >
        {{ props.item.user.full_name }}
      </router-link>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("company") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.user.company || "-" }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("department") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.user.department || "-" }}
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
    <label class="col-lg-4 fw-bold text-muted">{{ $t("totalPrice") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        <td>
          <!-- {{
            vueNumberFormat(props.item.prices, {
              prefix: "",
              suffix: "₺",
              decimal: ".",
              thousand: "",
              precision: 2,
              acceptNegative: false,
            })
          }} -->
        </td>
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("status") }}: </label>
    <div class="col-lg-8">
      <span :class="`fw-bolder  text-${props.item.status_color}`">
        {{ $t(props.item.status) }}
      </span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("notes") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">
        {{ props.item.notes }}
      </span>
    </div>
  </div>
</template>
