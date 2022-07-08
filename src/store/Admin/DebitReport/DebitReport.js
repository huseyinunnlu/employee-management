import { defineStore } from "pinia";

export const useDebitReportStore = defineStore("debitReportStore", {
  state: () => ({
    users: [],
    pagination: [],
    addUser: [],
  }),
  actions: {
    setData(data, state) {
      this[state] = data;
    },
    createData(data, state) {
      this[state].unshift(data);
    },
    deleteData(data, state) {
      const index = this[state].findIndex((item) => item.id == data);
      this[state].splice(index, 1);
    },
    updateData(data, state) {
      const index = this[state].findIndex((item) => item.id == data.id);
      this[state][index] = data;
    },
  },
});
