import { API } from "@src/constants";
import baseProvider from "./base-provider";

export default {
  ...baseProvider(API.deviceInfo),
  getIp: () => {
    return new Promise((resolve, reject) => {
      fetch(`https://geolocation-db.com/json/`, { method: "get" })
        .then((x) => {
          resolve(x.json());
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
