import { ROLES } from "@constants";
import { getState } from "../redux";

export const checkRole = (accessRoles, roles) => {
  const state = getState();
  const listRoles = state?.auth?.auth?.authorities || [];
  const isSuperAdmin = listRoles.includes(ROLES["SUPER_ADMIN"]);

  if (!accessRoles || accessRoles.length < 1 || isSuperAdmin) {
    return true;
  }
  return (
    accessRoles.map((rA) => listRoles.includes(rA)).filter((b) => !b).length < 1
  );
};
