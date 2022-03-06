import fetchProvider from "@data-access/order-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "order",
    title: "Đơn hàng",
  }),
};
