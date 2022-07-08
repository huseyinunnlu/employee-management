<script setup>
import Navbar from "@/components/Admin/CompanyTree/Musteri/Navbar.vue";

import { useMusteriApi } from "@/store/ApiServices/MusteriApi";
import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const musteri = useMusteriStore().musteri;
const musteriApi = useMusteriApi();
const isReady = ref(false);

const isLoading = ref(true);
onBeforeMount(async () => {
  const routeId = route.params.id;

  if (routeId != musteri.id) {
    await musteriApi
      .get(routeId)
      .catch(() => {
        router.push({ name: "company-cards" });
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
  isReady.value = true;
});
</script>
<template>
  <div class="card-header d-flex justify-content-between align-items-center">
    <h4 class="card-title">
      {{ $t("detailsAttr", { attr: $t("musteri") }) }}
    </h4>
    <router-link class="btn btn-info text-light" :to="{ name: 'company-cards' }"
      ><i class="fas fa-arrow-left"></i> {{ $t("goBack") }}</router-link
    >
  </div>
  <div class="card-body">
    <Navbar />
    <router-view v-if="isReady"></router-view>
    <div class="text-center align-items-center py-5" v-else>
      <CSpinner color="success" />
    </div>
  </div>
</template>
