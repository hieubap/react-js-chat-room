import React from "react";
import { Route, Switch } from "react-router";
import { routes_public } from "@views/routes";

const Public = () => {
  return (
    <>
      <div className="main-content">
        <Switch>
          {routes_public.map((item, index) => (
            <Route key={index} path={item.path} component={item.component} />
          ))}
        </Switch>
      </div>
    </>
  );
};

export default Public;
