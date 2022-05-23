import { API } from "@constants";
import clientUtils from "@utils/client-utils";
import { combineUrlParams } from "@src/utils/common";
import { getState } from "@src/redux";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login(body) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "post",
          combineUrlParams(
            `/account/login`
            // `/chat-server/api/v1/login`
            // {
            //   response_type: "code",
            //   client_id: "hoang",
            //   scope: "read",
            //   state: "2K4ZDYkjCYQf6u5NPJYGDtOtxmUkgI73WIcI-PJFe8k%3D",
            //   redirect_uri: "http://localhost:3000",
            // }
          ),
          body,
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
        .requestApi("post", `/auth-server/api/v1/user/register`, body, true)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  changeAvatar(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      // ("/auth-server/api/v1/file/uploadFile");

      clientUtils
        .upload("post", "/auth-server/api/v1/file/upload-file", formData)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  logout(pending) {
    localStorage.clear();
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          combineUrlParams("/auth-server/logout", {
            token: getState().auth?.auth?.token,
          }),
          {}
        )
        .then((x) => {
          if (pending) {
            setTimeout(() => {
              window.location.href = "/p/home";
            }, pending);
          } else {
            window.location.href = "/p/home";
          }
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  me() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", "/auth-server/api/v1/user/me", {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  addFiend(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", "/chat-server/api/v1/user/add-friend/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  myFriend(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", "/chat-server/api/v1/user/get-users-is-friend", {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
