import authProvider from "data-access/auth-provider";
import clientUtils from "utils/client-utils";
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
            // message.error(e?.message || "Đăng ký không thành công");
            reject(e);
          });
      });
    },
    _login: ({ username, password }) => {
      dispatch.auth.updateData({
        auth: null,
      });
      return new Promise((resolve, reject) => {
        authProvider
          .login({
            username,
            password,
          })
          .then((s) => {
            localStorage.setItem("auth", JSON.stringify(s?.data));
            dispatch.auth.updateData({
              auth: s?.data,
            });
            resolve(s);
          })
          .catch((e) => {
            // message.error(e?.message || "Đăng nhập không thành công");
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
  }),
};
