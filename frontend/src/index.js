import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = createRoot(document.getElementById("root"));
export async function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 50000);
  }).then(() => promise);
}
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
