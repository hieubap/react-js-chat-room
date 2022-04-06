import { routes_public } from "@views/routes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Header from "../header";
import { WrapperLayoutPublic } from "./styled";
import AuthModal from "../../views/public/container/login-modal";

const Public = () => {
  const {
    deviceInfo: { getDeviceInfo },
    socket: { connect },
  } = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    getDeviceInfo();
  }, []);
  useEffect(() => {
    if (auth?.userId) {
      console.log(auth, "auth");
      connect();
    }
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

export default Public;
