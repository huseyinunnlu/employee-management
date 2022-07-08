import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useCompanyStore } from "../Admin/Company/Company";
export const useCompanyApi = defineStore("companyApi", {
  actions: {
    get(id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/company/${id}`).then((response) => {
          if (response.data) {
            companyStore.setData(response.data.data, "company");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    update(id, form) {
      const companyStore = useCompanyStore();

      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] != null ? formData.append(item[0], item[1]) : "";
      });
      return new Promise((resolve, reject) => {
        appAxios
          .post(`admin/tree/company/${id}?_method=PUT`, formData)
          .then((response) => {
            if (response.data) {
              companyStore.setData(response.data.data, "company");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    addInventoryType(id, form) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`admin/tree/company/${id}/inventorytype`, form)
          .then((response) => {
            if (response.data) {
              companyStore.createData(response.data.data, "inventoryTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    deleteInventoryType(companyId, id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/company/${companyId}/inventorytype/${id}`)
          .then((response) => {
            if (response.data) {
              companyStore.deleteData(id, "inventoryTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    getInventoryTypes(id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/company/${id}/inventorytype`)
          .then((response) => {
            if (response.data) {
              companyStore.setData(response.data.data, "inventoryTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    updateInventoryType(companyId, id, form) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/tree/company/${companyId}/inventorytype/${id}`, form)
          .then((response) => {
            if (response.data) {
              companyStore.updateData(response.data.data, "inventoryTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    addInventory(id, form) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`admin/tree/company/${id}/inventory`, form)
          .then((response) => {
            if (response.data) {
              companyStore.createData(response.data.data, "inventories");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    deleteInventory(companyId, id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/company/${companyId}/inventory/${id}`)
          .then((response) => {
            if (response.data) {
              companyStore.deleteData(id, "inventories");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    getInventories(id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/company/${id}/inventory`).then((response) => {
          if (response.data) {
            companyStore.setData(response.data.data, "inventories");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    updateInventory(companyId, id, form) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/tree/company/${companyId}/inventory/${id}`, form)
          .then((response) => {
            if (response.data) {
              companyStore.updateData(response.data.data, "inventories");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    addExpenseType(id, form) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`admin/tree/company/${id}/expensetype`, form)
          .then((response) => {
            if (response.data) {
              companyStore.createData(response.data.data, "expenseTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    deleteExpenseType(companyId, id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/company/${companyId}/expensetype/${id}`)
          .then((response) => {
            if (response.data) {
              companyStore.deleteData(id, "expenseTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    getExpenseTypes(id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/company/${id}/expensetype`)
          .then((response) => {
            if (response.data) {
              companyStore.setData(response.data.data, "expenseTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    updateExpenseType(companyId, id, form) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/tree/company/${companyId}/expensetype/${id}`, form)
          .then((response) => {
            if (response.data) {
              companyStore.updateData(response.data.data, "expenseTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    getDepartments(id) {
      const companyStore = useCompanyStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/company/${id}/department`).then((response) => {
          if (response.data) {
            companyStore.setData(response.data.data, "departments");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
  },
});
