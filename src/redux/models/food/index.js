import fetchProvider from "@data-access/food-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "food",
    title: "Món ăn",
  }),
};
