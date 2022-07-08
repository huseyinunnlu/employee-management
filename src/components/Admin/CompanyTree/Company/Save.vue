<script setup>
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { useApiDataStore } from "@/store/Api/ApiData";
import { computed, defineProps, ref, watch } from "vue";

const props = defineProps(["data", "managers"]);

const treeStore = useTreeStore();
const apiStore = useApiDataStore();
const managerList = ref([]);
const cityTitle = ref(null);
const managerIds = computed(() => {
  return props.managers;
});

const logo = computed(() => {
  if (props.data.logo) {
    return URL.createObjectURL(props.data.logo);
  }

  return null;
});

watch(props.data, (value) => {
  if (value.city_id) {
    const city = apiStore.cities.find((item) => {
      return item.id == value.city_id;
    });
    cityTitle.value = city.title;
  } else {
    cityTitle.value = null;
  }
});

watch(props.managers, (value) => {
  if (value.length > 0) {
    value.forEach((item) => {
      managerList.value.unshift(
        treeStore.addUsers.find((user) => {
          return user.id == item;
        })
      );
    });
  } else {
    managerList.value = [];
  }
});
</script>
<template>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("logo") }}: </label>
    <div class="col-lg-8">
      <div
        class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
        v-if="logo"
      >
        <img :src="logo" style="width: 100px; height: 100px" alt="image" />
      </div>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("title") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ props.data.title }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("address") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ props.data.address }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("city") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark" v-if="apiStore.cities.length > 0">{{
        cityTitle
      }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("email") }}: </label>
    <div class="col-lg-8">
      <span class="fw-bolder text-dark">{{ props.data.email }}</span>
    </div>
  </div>
  <div class="row mb-2">
    <label class="col-lg-4 fw-bold text-muted">{{ $t("managers") }}: </label>
    <div class="col-lg-8">
      <span
        class="d-flex flex-column fw-bolder mb-4 text-dark"
        v-for="user in managerList"
        :key="user.id"
      >
        {{ user.full_name }}
      </span>
    </div>
  </div>
</template>
