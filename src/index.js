import "@fortawesome/fontawesome-free/css/all.min.css";
import PublicLayout from "@layouts/public";
import "leaflet/dist/leaflet.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import stores from "./redux";
import "./style.scss";
import Oauth from "./views/oauth";

const Root = () => {
  return (
    <>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        autoClose={5000}
      ></ToastContainer>
      <Provider store={stores}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/sso" render={(props) => <Oauth {...props} />} />
            <Route path="/p" render={(props) => <PublicLayout {...props} />} />
            <Redirect to="/p/home" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
