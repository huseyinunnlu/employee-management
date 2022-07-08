import { defineStore } from "pinia";
import router from "@/router/index";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    company: {},
    employees: [],
    inventoryTypes: [],
    inventories: [],
    expenseTypes: [],
    departments: [],
    form: {
      musteri_id: null,
      logo: null,
      title: null,
      address: null,
      email: null,
      city_id: null,
      country_id: null,
      permittedUsers: [],
    },
  }),
  actions: {
    setData(data, state) {
      this[state] = data;
    },
    createData(data, state) {
      this[state].unshift(data);
    },
    deleteData(id, state) {
      const index = this[state].findIndex((item) => item.id == id);
      this[state].splice(index, 1);
    },
    updateData(data, state) {
      const index = this[state].findIndex((item) => item.id == data.id);
      this[state][index] = data;
    },
  },
});
