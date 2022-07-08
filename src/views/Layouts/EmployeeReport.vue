<script setup>
import Navbar from "@/components/Admin/EmployeeReport/Navbar.vue";
</script>
<template>
  <div class="card">
    <div class="card-header p-2">
      <Navbar />
    </div>
    <div class="card-body">
      <router-view></router-view>
    </div>
  </div>
</template>
