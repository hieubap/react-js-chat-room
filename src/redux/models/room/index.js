import roomProvider from "@data-access/room-provider";
import fetchProvider from "@data-access/room-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "room",
    title: "Nhóm",
    customEffect: ({ dispatch }) => ({
    //   createRoom: (payload, state) => {
    //       roomProvider._post({}).then(res => {
    //           if(res && res.code === 0){
    //               dispatch.room.
    //           }
    //       })
    //   },
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
