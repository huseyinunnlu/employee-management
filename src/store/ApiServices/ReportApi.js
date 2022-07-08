import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useAbsenceReportStore } from "../Admin/AbsenceReport/AbsenceReport";
import { useDocumentReportStore } from "../Admin/DocumentReport/DocumentReport";
import { useDebitReportStore } from "../Admin/DebitReport/DebitReport";
import { notify } from "@kyvg/vue3-notification";
export const useReportApi = defineStore("reportApi", {
  actions: {
    getAbsenceReport(query) {
      const absenceReportStore = useAbsenceReportStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("admin/reports/absencereports", { params: query })
          .then((response) => {
            if (response.data) {
              absenceReportStore.setData(response.data.data, "users");
              absenceReportStore.setData(
                response.data.meta.links,
                "pagination"
              );
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteAbsence(id, itemId) {
      const absenceReportStore = useAbsenceReportStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/absence/${itemId}`).then((response) => {
          if (response.data) {
            absenceReportStore.deleteData(itemId, "users");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    getUsers() {
      const absenceReportStore = useAbsenceReportStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("admin/reports/absencereports/getusers")
          .then((response) => {
            if (response.data) {
              absenceReportStore.setData(response.data.data, "addUser");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addAbsence(form) {
      const absenceReportStore = useAbsenceReportStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post("admin/reports/absencereports/", form)
          .then((response) => {
            router.push({
              name: "absence-reports",
            });
            if (response.data.data) {
              response.data.data.forEach((item) => {
                notify({
                  type: "error",
                  title: "Error",
                  text: item,
                });
              });
              reject("error");
            } else {
              resolve("success");
            }
          });
      });
    },
    getDocumentReport(query) {
      const documentReportStore = useDocumentReportStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("admin/reports/documentreports", { params: query })
          .then((response) => {
            if (response.data) {
              documentReportStore.setData(response.data.data, "users");
              documentReportStore.setData(
                response.data.meta.links,
                "pagination"
              );
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteDocument(id, itemId) {
      const documentReportStore = useDocumentReportStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/document/${itemId}`).then((response) => {
          if (response.data) {
            documentReportStore.deleteData(id, "users");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    getDebitReport(query) {
      const debitReportStore = useDebitReportStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("admin/reports/debitreports", { params: query })
          .then((response) => {
            if (response.data) {
              debitReportStore.setData(response.data.data, "users");
              debitReportStore.setData(response.data.meta.links, "pagination");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteDebit(id, itemId) {
      const debitReportStore = useDebitReportStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/debit/${itemId}`).then((response) => {
          if (response.data) {
            debitReportStore.deleteData(id, "users");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
  },
});
