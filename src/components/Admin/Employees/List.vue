<script setup>
import { useEmployeeApi } from "@/store/ApiServices/EmployeeApi";
import { useEmployeeStore } from "@/store/Admin/Employee";
import TableHead from "@/components/Table/TableHead.vue";
import Item from "./Item.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const employeeApi = useEmployeeApi();
const employeeStore = useEmployeeStore();
const route = useRoute();
const isLoading = ref(true);
const tableHead = reactive([
  {
    name: "firstName",
    key: "first_name",
    sortable: false,
  },
  {
    name: "lastName",
    key: "last_name",
    sortable: false,
  },
  {
    name: "role",
    key: "role_id",
    sortable: true,
  },
  {
    name: "startDate",
    key: "start_date",
    sortable: true,
  },
  {
    name: "company",
    key: "company_id",
    sortable: true,
  },
  {
    name: "department",
    key: "department_id",
    sortable: true,
  },
  {
    name: "status",
    key: "status",
    sortable: false,
  },
  {
    name: "actions",
    key: "actions",
    sortable: false,
  },
]);

onBeforeMount(() => {
  fetchEmployees();
});

const fetchEmployees = () => {
  const query = route.query;
  employeeApi.getEmployees(query).finally(() => {
    isLoading.value = false;
  });
};

const changeQuery = (data) => {};
</script>

<template>
  <div class="card-body pt-0">
    <div class="table-responsive">
      <table
        class="table table-hover table-striped mt-3"
        style="cursor: pointer"
      >
        <TableHead :routeName="'employees'" :tableHead="tableHead" />
        <tbody>
          <Item
            v-for="item in employeeStore.employees"
            :data="item"
            :key="item.id"
          />
        </tbody>
      </table>
      <div
        class="text-center fs-5 py-4"
        v-if="employeeStore.employees.length < 1"
      >
        {{ $t("noData") }}
      </div>
    </div>
    <Pagination :paginationData="employeeStore.pagination" />
  </div>
</template>
