<script setup>
import Edit from "@/components/Admin/CompanyTree/Musteri/Edit.vue";

import { useMusteriStore } from "@/store/Admin/Company/Musteri";

const musteri = useMusteriStore();
</script>
<template>
  <div class="row col-md-10 offset-md-1">
    <Edit v-if="Object.values(musteri).length > 0" />
  </div>
</template>
