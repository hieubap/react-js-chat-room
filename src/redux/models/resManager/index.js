import fetchProvider from "@data-access/res-manager-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "resManager",
    title: "Quản lý nhà hàng",
  }),
};
