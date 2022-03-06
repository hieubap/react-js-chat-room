import fetchProvider from "@data-access/message-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "message",
    title: "Tin nhắn",
  }),
};
