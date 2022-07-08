import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useCompanyStore } from "../Admin/Company/Company";
import { useTreeStore } from "../Admin/Company/Tree";
export const useTreeApi = defineStore("treeApi", {
  actions: {
    getCompanyTree() {
      const treeStore = useTreeStore();
      return new Promise((resolve, reject) => {
        appAxios.get("admin/companytree").then((response) => {
          if (response.data) {
            treeStore.setData(response.data.data, "tree");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteCompany(id, model) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/${id}`, {
            params: {
              data: model,
            },
          })
          .then((response) => {
            if (response.data) {
              companyStore.deleteData(id, "departments");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    getEmployees(id, column) {
      const treeStore = useTreeStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/musteri/${id}/employee`, {
            params: {
              column: column,
            },
          })
          .then((response) => {
            if (response.data) {
              treeStore.setData(response.data.data, "employees");
              resolve("success");
            } else {
              router.push({ name: "company" });
              reject("error");
            }
          });
      });
    },

    getManagers(id, column) {
      const treeStore = useTreeStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/managers`, {
            params: {
              id: id,
              column: column,
            },
          })
          .then((response) => {
            if (response.data) {
              treeStore.setData(response.data.data, "managers");
              resolve("success");
            } else {
              router.push({ name: "company-tree" });
              reject("error");
            }
          });
      });
    },
    getUsersForManagerAdding(id, column) {
      const treeStore = useTreeStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/getuserforaddmanager`, {
            params: {
              id: id,
              column: column,
            },
          })
          .then((response) => {
            if (response.data) {
              treeStore.setData(response.data.data, "addUsers");
              resolve("success");
            } else {
              router.push({ name: "company-tree" });
              reject("error");
            }
          });
      });
    },

    storeUserPerms(form) {
      const treeStore = useTreeStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`admin/tree/storeuserperms`, form).then((response) => {
          if (response.data) {
            treeStore.addManagers(response.data.data);
            form.form.forEach((item) => {
              treeStore.deleteUser(item, "addUsers");
            });
            resolve("success");
          } else {
            router.push({ name: "company-tree" });
            reject("error");
          }
        });
      });
    },

    deleteManager(id) {
      const treeStore = useTreeStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`admin/tree/manager/${id}`).then((response) => {
          if (response.data) {
            treeStore.createDataWithId(id, "addUsers", "managers");
            treeStore.deleteUser(id, ["managers"]);
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    addCompany(form, permittedUsers) {
      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] ? formData.append(item[0], item[1]) : "";
      });
      permittedUsers.forEach((item) => {
        formData.append("permittedUsers[]", item);
      });
      return new Promise((resolve, reject) => {
        appAxios.post(`admin/tree/company`, formData).then((response) => {
          if (response.data) {
            router.push({ name: "company-cards" });
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addDepartment(form) {
      return new Promise((resolve, reject) => {
        appAxios.post(`admin/tree/department`, form).then((response) => {
          if (response.data) {
            router.push({ name: "company-cards" });
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addWorkPlace(form) {
      return new Promise((resolve, reject) => {
        appAxios.post(`admin/tree/workplace`, form).then((response) => {
          if (response.data) {
            router.push({ name: "company-cards" });
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
  },
});
