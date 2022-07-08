<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarStore.sidebarUnfoldable"
    :visible="sidebarStore.sidebarVisible"
    @visible-change="sidebarStore.updateSidebarVisible"
  >
    <CSidebarBrand>
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      />
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="sidebarStore.toggleUnfoldable"
    />
  </CSidebar>
</template>

<script setup>
import { AppSidebarNav } from "./AppSidebarNav";
import { logoNegative } from "@/assets/brand/logo-negative";
import { sygnet } from "@/assets/brand/sygnet";
import { useSidebarStore } from "@/store/Layout/sidebar";

const sidebarStore = useSidebarStore();
</script>
