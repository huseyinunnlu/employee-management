import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useDepartmentStore } from "../Admin/Company/Department";

export const useDepartmentApi = defineStore("departmentApi", {
  actions: {
    get(id) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`admin/tree/department/${id}`).then((response) => {
          if (response.data) {
            departmentStore.setData(response.data.data, "department");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    update(id, form) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios.put(`admin/tree/department/${id}`, form).then((response) => {
          if (response.data) {
            departmentStore.setData(response.data.data, "department");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addPosition(id, form) {
      return new Promise((resolve, reject) => {
        const departmentStore = useDepartmentStore();

        appAxios
          .post(`admin/tree/department/${id}/position`, { positions: form })
          .then((response) => {
            if (response.data) {
              departmentStore.createData(response.data.data, "positions");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deletePosition(departmentId, id) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`admin/tree/department/${departmentId}/position/${id}`)
          .then((response) => {
            if (response.data) {
              departmentStore.deleteData(id, "positions");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deletePositionTitle(departmentId, id, titleId) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(
            `admin/tree/department/${departmentId}/position/${id}/title/${titleId}`
          )
          .then((response) => {
            if (response.data) {
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getPositions(id) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`admin/tree/department/${id}/position`)
          .then((response) => {
            if (response.data) {
              departmentStore.setData(response.data.data, "positions");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updatePosition(departmentId, id, form) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`admin/tree/department/${departmentId}/position/${id}`, form)
          .then((response) => {
            if (response.data) {
              departmentStore.updateData(response.data.data, "positions");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updatePositionTitle(departmentId, id, positionId, form) {
      const departmentStore = useDepartmentStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(
            `admin/tree/department/${departmentId}/position/${positionId}/title/${id}`,
            form
          )
          .then((response) => {
            if (response.data) {
              departmentStore.updateData(response.data.data, "positions");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
  },
});
