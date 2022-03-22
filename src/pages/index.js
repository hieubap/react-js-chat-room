import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Auth from "./auth";
import Admin from "./admin";
import { theme } from "./constants";
import Site from "./user";
import ResManager from "./resManager";
import { useDispatch, useSelector } from "react-redux";
import ChatContainer from "./chat";

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

const App = (props) => {
  const { connect } = useDispatch().socket;
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(auth,'auth');
    if (auth?.userId) {
      connect();
    }
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={viVN}>
        <ChatContainer />
        {/* <Switch>
          <Route path={"/fsocial"} component={Site} />
          <Route path={"/res-manager"} component={ResManager} />
          <Route path={"/admin"} component={Admin} />
          <Route path={"/auth"} component={Auth} />
          <Redirect path="/" to={"/fsocial/home"} />
        </Switch> */}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
