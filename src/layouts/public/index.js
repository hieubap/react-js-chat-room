import deviceInfoProvider from "@src/data-access/device-info-provider";
import { routes_public } from "@views/routes";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import AuthModal from "../../views/public/container/login-modal";
import Header from "../header";
import { WrapperLayoutPublic } from "./styled";

const Public = ({ auth, getDeviceInfo, connectSocket, checkLogout }) => {
  useEffect(() => {
    getDeviceInfo();
    // checkLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (auth?.token) {
      console.log(auth, "auth");
      connectSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <WrapperLayoutPublic>
      <Header></Header>
      <div className="main-content">
        <AuthModal />
        <Switch>
          {routes_public.map((item, index) => (
            <Route key={index} path={item.path} component={item.component} />
          ))}
        </Switch>
      </div>
    </WrapperLayoutPublic>
  );
};

export default connect(
  ({ auth: { auth } }) => ({ auth }),
  ({
    deviceInfo: { getDeviceInfo, checkLogout },
    socket: { connect: connectSocket },
  }) => ({
    getDeviceInfo,
    connectSocket,
    checkLogout,
  })
)(Public);
