import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import JwtService from "@/core/services/JwtService";
import { useExpenseStore } from "../Admin/Expense";
export const useExpenseApi = defineStore("expenseApi", {
  actions: {
    get(query) {
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/expense/`, { params: query }).then((response) => {
          if (response.data) {
            expenseStore.setData(response.data.data, "expenses");
            expenseStore.setData(response.data.meta.links, "pagination");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    addExpense(form, isAdmin) {
      const url = isAdmin ? "admin/expense" : "myexpense";
      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        if (typeof item[1] == "object" && item[1]) {
          item[1].forEach((line, index) => {
            Object.entries(line).forEach((line) => {
              line[1]
                ? formData.append(`${item[0]}[${index}][${line[0]}]`, line[1])
                : "";
            });
          });
        } else {
          item[1] ? formData.append(item[0], item[1]) : "";
        }
      });

      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios.post(url, formData).then((response) => {
          if (response.data) {
            expenseStore.unloadForms();
            router.push({
              name: isAdmin ? "expense-list" : `myexpenses`,
            });
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    deleteExpense(id, isAdmin) {
      const url = isAdmin ? "admin/expense" : "myexpense";
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`${url}/${id}`).then((response) => {
          if (response.data) {
            expenseStore.deleteData(id, "expenses");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    updateExpense(id, form, isAdmin) {
      const url = isAdmin ? "admin/expense" : "myexpense";
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios.put(`${url}/${id}`, form).then((response) => {
          if (response.data) {
            expenseStore.updateData(response.data.data, "expenses");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    deleteExpenseLine(expenseId, lineId, isAdmin) {
      const url = isAdmin ? "admin/expense" : "myexpense";
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`${url}/${expenseId}/expenseline/${lineId}`)
          .then((response) => {
            if (response.data) {
              expenseStore.deleteExpenseLine(expenseId, lineId);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    updateExpenseLine(expenseId, lineId, form, isAdmin) {
      const url = isAdmin ? "admin/expense" : "myexpense";
      const formData = new FormData();

      Object.entries(form).forEach((item) => {
        item[1] ? formData.append(item[0], item[1]) : "";
      });
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(
            `${url}/${expenseId}/expenseline/${lineId}?_method=PUT`,
            formData
          )
          .then((response) => {
            if (response.data) {
              expenseStore.updateExpenseLine(response.data.data);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    addExpenseLine(expenseId, form, isAdmin) {
      const url = isAdmin ? "admin/expense" : "myexpense";
      const formData = new FormData();

      Object.entries(form).forEach((item) => {
        item[1] ? formData.append(item[0], item[1]) : "";
      });
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`${url}/${expenseId}/expenseline`, formData)
          .then((response) => {
            if (response.data) {
              expenseStore.addExpenseLine(expenseId, response.data.data);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    myExpenses(query) {
      const expenseStore = useExpenseStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`myexpense/`, { params: query }).then((response) => {
          if (response.data) {
            expenseStore.setData(response.data.data, "expenses");
            expenseStore.setData(response.data.meta.links, "pagination");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
  },
});
