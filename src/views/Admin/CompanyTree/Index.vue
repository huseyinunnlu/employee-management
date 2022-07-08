<script setup>
import List from "@/components/Admin/CompanyTree/List.vue";

import { useTreeApi } from "@/store/ApiServices/TreeApi";
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { onBeforeMount, ref } from "vue";

const treeStore = useTreeStore();
const treeApi = useTreeApi();

onBeforeMount(async () => {
  treeStore.tree = [];
  await treeApi.getCompanyTree();
});
</script>
<template>
  <div class="m-4">
    <div class="d-flex justify-content-end gap-2">
      <router-link
        class="btn btn-success text-light"
        :to="{ name: 'add-company' }"
      >
        <i class="fas fa-briefcase me-2"></i
        >{{ $t("addAttr", { attr: $t("company") }) }}
      </router-link>
      <router-link
        class="btn btn-success text-light"
        :to="{ name: 'add-department' }"
      >
        <i class="fas fa-sitemap me-2"></i
        >{{ $t("addAttr", { attr: $t("department") }) }}
      </router-link>
      <router-link
        class="btn btn-success text-light"
        :to="{ name: 'add-workplace' }"
      >
        <i class="fas fa-map-marker-alt me-2"></i
        >{{ $t("addAttr", { attr: $t("workPlace") }) }}
      </router-link>
    </div>
    <List v-if="treeStore.tree.length > 0" />
  </div>
</template>
