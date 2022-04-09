import fetchProvider from "@data-access/account-provider";
import baseStore from "../base-store";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...baseStore({
    fetchProvider,
    storeName: "user",
    title: "Người dùng",
    initState: { size: 20 },
  }),
};
