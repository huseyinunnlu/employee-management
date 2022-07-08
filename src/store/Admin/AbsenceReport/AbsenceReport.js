import { defineStore } from "pinia";

export const useAbsenceReportStore = defineStore("absenceReportStore", {
  state: () => ({
    users: [],
    pagination: [],
    addUser: [],
    form: {
      type_id: null,
      date: null,
      start_time: null,
      end_time: null,
      day_type: "full",
      status: "pending",
      users: [],
    },
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
