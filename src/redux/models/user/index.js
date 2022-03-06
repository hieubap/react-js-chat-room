import fetchProvider from "@data-access/user-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "user",
    title: "Khách",
  }),
};
