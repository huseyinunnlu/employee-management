<script setup>
import Item from "./Item.vue";

import { useMusteriApi } from "@/store/ApiServices/MusteriApi";
import { useMusteriStore } from "@/store/Admin/Company/Musteri";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const musteriStore = useMusteriStore();
const musteriApi = useMusteriApi();

onBeforeMount(() => {
  musteriApi.getCompanies(route.params.id);
});
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
      <thead>
        <tr>
          <th>{{ $t("title") }}</th>
          <th>{{ $t("actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="item in musteriStore.companies"
          :key="item.id"
          :item="item"
        />
      </tbody>
    </table>
  </div>
</template>
