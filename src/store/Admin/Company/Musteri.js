import { defineStore } from "pinia";

export const useMusteriStore = defineStore("musteriStore", {
  state: () => ({
    musteri: {},
    employeerBranch: [],
    companies: [],
    employees: [],
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
