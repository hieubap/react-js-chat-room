import { API } from "@src/constants";
import baseProvider from "./base-provider";
import { combineUrlParams } from "@utils/common";
import clientUtils from "@utils/client-utils";

export default {
  ...baseProvider(API.room),
  getListRoomId({ page = 0, size = 999, ...param } = {}) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          combineUrlParams(`${API.room}/list-room-id`, {
            page,
            size,
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
