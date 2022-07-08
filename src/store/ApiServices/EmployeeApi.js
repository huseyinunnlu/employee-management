import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useProfileStore } from "../Profile";
import { useEmployeeStore } from "@/store/Admin/Employee";

export const useEmployeeApi = defineStore("employeeApi", {
  actions: {
    getEmployees(query) {
      const employeeStore = useEmployeeStore();
      return new Promise((resolve, reject) => {
        appAxios.get("admin/employees", { params: query }).then((response) => {
          if (response.data) {
            employeeStore.setEmployee(response.data.data);
            employeeStore.setPagination(response.data.meta.links);
            resolve("Success");
          } else {
            employeeStore.employees = [];
            employeeStore.setPagination([]);
            reject("Error");
          }
        });
      });
    },
    saveEmployee(query) {
      return new Promise((resolve, reject) => {
        appAxios.post("admin/employees", query).then((response) => {
          if (response.data) {
            router.push({ name: "employees" });
            resolve("Success");
          } else {
            reject("Error");
          }
        });
      });
    },
    getSelectedEmployee(id) {
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/employees/${id}`).then((response) => {
          if (response.data) {
            resolve(response.data.data);
          } else {
            router.push({ name: "employees" });
            reject("Error");
          }
        });
      });
    },

    updateEmployee(id, form) {
      return new Promise((resolve, reject) => {
        appAxios.put(`admin/employees/${id}`, form).then((response) => {
          if (response.data) {
            resolve("Success");
            router.push({ name: "employees" });
          } else {
            reject("Error");
          }
        });
      });
    },

    getEmployeeSelectData() {
      const employeeStore = useEmployeeStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`getemployeeselectdata`).then((response) => {
          if (response.data) {
            employeeStore.selectData = response.data;
            resolve("success");
          } else {
            reject("Error");
          }
        });
      });
    },
  },
});
