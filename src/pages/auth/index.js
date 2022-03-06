import React from "react";
import { Route, Switch } from "react-router-dom";
import { route_auth } from "../constants";
import { WrapperStyled } from "./styled";
import "@assets/css/font-awesome.css";

export default function Auth() {
  return (
    <WrapperStyled>
      <Switch>
        {route_auth.map(({ path, ...rest }, index) => (
          <Route key={index} path={path} {...rest} />
        ))}
      </Switch>
    </WrapperStyled>
  );
}
