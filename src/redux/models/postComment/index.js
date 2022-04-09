import fetchProvider from "@data-access/post-comment-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "postComment",
    title: "Bình luận",
    // customEffect: ({ dispatch }) => ({
    //   deleteComment: (postId, state) => {
    //     const { userId } = state.auth?.auth;
    //     return new Promise((resolve, reject) => {
    //       fetchProvider
    //         ._search({ userId, postId })
    //         .then((res) => {
    //           if (res && res.code === 0 && res.data && res.data[0]?.id) {
    //             fetchProvider
    //               ._delete(res.data[0]?.id)
    //               .then((res) => resolve(res))
    //               .catch((e) => reject(e));
    //           }
    //         })
    //         .catch((e) => reject(e));
    //     });
    //   },
    // }),
  }),
};
