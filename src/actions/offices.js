import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  offices: [],
  office: null,
};
export const officesSlice = createSlice({
  name: "officesSlice",
  initialState,
  reducers: {
    setOffices: (state, { payload }) => ({ ...state, offices: payload }),
    setOffice: (state, { payload }) => ({ ...state, office: payload }),
  },
});
export const { setOffices, setOffice } = officesSlice.actions;

export const getAllOffices = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/offices");
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setOffices(data));
  dispatch(stopLoading());
};

export const getOfficeById = (id, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/offices/${id}`);
  if (onSuccess) onSuccess(data);
  dispatch(setOffice(data));
  dispatch(stopLoading());
};

export const createOffice = (payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/offices", { ...payload });
  if (onSuccess) onSuccess(data);
  dispatch(stopLoading());
};

export const editOffice = (id, payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.put(`/offices/${id}`, { ...payload });
  if (onSuccess) onSuccess(data);
  dispatch(stopLoading());
};

export const deleteOffice = (id, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  await httpClient.delete(`/offices/${id}`);
  if (onSuccess) onSuccess();
  dispatch(stopLoading());
};

export default officesSlice.reducer;
