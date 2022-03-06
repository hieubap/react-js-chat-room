import { API } from "@src/constants";
import clientUtils from "@src/utils/client-utils";
import { combineUrlParams } from "@src/utils/common";
import baseProvider from "./base-provider";

export default {
  ...baseProvider(API.account),
  getUser: ({ page = 0, size = 10, ...param } = {}) => {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          combineUrlParams(`${API.account}`, {
            page,
            size: 999,
            ...param,
          }),
          {}
        )
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
