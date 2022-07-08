import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import JwtService from "@/core/services/JwtService";

export const useAuthApi = defineStore("authApi", {
  state: () => {
    return {};
  },
  actions: {
    async deleteAuthUser() {
      await JwtService.saveRole(null);
      await JwtService.destroyToken();
      await JwtService.changeAuth(false);
      router.push({ name: "sign-in" });
    },

    deleteAuthUserData() {
      JwtService.saveUser({});
    },

    signIn(formData) {
      return new Promise((resolve, reject) => {
        appAxios.post("login", formData).then((response) => {
          if (response.data) {
            JwtService.saveToken(response.data.token);
            JwtService.saveUser(response.data.user);
            JwtService.saveRole(response.data.user.role.role_id);
            JwtService.changeAuth(true);
            router.push({ name: "dashboard" });
            resolve("Success");
          } else {
            reject("Error");
          }
        });
      });
    },
    getUser() {
      return new Promise((resolve, reject) => {
        appAxios.get("user").then((response) => {
          if (response.data) {
            JwtService.saveUser(response.data.data);
            JwtService.saveRole(response.data.data.role.role_id);
            JwtService.changeAuth(true);
            resolve("Success");
          } else {
            this.deleteAuthUser();
            reject("Error");
          }
        });
      });
    },
    signOut() {
      return new Promise((resolve, reject) => {
        appAxios.get("logout").then((response) => {
          if (response.data) {
            this.deleteAuthUser();
            resolve("Success");
          } else {
            this.deleteAuthUserData();
            reject("Error");
          }
        });
      });
    },
  },
});
