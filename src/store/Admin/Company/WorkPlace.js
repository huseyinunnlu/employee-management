import { defineStore } from "pinia";

export const useWorkPlaceStore = defineStore("workPlaceStore", {
  state: () => ({
    workPlace: {},
    employees: [],
    form: {
      title: null,
      country_id: null,
      city_id: null,
      email: null,
      musteri_id: null,
      company_id: null,
      department_id: null,
      morning: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
      afternoon: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
      night: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
      full: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
      report: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
      annual: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
      permit: {
        start_time: null,
        end_time: null,
        break_time: null,
      },
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
