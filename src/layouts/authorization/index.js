import { checkRole } from "@utils/index";
import React from "react";
import { connect } from "react-redux";

const UnAuth = <div>Không đủ quyền</div>; //React.lazy(() => import("pages/unAuth"));

const Authorization = ({ auth, children, accessRoles, isCheckRoute = false }) => {
  const roles = [];
  const isSuperAdmin = roles.includes("ROLE_SUPER_ADMIN");

  if (checkRole(accessRoles, roles) || isSuperAdmin) {
    return children;
  }
  if (isCheckRoute) return <UnAuth />;

  return <div>Không đủ quyền</div>;
};

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(Authorization);
