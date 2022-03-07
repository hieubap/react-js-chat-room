import fetchProvider from "@data-access/message-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "message",
    title: "Tin nhắn",
    ignoreCache: true,
    customEffect: ({ dispatch }) => ({
      updateMessage: (dto, state) => {
        if (state.team._listData.some((item) => item.id === dto.idTeam)) {
          if (state.message?.idTeam === dto.idTeam)
            dispatch.message.updateData({
              _listData: [...state.message._listData, dto],
            });
          // else {
          //   dispatch.message._getList({
          //     idTeam: dto.idTeam,
          //     size: 999,
          //     sort: "createdAt,asc",
          //   });
          // }
          document
            .getElementById("id-content-chat-message")
            .scrollIntoView({ block: "end", behavior: "smooth" });
        }
      },
    }),
  }),
};
