<script setup>
import { ref, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const props = defineProps(["paginationData"]);

const pageCount = ref(route.query.page_count || 15);
const page = ref(route.query.page || 1);

const changePageCount = () => {
  router.replace({
    name: route.name,
    query: { ...route.query, ...{ page_count: pageCount.value } },
  });
};
const changePage = (data) => {
  const query = data.split("?");
  const page = query[query.length - 1];
  router.replace({
    name: route.name,
    query: { ...route.query, ...{ page: page.replace("page=", "") } },
  });
};
</script>
<template>
  <div class="d-flex justify-content-between mt-2">
    <div class="form-group">
      <select
        class="form-select form-select"
        style="width: 150px"
        v-model="pageCount"
        @change="changePageCount()"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="15">15</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
    </div>
    <ul class="pagination" v-if="paginationData.length > 0">
      <li
        class="page-item"
        :class="(!i.url ? 'disabled' : '', i.active ? 'active' : '')"
        :disabled="!i.url"
        v-for="(i, index) in paginationData"
        :key="index"
        @click="i.url ? changePage(i.url) : ''"
        style="cursor: pointer"
      >
        <a
          class="page-link border"
          v-html="i.label"
          :class="i.active ? 'bg-success' : 'text-dark'"
        ></a>
      </li>
    </ul>
  </div>
</template>
