<script setup>
import { reactive, defineProps } from "vue";

const props = defineProps(["activeTab"]);
const tabs = reactive(["details", "edit"]);
</script>
<template>
  <CNav variant="tabs" role="tablist" class="mb-4">
    <CNavItem v-for="(tab, index) in tabs" :key="index" class="text-dark">
      <CNavLink
        href="javascript:void(0);"
        :active="activeTab === tab"
        @click="$emit('changePage', tab)"
      >
        {{ $t(tab) }}
      </CNavLink>
    </CNavItem>
  </CNav>
</template>
