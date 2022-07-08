import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useSettingsStore } from "../Admin/Settings/Settings";
export const useDocumentTypeApi = defineStore("documentTypeApi", {
  actions: {
    getDocumentTypes(query) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/settings/documenttype`).then((response) => {
          if (response.data) {
            settingsStore.setData(response.data.data, "documentTypes");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    addDocumentType(form) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`admin/settings/documenttype`, form).then((response) => {
          if (response.data) {
            settingsStore.createData(response.data.data, "documentTypes");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    deleteDocumentType(id) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/settings/documenttype/${id}`)
          .then((response) => {
            if (response.data) {
              settingsStore.deleteData(id, "documentTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteDocumentTypeTitle(id, titleId) {
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/settings/documenttype/${id}/title/${titleId}`)
          .then((response) => {
            if (response.data) {
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateDocumentType(id, form) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/settings/documenttype/${id}`, form)
          .then((response) => {
            if (response.data) {
              settingsStore.updateData(response.data.data, "documentTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateDocumentTypeTitle(id, typeId, form) {
      const settingsStore = useSettingsStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/settings/documenttype/${typeId}/title/${id}`, form)
          .then((response) => {
            if (response.data) {
              settingsStore.updateData(response.data.data, "documentTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
  },
});
