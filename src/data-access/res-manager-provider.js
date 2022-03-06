import { API } from "@src/constants";
import clientUtils from "@src/utils/client-utils";
import baseProvider from "./base-provider";

export default {
  ...baseProvider(API.resManager),
  _post(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", API.resManager + "/register", body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
