import { defineStore } from "pinia";
export const useExpenseStore = defineStore("expenseStore", {
  state: () => ({
    expenses: [],
    form: {
      company_id: null,
      status: "pending",
      notes: null,
      user_id: null,
      lines: [],
    },
    pagination: [],
    selectedData: {},
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
    deleteLine(index) {
      this.form.lines.splice(index, 1);
    },
    unloadForms() {
      this.form.company_id = null;
      this.form.status = "new";
      this.form.notes = null;
      this.form.user_id = null;
      this.form.lines = [];
    },

    getOneExpense(id) {
      return this.expenses.find((item) => {
        return item.id == id;
      });
    },

    findStoreIndex(id, state) {
      return this[state].findIndex((data) => {
        return data.id == id;
      });
    },

    deleteExpenseLine(expenseId, lineId) {
      const expenseIndex = this.findStoreIndex(expenseId, "expenses");

      const lineIndex = this.expenses[expenseIndex].expense_lines.findIndex(
        (line) => {
          return line.id == lineId;
        }
      );

      const deletedPrice =
        this.expenses[expenseIndex].expense_lines[lineIndex].price;

      this.expenses[expenseIndex].prices -= deletedPrice;
      this.expenses[expenseIndex].expense_lines.splice(lineIndex, 1);
    },

    updateTotalPrice(parentIndex, childIndex, newPrice) {
      const totalPrice = this.expenses[parentIndex].prices;
      const currentExpenseLinePrice =
        this.expenses[parentIndex].expense_lines[childIndex].price;
      const newTotalPrice = totalPrice - currentExpenseLinePrice;
      this.expenses[parentIndex].prices = newTotalPrice + newPrice;
    },

    updateExpenseLine(data) {
      const index = this.findStoreIndex(data.expense_id, "expenses");

      const lineIndex = this.expenses[index].expense_lines.findIndex((line) => {
        return line.id == data.id;
      });
      this.updateTotalPrice(index, lineIndex, data.price);
      this.expenses[index].expense_lines[lineIndex] = data;
    },

    addExpenseLine(expenseId, data) {
      const expenseIndex = this.findStoreIndex(expenseId, "expenses");
      this.expenses[expenseIndex].prices += data.price;
      this.expenses[expenseIndex]["expense_lines"].unshift(data);
    },
  },
});
