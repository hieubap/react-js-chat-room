import { parseUrlParams } from "@src/utils/common";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import TimeGrid from "./timegrid";

const Oauth = ({ onLogin }) => {
  useEffect(() => {
    const param = parseUrlParams();
    console.log(param, "param");
    onLogin(param);
  }, []);

  return <TimeGrid>OAUTH</TimeGrid>;
};

export default connect(
  () => ({}),
  ({ auth: { onLogin } }) => ({ onLogin })
)(Oauth);
