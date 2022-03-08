import { API } from "@src/constants";
import baseProvider from "./base-provider";
import clientUtils from "@src/utils/client-utils";

export default {
  ...baseProvider(API.team),
  addUser: (body) => {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", API.team + "/add-user", body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  joinTeam: (body) => {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", API.team + "/join", body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
