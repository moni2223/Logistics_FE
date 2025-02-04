export const LOCAL_URL = import.meta.env.VITE_APP_ENVIRONMENT === "development" ? "https://logistics.radipleven.top" : "";
export const URL = import.meta.env.VITE_APP_API_URL || LOCAL_URL;
export const FE_URL = import.meta.env.VITE_APP_FE_URL;
