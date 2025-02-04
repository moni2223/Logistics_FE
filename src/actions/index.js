import { configureStore } from "@reduxjs/toolkit";

import general from "./general";
import shipments from "./shipments";
import offices from "./offices";
import employees from "./employees";

export * from "./general";
export * from "./shipments";
export * from "./offices";
export * from "./employees";

const store = configureStore({
  reducer: {
    general,
    shipments,
    offices,
    employees,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
