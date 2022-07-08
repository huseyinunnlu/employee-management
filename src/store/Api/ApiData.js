import { defineStore } from "pinia";

export const useApiDataStore = defineStore("apiDataStore", {
  state: () => {
    return {
      countries: [],
      cities: [],
      nations: [],
      roles: [],
      positions: [],
      pay_types: [
        { id: "fixed", title: "Sabit maaş" },
        { id: "hourly", title: "Saatlik maaş" },
      ],
      work_types: [
        { id: "full", title: "Tam zamanlı" },
        { id: "part", title: "Yarı zamanlı" },
        { id: "intern", title: "Stajer" },
      ],
      tax_classes: [],
      surcharge_types: [],
      document_types: [],
      languages: [],
      locations: [],
      absenceTypes: [],
      musteris: [],
      companies: [],
      departments: [],
      employeer_branches: [],
      managers: [],
      jobs: [],
      work_places: [],
      users: [],
      perms: [],
      expenseTypes: [],
      inventoryTypes: [],
      inventories: [],
    };
  },
  actions: {
    setData(data, state) {
      this[state] = data;
    },
    deleteData(state) {
      this[state] = [];
    },
  },
});
