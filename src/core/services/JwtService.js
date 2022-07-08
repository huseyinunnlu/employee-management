import { useAuthStore } from "@/store/Auth";

const ID_TOKEN_KEY = "id_token";
const USER_OBJECT = "user";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
  const authStore = useAuthStore();
  authStore.setToken(token);
};

export const saveUser = (user) => {
  const authStore = useAuthStore();
  authStore.setUser(user);
};

export const saveRole = (data) => {
  const authStore = useAuthStore();
  authStore.setRole(data);
};

export const changeAuth = (data) => {
  const authStore = useAuthStore();
  authStore.setAuth(data);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  saveUser,
  changeAuth,
  saveRole,
};
