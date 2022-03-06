import fetchProvider from "@data-access/promotion-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "promotion",
    title: "Giảm giá",
  }),
};
