import { API } from "@constants";
import clientUtils from "@utils/client-utils";
import { combineUrlParams } from "@src/utils/common";

export default {
  login(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "post",
          combineUrlParams(`/auth-server/oauth/authorize`, {
            response_type: "code",
            client_id: "hoang",
            scope: "read",
            state: "2K4ZDYkjCYQf6u5NPJYGDtOtxmUkgI73WIcI-PJFe8k%3D",
            redirect_uri: "http://localhost:3000",
          }),
          {},
          true
        )
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  register(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", `${API.account}/register`, body, true)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
