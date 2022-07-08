<script setup>
import AppBreadcrumb from "./AppBreadcrumb.vue";
import AppHeaderDropdownAccnt from "./AppHeaderDropdownAccnt.vue";
import { logo } from "@/assets/brand/logo";
import { useSidebarStore } from "@/store/Layout/sidebar";
import { useAuthStore } from "@/store/Auth";

const sidebarStore = useSidebarStore();
const authStore = useAuthStore();
</script>

<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="sidebarStore.toggleSidebar">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <!-- <CNavItem>
          <CNavLink href="/dashboard"> Dashboard </CNavLink>
        </CNavItem> -->
      </CHeaderNav>
      <AppHeaderDropdownAccnt v-if="authStore.isAuth" />
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>
