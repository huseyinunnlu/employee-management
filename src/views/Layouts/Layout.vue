<script setup>
import { CContainer } from "@coreui/vue";
import AppFooter from "@/Layout/AppFooter.vue";
import AppHeader from "@/Layout/AppHeader.vue";
import AppSidebar from "@/Layout/AppSidebar.vue";
</script>

<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
