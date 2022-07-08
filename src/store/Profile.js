import { defineStore } from "pinia";

export const useProfileStore = defineStore("profileStore", {
  state: () => {
    return {
      profile: {},
      debits: [],
      documents: [],
      absences: [],
      absenceStats: {},
      reports: [],
    };
  },
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

    updateAbsence(data, state) {
      const index = this[state].findIndex((item) => item.id == data.id);
      const changedDay = this[state][index].day_count - data.day_count;
      this.absenceStats.used -= changedDay;
      this.absenceStats.remaining =
        this.absenceStats.deserved - this.absenceStats.used;
      this[state][index] = data;
    },
  },
  getters: {
    _Profile(state) {
      return state.profile;
    },
  },
});
