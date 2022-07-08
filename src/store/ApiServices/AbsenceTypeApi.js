import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useSettingsStore } from "../Admin/Settings/Settings";
export const useAbsenceTypeApi = defineStore("absenceTypeApi", {
  actions: {
    getAbsenceTypes(query) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/settings/absencetype`).then((response) => {
          if (response.data) {
            settingsStore.setData(response.data.data, "absenceTypes");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addAbsenceType(form) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`admin/settings/absencetype`, form).then((response) => {
          if (response.data) {
            settingsStore.createData(response.data.data, "absenceTypes");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteAbsenceType(id) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`admin/settings/absencetype/${id}`).then((response) => {
          if (response.data) {
            settingsStore.deleteData(id, "absenceTypes");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteAbsenceTypeTitle(id, titleId) {
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/settings/absencetype/${id}/title/${titleId}`)
          .then((response) => {
            if (response.data) {
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateAbsenceType(id, form) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/settings/absencetype/${id}`, form)
          .then((response) => {
            if (response.data) {
              settingsStore.updateData(response.data.data, "absenceTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateAbsenceTypeTitle(id, typeId, form) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/settings/absencetype/${typeId}/title/${id}`, form)
          .then((response) => {
            if (response.data) {
              settingsStore.updateData(response.data.data, "absenceTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
  },
});
