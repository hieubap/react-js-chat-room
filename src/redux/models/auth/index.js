import authProvider from "@data-access/auth-provider";
import clientUtils from "@utils/client-utils";
import { toast } from "react-toastify";
export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) {
          const parseData = JSON.parse(data);
          clientUtils.auth = "Bearer " + parseData.access_token;
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
    onLogin: (payload, state) => {
      return new Promise((resolve, reject) => {
        authProvider
          .login({ ...payload, redirectURI: "http://localhost:3000/sso" })
          .then((res) => {
            localStorage.setItem("auth", JSON.stringify(res));
            toast.success("Đăng nhập thành công");
            dispatch.auth.updateData({ auth: res });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 5000);

            resolve(res);
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
    // updateAvatar: (filePath, { auth: { auth } }) => {
    //   authProvider.changeAvatar({ avatar: filePath }).then((res) => {
    //     if (res && res.code == 0) {
    //       dispatch.auth.updateData({
    //         auth: { ...auth, avatar: filePath },
    //       });
    //       localStorage.setItem(
    //         "auth",
    //         JSON.stringify({ ...auth, avatar: filePath })
    //       );

    //       toast.success("Đổi ảnh đại diện thành công");
    //     }
    //   });
    // },
  }),
};
