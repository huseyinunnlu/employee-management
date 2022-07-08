import { defineStore } from "pinia";

export const useDepartmentStore = defineStore("departmentStore", {
  state: () => ({
    department: {},
    employees: [],
    positions: [],
    form: {
      musteri_id: null,
      company_id: null,
      title: null,
      country_id: null,
      city_id: null,
      mountly_holiday: null,
      daily_work_hour: null,
      overtime_rate: null,
      overtime_type: "common",
      food_fee_tax: false,
      road_fee_tax: false,
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
