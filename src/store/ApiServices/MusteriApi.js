import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useMusteriStore } from "../Admin/Company/Musteri";

export const useMusteriApi = defineStore("musteriApi", {
  actions: {
    get(id) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/musteri/${id}`).then((response) => {
          if (response.data) {
            musteriStore.setData(response.data.data, "musteri");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    update(id, form) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios.put(`admin/tree/musteri/${id}`, form).then((response) => {
          if (response.data) {
            musteriStore.setData(response.data.data, "musteri");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    addEmployeerBranch(id, form) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`admin/tree/musteri/${id}/employeerbranch`, form)
          .then((response) => {
            if (response.data) {
              musteriStore.createData(response.data.data, "employeerBranch");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    deleteEmployeerBranch(musteriId, id) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/musteri/${musteriId}/employeerbranch/${id}`)
          .then((response) => {
            if (response.data) {
              musteriStore.deleteData(id, "employeerBranch");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getEmployeerBraches(id) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/musteri/${id}/employeerbranch`)
          .then((response) => {
            if (response.data) {
              musteriStore.setData(response.data.data, "employeerBranch");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateEmployeerBranch(musteriId, id, form) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/tree/musteri/${musteriId}/employeerbranch/${id}`, form)
          .then((response) => {
            if (response.data) {
              musteriStore.updateData(response.data.data, "employeerBranch");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getCompanies(id) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/musteri/${id}/company`).then((response) => {
          if (response.data) {
            musteriStore.setData(response.data.data, "companies");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteCompany(musteriId, id) {
      const musteriStore = useMusteriStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/musteri/${musteriId}/company/${id}`)
          .then((response) => {
            if (response.data) {
              musteriStore.deleteData(id, "companies");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
  },
});
