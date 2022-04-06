import SideBar from "@src/layouts/sidebar";
import { routes_setting } from "@src/views/routes";
import React from "react";
import { Route, Switch } from "react-router";
import { WrapperContent } from "./styled";

const Tools = ({ history }) => {
  return (
    <WrapperContent>
      <SideBar history={history}></SideBar>
      <div className="wrapper-content-setting">
        <Switch>
          {routes_setting.map((item, index) => (
            <Route key={index} path={item.path} component={item.component} />
          ))}
        </Switch>
      </div>
    </WrapperContent>
  );
};

export default Tools;
