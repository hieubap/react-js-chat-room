import Header from "@src/components/Header";
import { route_res_manager } from "../constants";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { WrapperStyled } from "./styled";

export default function Site() {
  return (
    <WrapperStyled>
      <Header />
      <Switch>
        {route_res_manager.map(({ path, ...rest }, index) => (
          <Route key={index} path={path} {...rest} />
        ))}
      </Switch>
    </WrapperStyled>
  );
}
