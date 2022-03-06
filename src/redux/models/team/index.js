import fetchProvider from "@data-access/team-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "team",
    title: "Nhóm",
  }),
};
