import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { routes_public } from "@views/routes";
import { useDispatch, useSelector } from "react-redux";

const Public = () => {
  const { connect } = useDispatch().socket;
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    connect();
  }, [auth]);

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
