import fetchProvider from "@data-access/like-provider";
import { dispatch } from "@src/redux";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "like",
    title: "Like",
    customEffect: ({ dispatch }) => ({
      onLike: ({ postId, isLike }, state) => {
        const newListPost = Object.assign([], state.post._listData);
        const index = newListPost.findIndex((item) => item.id === postId);
        newListPost[index].numberLike += isLike ? 1 : -1;
        newListPost[index].isLike = isLike;

        dispatch.post.updateData({ _listData: newListPost });
      },
      deleteLike: (postId, state) => {
        const { userId } = state.auth?.auth;
        fetchProvider._search({ userId, postId }).then((res) => {
          if (res && res.code === 0 && res.data && res.data[0]?.id) {
            fetchProvider._delete(res.data[0]?.id);
          }
        });
      },
      createLike: (postId, state) => {
        const { userId } = state.auth?.auth;
        fetchProvider._post({ userId, postId }).then((res) => {});
      },
    }),
  }),
};
