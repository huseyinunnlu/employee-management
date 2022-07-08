<script setup>
import AddItem from "@/components/Admin/CompanyTree/Manager/AddItem.vue";
import { useTreeStore } from "@/store/Admin/Company/Tree";

import { useCompanyStore } from "@/store/Admin/Company/Company";

const treeStore = useTreeStore();
const companyStore = useCompanyStore();

const changePerms = (id) => {
  const index = companyStore.form.permittedUsers.indexOf(id);
  index > -1
    ? companyStore.form.permittedUsers.splice(index, 1)
    : companyStore.form.permittedUsers.push(id);
};
</script>
<template>
  <table class="table table-hover table-rounded table-striped border gy-7 gs-7">
    <thead>
      <tr>
        <th>{{ $t("fullName") }}</th>
        <th>{{ $t("role") }}</th>
        <th>{{ $t("actions") }}</th>
      </tr>
    </thead>
    <tbody>
      <AddItem
        v-for="item in treeStore.addUsers"
        :key="item.id"
        :item="item"
        @addUser="changePerms"
      />
    </tbody>
  </table>
</template>
