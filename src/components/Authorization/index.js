import { checkRole } from "@utils";
import React from "react";
import { connect } from "react-redux";

const UnAuth = <div></div>; //React.lazy(() => import("pages/unAuth"));

const Authorization = ({ auth, children, accessRoles, isCheckRoute = false }) => {
  const roles = [];
  const isSuperAdmin = roles.includes("ROLE_AdminISofH");

  if (checkRole(accessRoles, roles) || isSuperAdmin) {
    return children;
  }
  if (isCheckRoute) return <UnAuth />;

  return null;
};

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(Authorization);
