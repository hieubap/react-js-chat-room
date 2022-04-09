import fetchProvider from "@data-access/device-info-provider";
import authProvider from "@src/data-access/auth-provider";
import deviceInfoProvider from "@src/data-access/device-info-provider";
import { getAuditInfo } from "@src/utils/common";
import { toast } from "react-toastify";
import baseStore from "../base-store";

const compare = (data1, data2) => {
  return (
    data1?.ip === data2?.ip &&
    data1?.nameDevice === data2?.nameDevice &&
    data1?.address === data2?.address &&
    data1?.application === data2?.application
  );
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...baseStore({
    fetchProvider,
    storeName: "deviceInfo",
    title: "Lịch sử đăng nhập",
    initState: { size: 20, listCurrentUser: [] },
    customEffect: ({ dispatch }) => ({
      getDeviceInfo: () => {
        fetchProvider.getIp().then((res) => {
          dispatch.deviceInfo.updateData({ info: getAuditInfo(res) });
        });
      },
      getCurrentUser: (payload, { auth: { auth }, deviceInfo: { info } }) => {
        fetchProvider
          .search({ page: 0, size: 99, accountId: auth.userId })
          .then((res) => {
            if (res && res.code === 0) {
              dispatch.deviceInfo.updateData({
                listCurrentUser: res.data.map((item) =>
                  compare(item, info) ? { ...item, current: true } : item
                ),
              });
            }
          });
      },
      logoutDevice: (data, { deviceInfo: { info, listCurrentUser } }) => {
        dispatch.deviceInfo.updateData({
          listCurrentUser: listCurrentUser.filter(
            (item) => item.id !== data?.id
          ),
        });
      },
      onLogoutDevice: (
        { id, password },
        { auth: { auth }, socket: { stompClient } }
      ) => {
        const body = {
          username: auth.username,
          password,
        };
        stompClient?.send(`/app/logout.device.${id}`, {}, JSON.stringify(body));
      },
      checkLogout: (payload, { auth: { auth } }) => {
        console.log(auth, "auth");
        if (!auth?.deviceInfoId) return;
        deviceInfoProvider.checkLogout(auth?.deviceInfoId).then((res) => {
          if (res && res.data) {
            toast.error("Thiết bị đã bị đăng xuất");
            authProvider.logout(5000);
          } else {
            if (auth?.userId) {
              dispatch.socket.connect();
            }
          }
        });
      },
    }),
  }),
};
