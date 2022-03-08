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
      joinTeam: (_, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider
            .joinTeam({
              idRes: state.resManager?._dataFilter?.id,
              idNewUser: state.auth?.auth?.userId,
              active: true,
            })
            .then((res) => {
              resolve(res);
            });
        });
      },
    }),
  }),
};
