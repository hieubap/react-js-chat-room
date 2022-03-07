import fetchProvider from "@data-access/team-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "team",
    title: "Nhóm",
    customEffect: ({ dispatch }) => ({
      addUser: (dto, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider.addUser(dto).then((res) => {
            resolve(res);
          });
        });
      },
    }),
  }),
};
