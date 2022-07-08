<script setup>
import List from "@/components/Admin/CompanyTree/Musteri/Company/List.vue";
</script>
<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <h4 class="card-title">{{ $t("companies") }}</h4>
    <router-link
      :to="{
        name: 'add-company',
        query: {
          musteri_id: $route.params.id,
        },
      }"
      class="btn btn-success text-light"
    >
      <i class="fas fa-plus"></i> {{ $t("add") }}
    </router-link>
  </div>
  <List />
</template>
