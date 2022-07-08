import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useApiDataStore } from "../Api/ApiData";
export const useApiData = defineStore("apiData", {
  actions: {
    checkEmpty(state) {
      const apiDataStore = useApiDataStore();
      if (apiDataStore[state].length < 1) {
        return true;
      }
    },

    getCountries() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("countries")) {
        return new Promise((resolve, reject) => {
          appAxios.get("getcountries").then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "countries");
              resolve("success");
            } else {
              reject("error");
            }
          });
        });
      }
    },
    getCities(countryId) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getcities", { params: { country_id: countryId } })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "cities");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
      });
    },
    getNations() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("nations")) {
        return new Promise((resolve, reject) => {
          appAxios.get(`getnations`).then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "nations");
              resolve("success");
            } else {
              reject("error");
            }
          });
        });
      }
    },
    getLanguages() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("languages")) {
        return new Promise((resolve, reject) => {
          appAxios.get("getlanguages").then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "languages");
              resolve("success");
            } else {
              reject("error");
            }
          });
        });
      }
    },
    getInventoryTypes(companyType) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`getinventorytypes`, { params: { company_id: companyType } })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "inventoryTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getInventoriesByType(typeId) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get(`getinventoriesbytype`, { params: { type_id: typeId } })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "inventories");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getDocumentTypes() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("document_types")) {
        return new Promise((resolve, reject) => {
          appAxios.get("getdocumenttypes").then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "document_types");
              resolve("success");
            } else {
              reject("error");
            }
          });
        });
      }
    },

    getAbsenceTypes() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("absenceTypes")) {
        return new Promise((resolve, reject) => {
          appAxios.get("getabsencetypes").then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "absenceTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
        });
      }
    },
    getExpenseTypes(companyId) {
      const apiStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getexpensetypes", {
            params: {
              company_id: companyId,
            },
          })
          .then((response) => {
            if (response.data) {
              apiStore.setData(response.data, "expenseTypes");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getRoles() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("roles")) {
        return new Promise((resolve, reject) => {
          appAxios.get("getroles").then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "roles");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
        });
      }
    },
    getCompanies(id) {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("companies")) {
        return new Promise((resolve, reject) => {
          appAxios
            .get("getcompanies", {
              params: {
                musteri_id: id,
              },
            })
            .then((response) => {
              if (response.data) {
                apiDataStore.setData(response.data, "companies");
                resolve("Successful");
              } else {
                reject("Error");
              }
            });
        });
      }
    },
    getDepartments(id) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getdepartments", {
            params: {
              company_id: id,
            },
          })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "departments");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
      });
    },
    getPositions(id) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getpositions", {
            params: {
              department_id: id,
            },
          })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "positions");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
      });
    },
    getUsers(query) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getusers", {
            params: query,
          })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "users");
              resolve("Success");
            } else {
              reject("Error");
            }
          });
      });
    },
    getJobs(query) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getjobs", { params: { search: query } })
          .then((response) => {
            if (response.data) {
              if (response.data.data.length > 0) {
                apiDataStore.setData(response.data.data, "jobs");
              }
              resolve("Success");
            } else {
              reject("Error");
            }
          });
      });
    },
    getEmployeerBranches(id) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getemployeerbranches", {
            params: {
              musteri_id: id,
            },
          })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "employeer_branches");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
      });
    },
    getWorkPlaces(id) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getworkplaces", {
            params: {
              department_id: id,
            },
          })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "work_places");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
      });
    },
    getManagers(id, role_id) {
      const apiDataStore = useApiDataStore();
      return new Promise((resolve, reject) => {
        appAxios
          .get("getmanagers", {
            params: {
              department_id: id,
              role_id: role_id,
            },
          })
          .then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data.data, "managers");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
      });
    },
    getMusteris() {
      const apiDataStore = useApiDataStore();
      if (this.checkEmpty("musteris")) {
        return new Promise((resolve, reject) => {
          appAxios.get("getmusteris").then((response) => {
            if (response.data) {
              apiDataStore.setData(response.data, "musteris");
              resolve("Successful");
            } else {
              reject("Error");
            }
          });
        });
      }
    },
  },
});
