import fetchProvider from "@data-access/review-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "review",
    title: "Đánh giá",
  }),
};
