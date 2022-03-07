import React from "react";
import { ROLES } from "@src/constants";
import { getState } from "@src/redux";
import clientUtils from "./client-utils";

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

export const getImg = (avatar) => {
  return avatar
    ? `${clientUtils.serverApi}/files/${avatar}`
    : "https://media-cdn.tripadvisor.com/media/photo-s/15/c5/84/65/khong-gian-nha-hang-vu.jpg";
};

export const getIdFromUrl = () => {
  const splitArr = window.location.pathname?.split("/");
  const id = parseInt(splitArr[splitArr.length - 1]);
  return isNaN(id) ? null : id;
};
