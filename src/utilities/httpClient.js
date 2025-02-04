import axios from "axios";
import store from "../actions";
import { stopLoading } from "../actions";
import { URL } from "../config/settings";
import { toast } from "react-toastify";

const httpClient = axios.create({ baseURL: URL });

httpClient.interceptors.request.use(
  async (config) => {
    const tokenStorage = localStorage.getItem("token") ?? "";
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      ...(tokenStorage && { Authorization: `Bearer ${tokenStorage}` }),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    store.dispatch(stopLoading());
    console.log(error, window.location);
    if ([401, 403]?.includes(error.response.status) && window.location.pathname !== "/login") {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      const errorMessage = error?.response?.data?.error;
      console.log(window.location.pathname);
      if (window.location.pathname === "/login") return toast.error("Грешен имейл или парола");
      if (errorMessage) toast.error(errorMessage);
      else toast.error(error?.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
