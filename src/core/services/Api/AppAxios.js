import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { getToken } from "@/core/services/JwtService";

const appAxios = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL,
  headers: {
    Accept: "application/json",
  },
});
appAxios.interceptors.request.use((config) => {
  config.headers["Authorization"] = getToken();
  config.headers["X-localization"] = localStorage.getItem("lang") || "tr-TR";
  return config;
});

appAxios.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      notify({
        type: "success",
        title: response.data.message,
      });
    }
    return response;
  },
  (error) => {
    let formattedTitle = "Error";
    let message;
    if (error.response && error.response.status == 422) {
      formattedTitle = error.response
        ? error.response.data.message
        : "Validation error.";
      message =
        Object.values(error.response.data.data)[0] || "Validation error.";
    } else if (error.response && error.response.data.message) {
      formattedTitle = "Error";
      message = error.response.data.message;
    }

    notify({
      type: "error",
      title: formattedTitle,
      text: message,
    });
    return error;
  }
);
export default appAxios;
