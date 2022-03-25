import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import stores from "./redux";
import "./style.scss";

import PublicLayout from "@layouts/public";

const Root = () => {
  return (
    <Provider store={stores}>
      <BrowserRouter>
        <Switch>
          <Route path="/p" render={(props) => <PublicLayout {...props} />} />
          <Redirect to="/p/home" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
