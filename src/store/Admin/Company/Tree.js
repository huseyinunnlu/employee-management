import { defineStore } from "pinia";

export const useTreeStore = defineStore("treeStore", {
  state: () => ({
    tree: [],
    employees: [],
    managers: [],
    addUsers: [],
  }),
  actions: {
    setData(data, state) {
      this[state] = data;
    },
    createData(data, state) {
      this[state].unshift(data);
    },
    createDataWithId(id, state, targetState) {
      const data = this[targetState].find((item) => {
        return item.id == id;
      });

      this.createData(data, state);
    },
    addManagers(data) {
      this.managers = [...this.managers, ...data];
    },
    deleteUser(id, state) {
      const index = this[state].findIndex((item) => item.id == id);
      this[state].splice(index, 1);
    },
  },
});
