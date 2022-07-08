<script setup>
import { defineProps, ref } from "vue";
import Item from "./Item.vue";
import Edit from "./Edit.vue";
import Add from "./Add.vue";
const props = defineProps(["item", "companyId", "expenseId"]);
const selectedData = ref(null);
const showModal = ref(false);
const goDetails = (data) => {
  selectedData.value = props.item.find((item) => {
    return item.id == data;
  });
  setTimeout(() => {
    showModal.value = true;
  }, 100);
};
</script>
<template>
  <div class="content my-3 row">
    <Add :companyId="props.companyId" :expenseId="props.expenseId" />

    <div class="table-responsive">
      <table
        class="table table-hover table-striped mt-3"
        style="cursor: pointer"
      >
        <thead>
          <tr>
            <th>{{ $t("expenseType") }}</th>
            <th>{{ $t("expenseDate") }}</th>
            <th>{{ $t("expensePrice") }}</th>
            <th>{{ $t("desc") }}</th>
            <th>{{ $t("file") }}</th>
            <th>{{ $t("actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <Item
            v-for="item in props.item"
            :key="item.id"
            :item="item"
            @show="goDetails"
          />
        </tbody>
      </table>
    </div>
  </div>
  <Edit
    :showModal="showModal"
    v-if="selectedData"
    :selectedData="selectedData"
    @closeModal="showModal = false"
  />
</template>
