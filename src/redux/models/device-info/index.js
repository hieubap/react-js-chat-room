import fetchProvider from "@data-access/device-info-provider";
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
        if (compare(data, info)) {
          toast.error(
            "Tài khoản của bạn đã bị đăng xuất khỏi thiết bị. hệ thống sẽ tự động logout sau 5s"
          );
          setTimeout(() => {
            dispatch.auth.onLogout();
          }, 5000);
        } else {
          dispatch.deviceInfo.updateData({
            listCurrentUser: listCurrentUser.filter(
              (item) => item.id !== data?.id
            ),
          });
        }
      },
      onLogoutDevice: (payload, { socket: { stompClient } }) => {
        stompClient?.send(`/app/logout.device.${payload}`, {});
      },
    }),
  }),
};
