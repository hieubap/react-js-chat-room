import fetchProvider from "@data-access/account-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "account",
    title: " Người dùng",
    customEffect: ({ dispatch }) => ({
      getUser: (payload, state) => {
        fetchProvider.getUser().then((res) => {
          if (res && res.code === 0) {
            dispatch.account.updateData({ listUser: res.data });
          }
        });
      },
    }),
  }),
};
