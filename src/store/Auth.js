import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {},
      token: null,
      isAuth: false,
      role: null,
    };
  },
  actions: {
    setUser(data) {
      this.user = data;
    },
    setToken(data) {
      this.token = data;
    },
    setAuth(data) {
      this.isAuth = data;
    },
    setRole(data) {
      this.role = data;
      window.localStorage.setItem("id_role", data);
    },
  },
});
