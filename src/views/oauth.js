import { parseUrlParams } from "@src/utils/common";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import TimeGrid from "./timegrid";

const Oauth = ({ onLogin }) => {
  useEffect(() => {
    const param = parseUrlParams();
    console.log(param, "param");
    localStorage.setItem("auth", JSON.stringify({ token: param.token }));
    // onLogin(param);
  }, []);

  return <div>OAUTH</div>;
};

export default connect(
  () => ({}),
  ({ auth: { onLogin } }) => ({ onLogin })
)(Oauth);
