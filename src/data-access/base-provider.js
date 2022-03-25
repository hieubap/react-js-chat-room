import { combineUrlParams } from "@utils/common";
import clientUtils from "@utils/client-utils";

export default (API = "") => ({
  search({ page = 0, size = 10, ...param }) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          combineUrlParams(`${API}`, {
            page,
            size,
            ...param,
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
  detail(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", `${API}/${id}`, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  post(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", API, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  put(body, id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", `${API}/${id}`, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("delete", `${API}/${id}`, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
});
