import { parseUrlParams } from "@src/utils/common";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const Oauth = ({ onLogin }) => {
  useEffect(() => {
    const param = parseUrlParams();
    console.log(param, "param");
    onLogin(param);
  }, []);

  return <div>OAUTH</div>;
};

export default connect(
  () => ({}),
  ({ auth: { onLogin } }) => ({ onLogin })
)(Oauth);
