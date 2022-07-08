<script setup>
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { onBeforeMount, onMounted } from "vue";
import Item from "./Item.vue";

const treeStore = useTreeStore().tree;

const duplicateData = () => {
  treeStore.value = [...treeStore, ...treeStore];
};
</script>
<template>
  <Item
    v-for="(item, index) in treeStore"
    :key="item.id"
    :item="item"
    :index="index"
  />
</template>
