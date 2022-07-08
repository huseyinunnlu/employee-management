import { defineStore } from "pinia";
// import Auth from "./modules/Auth";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    employees: [],
    selectData: [],
    pagination: [],
  }),
  actions: {
    setEmployee(data) {
      this.employees = data;
    },
    setPagination(data) {
      this.pagination = data;
    },
    createEmployee(data) {
      this.employees.push(data);
    },
    deleteEmployee(id) {
      const index = this.employees.findIndex((item) => item.id == id);
      this.employees.splice(index, 1);
    },
  },
});
