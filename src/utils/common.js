import { getState } from "@src/redux";
import moment from "moment";
import clientUtils from "./client-utils";

const combineUrlParams = (url = "", params = {}) => {
  const keys = Object.keys(params);
  const paramUrl = keys
    .reduce(
      (result, key) =>
        params[key] !== undefined && params[key] !== null && params[key] !== ""
          ? [...result, `${key}=${params[key]}`]
          : [...result],
      []
    )
    .join("&");
  return `${url}?${paramUrl}`;
};

// chuyển param thành object
export const parseParams = () => {
  const { search } = window.location;
  const arrParam = (search.split("?")[1] || "").split("&");
  const output = {};
  arrParam.forEach((item) => {
    const arr = item.split("=");
    output[arr[0]] = arr[1];
  });
  return output;
};
export const momentFromNow = (m) => {
  const date = moment(m);
  const fy = date.year();
  const fM = date.month();
  const fd = date.day();
  const fh = date.hour();
  const fm = date.minute();
  const fs = date.second();

  const now = moment();
  const ny = now.year();
  const nM = now.month();
  const nd = now.day();
  const nh = now.hour();
  const nm = now.minute();
  const ns = now.second();

  if (ny - fy > 0) return `${ny - fy} năm`;
  if (nM - fM > 0) return `${nM - fM} tháng`;
  if (nd - fd > 0) return `${nd - fd} ngày`;
  if (nh - fh > 0) return `${nh - fh} giờ`;
  if (nm - fm > 0) return `${nm - fm} phút`;
  if (ns - fs > 0) return `${ns - fs} giây`;
};

const timeFromNow = (fromDate, format) => {
  const date = new Date(fromDate);
  const fy = date.getFullYear();
  const fM = date.getMonth();
  const fd = date.getDay();
  const fh = date.getHours();
  const fm = date.getMinutes();
  const fs = date.getSeconds();

  const now = new Date();
  const ny = now.getFullYear();
  const nM = now.getMonth();
  const nd = now.getDay();
  const nh = now.getHours();
  const nm = now.getMinutes();
  const ns = now.getSeconds();

  if (ny - fy > 0) return `${ny - fy} năm trước`;
  if (nM - fM > 0) return `${nM - fM} tháng trước`;
  if (nd - fd > 0) return `${nd - fd} ngày trước`;
  if (nh - fh > 0) return `${nh - fh} giờ trước`;
  if (nm - fm > 0) return `${nm - fm} phút trước`;
  if (ns - fs > 0) return `${ns - fs} giây trước`;
};

export const getImg = (avatar) => {
  return avatar
    ? `${clientUtils.serverApi}/files/${avatar}`
    : "https://media-cdn.tripadvisor.com/media/photo-s/15/c5/84/65/khong-gian-nha-hang-vu.jpg";
};

Number.prototype.formatPrice = function () {
  return this.toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
    .replace(".00", "")
    .replace(/,/g, ".");
};
String.prototype.formatPrice = function () {
  try {
    return parseInt(this)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .replace(".00", "")
      .replace(/,/g, ".");
  } catch (error) {}
  return this;
};

export { combineUrlParams, timeFromNow };
