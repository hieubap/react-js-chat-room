import { message } from "antd";
import authProvider from "@data-access/auth-provider";
import clientUtils from "@src/utils/client-utils";
import { toast } from "react-toastify";
import accountProvider from "@src/data-access/account-provider";
export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) {
          const parseData = JSON.parse(data);
          clientUtils.auth = "Bearer " + parseData.token;
          return parseData;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    _register: (payload) => {
      dispatch.auth.updateData({
        auth: null,
      });
      return new Promise((resolve, reject) => {
        authProvider
          .register(payload)
          .then((s) => {
            dispatch.auth.updateData({
              auth: s?.data,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Đăng ký không thành công");
            reject(e);
          });
      });
    },
    _login: ({ username, password, role }) => {
      dispatch.auth.updateData({
        auth: null,
      });
      let api = "/user";
      if (role === 2) {
        api = "/res-manager";
      }
      if (role === 3) {
        api = "/admin";
      }
      return new Promise((resolve, reject) => {
        authProvider
          .login(
            {
              username,
              password,
            },
            api
          )
          .then((s) => {
            localStorage.setItem("auth", JSON.stringify({ ...s?.data, role }));
            dispatch.auth.updateData({
              auth: { ...s?.data, role },
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Đăng nhập không thành công");
            reject(e);
          });
      });
    },
    _logout: () => {
      localStorage.removeItem("auth");
      dispatch.auth.updateData({
        auth: null,
      });
      window.location.href = "/";
    },
    updateAuth: ({ email, full_name, avatar }, state) => {
      const auth = { ...state.auth?.auth, email, full_name, avatar };
      dispatch.auth.updateData({
        auth,
      });
      localStorage.setItem("auth", JSON.stringify(auth));
    },
    onLogin: (payload, state) => {
      return new Promise((resolve, reject) => {
        authProvider
          .login(payload)
          .then((res) => {
            if (res && res.code === 0) {
              localStorage.setItem("auth", JSON.stringify(res?.data));
              toast.success("Đăng nhập thành công");
              dispatch.auth.updateData({ auth: res.data });
              // setTimeout(() => {
              //   window.location.reload();
              // }, 5000);

              resolve(res);
            } else {
              toast.error(res.message);
              reject(res);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    onRegister: (payload, state) => {
      return new Promise((resolve, reject) => {
        authProvider
          .register(payload)
          .then((res) => {
            if (res && res.code === 0) {
              toast.success(
                "Đăng ký thành công. Vui lòng đăng nhập vào hệ thống"
              );
              resolve(res);
            } else {
              toast.error(res.message);
              reject(res);
            }
          })
          .catch(reject);
      });
    },
    updateAvatar: (filePath, { auth: { auth } }) => {
      accountProvider.changeAvatar({ avatar: filePath }).then((res) => {
        if (res && res.code == 0) {
          dispatch.auth.updateData({
            auth: { ...auth, avatar: filePath },
          });
          localStorage.setItem(
            "auth",
            JSON.stringify({ ...auth, avatar: filePath })
          );

          toast.success("Đổi ảnh đại diện thành công");
        }
      });
    },
  }),
};
