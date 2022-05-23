import authProvider from "@src/data-access/auth-provider";
import clientUtils from "@src/utils/client-utils";
import { parseUrlParams } from "@src/utils/common";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import TimeGrid from "./timegrid";

const Oauth = ({ onLogin, updateData, auth }) => {
  useEffect(() => {
    const param = parseUrlParams();
    localStorage.setItem("auth", JSON.stringify(param));
    clientUtils.auth = "Bearer " + param.token;
    authProvider.me().then((res) => {
      const data = {
        ...param,
        ...res,
      };
      updateData({ auth: data });
      localStorage.setItem("auth", JSON.stringify(data));
      window.location.href = "/p/chat";
    });
    // onLogin(param);
  }, []);

  return <div>OAUTH</div>;
};

export default connect(
  ({ auth }) => ({ auth }),
  ({ auth: { onLogin, updateData } }) => ({ onLogin, updateData })
)(Oauth);
