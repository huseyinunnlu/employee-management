<script setup>
import { reactive, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  tableHead: { type: Array },
  routeName: { type: String },
});

const currentSort = reactive({
  column: route.query.sortColumn || "created_at",
  type: route.query.type || "desc",
});

const sort = (column) => {
  const query = route.query;
  if (currentSort.column == column) {
    currentSort.type = currentSort.type == "desc" ? "asc" : "desc";
  } else {
    currentSort.column = column;
    currentSort.type = "desc";
  }

  router.replace({
    name: route.name,
    query: {
      ...query,
      sortColumn: currentSort.column,
      sortType: currentSort.type,
    },
  });
};
</script>

<template>
  <thead>
    <tr v-if="tableHead.length > 0">
      <th
        v-for="(cell, i) in tableHead"
        :key="i"
        @click="
          cell.sortable
            ? sort(cell.sortingField ? cell.sortingField : cell.key)
            : ''
        "
        :class="[
          'min-w-125px',
          cell.sortable !== false && 'sorting',
          currentSort.column == cell.key
            ? currentSort.type == 'desc'
              ? 'sorting_desc'
              : 'sorting_asc'
            : '',
        ]"
        tabindex="0"
        rowspan="1"
        colspan="1"
        style="cursor: pointer; white-space: nowrap"
      >
        {{ $t(cell.name) }}
        <i
          class="fas fa-sort"
          v-if="currentSort.column != cell.key && cell.sortable"
        ></i>
      </th>
    </tr>
  </thead>
</template>
