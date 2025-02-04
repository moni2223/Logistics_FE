import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  shipments: [],
  shipment: null,
};
export const shipmentsSlice = createSlice({
  name: "shipmentsSlice",
  initialState,
  reducers: {
    setShipments: (state, { payload }) => ({ ...state, shipments: payload }),
    setShipment: (state, { payload }) => ({ ...state, shipment: payload }),
  },
});
export const { setShipments, setShipment } = shipmentsSlice.actions;

export const getAllShipments = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/shipments");
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setShipments(data));
  dispatch(stopLoading());
};

export const getShipmentById = (id, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/shipments/${id}`);
  if (onSuccess) onSuccess(data);
  dispatch(setShipment(data));
  dispatch(stopLoading());
};

export const createShipment = (payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/shipments", { ...payload });
  if (onSuccess) onSuccess(data);
  dispatch(stopLoading());
};

export const editShipment = (id, payload, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.put(`/shipments/${id}`, { ...payload });
  if (onSuccess) onSuccess(data);
  dispatch(stopLoading());
};

export const deleteShipment = (id, onSuccess) => async (dispatch) => {
  dispatch(startLoading());
  await httpClient.delete(`/shipments/${id}`);
  if (onSuccess) onSuccess();
  dispatch(stopLoading());
};

export default shipmentsSlice.reducer;
