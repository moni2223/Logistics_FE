import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  employees: [],
};
export const employeesSlice = createSlice({
  name: "employeesSlice",
  initialState,
  reducers: {
    setEmployees: (state, { payload }) => ({ ...state, employees: payload }),
  },
});
export const { setEmployees } = employeesSlice.actions;

export const getAllEmployees = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/employees");
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setEmployees(data));
  dispatch(stopLoading());
};

export const getEmployeeById = (id, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/employees/${id}`);
  if (onSuccess) onSuccess(data);
  dispatch(stopLoading());
};

export const createEmployee = (payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  await httpClient.post("/employees", payload);
  if (onSuccess) onSuccess();
  dispatch(stopLoading());
};

export const editEmployee = (_id, payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  await httpClient.put(`/employees/${_id}`, payload);
  if (onSuccess) onSuccess();
  dispatch(stopLoading());
};

export const deleteEmployee = (_id, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  await httpClient.delete(`/employees/${_id}`);
  if (onSuccess) onSuccess();
  dispatch(stopLoading());
};

export default employeesSlice.reducer;
