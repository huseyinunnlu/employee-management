<script setup>
import List from "@/components/Admin/Employees/List.vue";
import Filter from "@/components/Admin/Employees/Filter.vue";
</script>

<template>
  <div class="card">
    <div
      class="card-header d-flex justify-content-between align-items-center border-0"
    >
      <div class="card-title">
        <h3 class="text-dark">{{ $t("employeeList") }}</h3>
      </div>
      <div class="card-toolbar d-flex">
        <div class="me-2">
          <Filter></Filter>
        </div>
        <router-link
          :to="{ name: 'employees-add' }"
          type="button"
          class="btn btn-success text-light"
        >
          <i class="fas fa-plus"></i>
          {{ $t("addAttr", { attr: $t("employee") }) }}
        </router-link>
      </div>
    </div>
    <div class="card-body px-0">
      <List />
    </div>
  </div>
</template>
