import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./pages";
import stores from "./redux";
import LngProvider from "@lng";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <Provider store={stores}>
      <LngProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LngProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
