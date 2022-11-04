import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from 'react-redux'
import store from './store/store'
import "./assets/styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //開發模式下會出現console.log很多次，部署後就不會一直印了
// 這樣在App.js裡面的所有component都可以用到redux
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
