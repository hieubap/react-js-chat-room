import fetchProvider from "@data-access/admin-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "admin",
    title: "Quản trị",
  }),
};
