import fetchProvider from "@data-access/post-emoji-provider";
import { dispatch } from "@src/redux";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "postEmoji",
    title: "Like",
    // afterDelete: (data, dispatch) => {
    //   dispatch.postEmoji.onLike({ data, isLike: false });
    // },
    afterSave: (data, dispatch) => {
      dispatch.postEmoji.onLike({
        ...data,
        likeId: data?.id,
        updateLikeId: true,
      });
    },
    customEffect: ({ dispatch }) => ({
      onLike: ({ postId, likeId, isLike, updateLikeId }, state) => {
        const newListPost = Object.assign([], state.post.listData);
        const index = newListPost.findIndex((item) => item.id === postId);
        if (!updateLikeId) {
          newListPost[index].numberLike += isLike ? 1 : -1;
          newListPost[index].isLike = isLike;
        } else {
          newListPost[index].likeId = likeId ? likeId : null;
        }

        dispatch.post.updateData({ listData: newListPost });
      },

      // deleteLike: (postId, state) => {
      //   const { userId } = state.auth?.auth;
      //   fetchProvider._search({ userId, postId }).then((res) => {
      //     if (res && res.code === 0 && res.data && res.data[0]?.id) {
      //       fetchProvider._delete(res.data[0]?.id);
      //     }
      //   });
      // },
      // createLike: (postId, state) => {
      //   const { userId } = state.auth?.auth;
      //   fetchProvider._post({ userId, postId }).then((res) => {});
      // },
    }),
  }),
};
