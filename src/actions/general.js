import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";

const initialState = {
  user: {},
  loading: false,
  loadingText: "Моля изчакайте...",
  customers: [],
};
export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setGeneralFields: (state, { payload }) => ({ ...state, socket: payload?.socket }),
    setUser: (state, { payload }) => ({ ...state, user: payload }),
    setCustomers: (state, { payload }) => ({ ...state, customers: payload }),
    startLoading: (state) => ({ ...state, loading: true }),
    stopLoading: (state) => ({ ...state, loading: false }),
  },
});
export const { setGeneralFields, startLoading, setUser, stopLoading, setCustomers } = generalSlice.actions;

export const registerUser = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("register", payload);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};

export const loginUser = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/login", payload);
  console.log(data);
  User.authenticate(data.access_token, {
    token: data.access_token,
    ...data.user_info,
  });
  dispatch(setUser(data.user_info));
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};

export const getCurrentUser = () => async (dispatch) => dispatch(setUser(User.getUser()));

export const logoutUser = () => async (dispatch) => {
  window.localStorage.clear();
  window.location.href = "/";
  dispatch(setUser({}));
};

export const getAllCustomers = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/customers");
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setCustomers(data));
  dispatch(stopLoading());
};

export const deleteCustomerProfile = (payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`/customers/${payload}`);
  if (onSuccess) onSuccess(data);
  dispatch(stopLoading());
};

export default generalSlice.reducer;
