<script setup>
import AddItem from "@/components/Admin/CompanyTree/Manager/AddItem.vue";
import { useTreeStore } from "@/store/Admin/Company/Tree";
import { useDepartmentStore } from "@/store/Admin/Company/Department";

const treeStore = useTreeStore();
const departmentStore = useDepartmentStore();

const changePerms = (id) => {
  const index = departmentStore.form.permittedUsers.indexOf(id);
  index > -1
    ? departmentStore.form.permittedUsers.splice(index, 1)
    : departmentStore.form.permittedUsers.push(id);
};
</script>
<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped mt-3" style="cursor: pointer">
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
  </div>
</template>
