import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./actions/index.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import 'reactjs-popup/dist/index.css';
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer position="top-right" toastStyle={{ fontSize: "14px" }} autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
    <App />
  </Provider>
);
