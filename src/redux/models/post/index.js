import fetchProvider from "@data-access/post-provider";
import baseStore from "../base-store";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...baseStore({
    fetchProvider,
    storeName: "post",
    title: "Bài viết",
    initState: { size: 20 },
    customEffect: ({ dispatch }) => ({
      updatePost: (payload, state) => {
        const listData = Object.assign([], state.post.listData);
        const index = listData.findIndex((item) => item.id === payload.id);
        listData[index] = payload;

        dispatch.post.updateData({ listData: listData });
      },
    }),
  }),
};
