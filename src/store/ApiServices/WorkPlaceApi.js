import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useWorkPlaceStore } from "../Admin/Company/WorkPlace";
export const useWorkPlaceApi = defineStore("workPlaceApi", {
  actions: {
    get(id) {
      const workPlaceStore = useWorkPlaceStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/workplace/${id}`).then((response) => {
          if (response.data) {
            workPlaceStore.setData(response.data.data, "workPlace");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    updateWorkingHours(id, form) {
      const workPlaceStore = useWorkPlaceStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/tree/workplace/${id}/updateworkinghour`, form)
          .then((response) => {
            if (response.data) {
              workPlaceStore.setData(response.data.data, "workPlace");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    update(id, form) {
      const workPlaceStore = useWorkPlaceStore();
      return new Promise((resolve, reject) => {
        appAxios.put(`admin/tree/workplace/${id}`, form).then((response) => {
          if (response.data) {
            workPlaceStore.setData(response.data.data, "workPlace");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
  },
});
