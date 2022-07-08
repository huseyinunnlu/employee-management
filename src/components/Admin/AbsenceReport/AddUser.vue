<script setup>
import AddItem from "./AddItem.vue";

import { useAbsenceReportStore } from "@/store/Admin/AbsenceReport/AbsenceReport";

const absenceReportStore = useAbsenceReportStore();

const addUser = (id) => {
  const index = absenceReportStore.form.users.indexOf(id);
  index > -1
    ? absenceReportStore.form.users.splice(index, 1)
    : absenceReportStore.form.users.push(id);
};
</script>
<template>
  <table class="table table-hover table-rounded table-striped border">
    <thead>
      <tr>
        <th>{{ $t("fullName") }}</th>
        <th>{{ $t("role") }}</th>
        <th>{{ $t("company") }}</th>
        <th>{{ $t("department") }}</th>
        <th>{{ $t("actions") }}</th>
      </tr>
    </thead>
    <tbody>
      <AddItem
        v-for="item in absenceReportStore.addUser"
        :key="item.id"
        :item="item"
        @addUser="addUser"
      />
    </tbody>
  </table>
</template>
