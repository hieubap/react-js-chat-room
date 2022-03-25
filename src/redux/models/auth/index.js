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
