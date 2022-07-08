<script setup>
import Edit from "@/components/Admin/CompanyTree/Company/Edit.vue";

import { useCompanyStore } from "@/store/Admin/Company/Company";

const company = useCompanyStore();
</script>
<template>
  <div class="row col-md-10 offset-md-1">
    <Edit />
  </div>
</template>
