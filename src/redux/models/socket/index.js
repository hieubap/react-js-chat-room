import accountProvider from "@data-access/account-provider";
import roomProvider from "@data-access/room-provider";
import messageProvider from "@data-access/message-provider";
import dataCache from "@utils/data-cache";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import { createRef } from "react";
import fileProvider from "@src/data-access/file-provider";
import { actionDevice, actionPublic, actionUser } from "./action";
import clientUtils from "@src/utils/client-utils";
import { getImg } from "@src/utils/common";
// import { message } from "antd";

const refTimeout = createRef();
const refReconnect = createRef();

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  state: {
    isConnect: false,
    stompClient: null,

    listRoom: [],
    listMessage: [],
    listLastSeen: [],
    listAllUser: [],
    currentRoomId: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      dataCache.save(`_store_chat`, { ...state, ...payload });
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    connect: ({ reconnect } = {}, state) => {
      if (state.socket.isConnect) {
        return;
      }
      dispatch.socket.updateData({
        isConnect: true,
      });
      var stompClient = null;
      var socket = null;
      const { userId, deviceInfoId } = state.auth?.auth || {};

      function connect() {
        socket = new SockJS("http://localhost:8800/ws"); // api/v1
        stompClient = Stomp.over(socket);
        stompClient.connect(
          {
            token: clientUtils.token,
          },
          stompSuccess,
          stompFailure
        );
        dispatch.socket.updateData({ stompClient });
      }

      const stompSuccess = (frame) => {
        console.log(frame, "frame");
        if (userId) {
          stompClient.subscribe("/broker/public", actionPublic(dispatch));
          stompClient.subscribe("/broker/user/" + userId, actionUser(dispatch));
          stompClient.subscribe(
            "/broker/device/" + deviceInfoId,
            actionDevice(dispatch)
          );

          stompClient.send("/app/list.room." + userId, {}, {});
        }
        if (reconnect) {
          clearInterval(refReconnect.current);
          refReconnect.current = null;
          reconnect = false;
          toast.success("Đã khôi phục kết nối lại");
        }
      };

      function stompFailure(error) {
        if (state.socket.isConnect) {
          dispatch.socket.updateData({
            isConnect: false,
          });
        }
        if (!refReconnect.current) {
          refReconnect.current = setInterval(() => {
            dispatch.socket.connect({ reconnect: true });
          }, 5000);
        }

        if (!reconnect) {
          toast.error("Bị mất kết nối. Xin vui lòng chờ ...");
        }
      }

      connect();
    },
    createRoom: (listUserId, { auth: { auth } }) => {
      return new Promise((resolve, reject) => {
        roomProvider
          .create({ idAddUsers: listUserId, adminId: auth?.userId })
          .then((res) => {
            if (res && res.code === 0) {
              dispatch.socket.updateListRoom({
                newRoom: res.data,
                isNew: true,
                isAdmin: true,
              });
              resolve(res);
            }
          })
          .catch(reject);
      });
    },
    getAllUser: (_) => {
      accountProvider.search({ page: 0, size: 99 }).then((res) => {
        if (res && res.code === 0) {
          dispatch.socket.updateData({ listAllUser: res.data });
        }
      });
    },
    addUsers: (listUserId, { socket: { currentRoomId } }) => {
      return new Promise((resolve, reject) => {
        roomProvider
          .addUsers(listUserId, currentRoomId)
          .then((res) => {
            if (res && res.code === 0) {
              dispatch.socket.updateData({ currentRoom: res.data });
              resolve(res.data);
            } else {
              toast.error(res.message);
              reject(res);
            }
          })
          .catch(reject);
      });
    },
    updateLastSeen: (payload, state) => {
      const { listMessage, currentRoomId } = state.socket;
      const newMessages = Object.assign([], listMessage);

      if (currentRoomId !== payload.roomId) {
        return;
      }

      const indexMessage = listMessage.findIndex(
        (item) => item.id === payload.messageId
      );
      const indexRemove = listMessage.findIndex((item) =>
        item.listLastSeen?.some((i) => i.userId === payload.userId)
      );

      if (indexRemove !== -1) {
        const messageSeen = newMessages[indexRemove];
        messageSeen.listLastSeen = messageSeen?.listLastSeen.filter(
          (i) => i.userId !== payload.userId
        );
        newMessages.splice(indexRemove, 1, messageSeen);
      }

      if (indexMessage !== -1) {
        const messageSeen = newMessages[indexMessage];
        if (!messageSeen?.listLastSeen) {
          messageSeen.listLastSeen = [payload];
        } else messageSeen?.listLastSeen.push(payload);
        newMessages.splice(indexMessage, 1, messageSeen);
      }
      dispatch.socket.updateData({ listMessage: [...newMessages] });
    },
    updateEmoji: (payload, state) => {
      const { listMessage, currentRoomId } = state.socket;
      const newMessages = Object.assign([], listMessage);

      if (currentRoomId !== payload.roomId) {
        return;
      }

      const indexMessage = listMessage.findIndex(
        (item) => item.id === payload.messageId
      );

      if (indexMessage !== -1) {
        const messageEmoji = newMessages[indexMessage];
        if (messageEmoji.listEmoji) {
          messageEmoji.listEmoji = [...messageEmoji.listEmoji, payload];
        } else {
          messageEmoji.listEmoji = [payload];
        }
        newMessages.splice(indexMessage, 1, messageEmoji);
      }
      dispatch.socket.updateData({ listMessage: [...newMessages] });
    },
    updateEmojiRemove: (payload, state) => {
      const { listMessage, currentRoomId } = state.socket;
      const newMessages = Object.assign([], listMessage);

      if (currentRoomId !== payload.roomId) {
        return;
      }

      const indexMessage = listMessage.findIndex(
        (item) => item.id === payload.messageId
      );

      if (indexMessage !== -1) {
        const messageEmoji = newMessages[indexMessage];
        messageEmoji.listEmoji = messageEmoji.listEmoji?.filter(
          (i) => i.userId !== payload.userId
        );
      }
      dispatch.socket.updateData({ listMessage: [...newMessages] });
    },
    sendEmoji: (
      { type, messageId },
      { auth: { auth }, socket: { stompClient, currentRoomId } }
    ) => {
      stompClient.send(
        `/app/send.emoji`,
        {},
        JSON.stringify({
          userId: auth?.userId,
          messageId,
          type,
          roomId: currentRoomId,
        })
      );
    },
    scrollToBottom: (notAnimate) => {
      if (refTimeout.current) {
        clearTimeout(refTimeout.current);
      }
      refTimeout.current = setTimeout(() => {
        document.getElementById("id-content-chat-message")?.scrollIntoView({
          block: "end",
          behavior: notAnimate ? "auto" : "smooth",
        });
      });
    },
    customRoom: ({ room }, state) => {
      const { listRoom } = state.socket;
      let newList = [...listRoom];

      const indexRoom = newList.findIndex((item) => item.id === room.id);
      newList.splice(indexRoom, 1, room);

      dispatch.socket.updateData({
        listRoom: newList,
      });
    },
    // lấy danh sách phòng khi kết nối
    // nhận 1 tin nhắn từ socket
    // tạo phòng mới
    // nhận event join nhóm từ socket
    updateListRoom: (
      { newRoom, isNew, isAdmin },
      { auth: { auth }, ...state }
    ) => {
      const { listRoom } = state.socket;
      let newList = [...listRoom];

      if (isNew) {
        const indexRoom = newList.findIndex((item) => item.id === newRoom.id);
        if (indexRoom !== -1) {
          newList.splice(indexRoom, 1);
        }
        newList = [newRoom, ...newList];
      } else {
        newList = newRoom; // newRoom là mảng danh sách các phòng khi kết nối
      }
      const customListRoom = newList.map((item) => ({
        ...item,
        name:
          item.connectedUsers?.length === 1
            ? item.adminId === auth?.userId
              ? item.connectedUsers[0]?.fullName
              : item.admin?.fullName
            : item.connectedUsers?.length === 0
            ? "Chỉ có bạn"
            : "Nhóm " + item.id,
        avatar:
          item.connectedUsers?.length === 1
            ? item.adminId === auth?.userId
              ? item.connectedUsers[0]?.avatar
              : item.admin?.avatar
            : item.connectedUsers?.length === 0
            ? auth.avatar
            : "",
      }));
      let addField = {};
      if (isAdmin) {
        //khi người dùng tạo phòng mới
        addField = {
          currentRoom: customListRoom[0],
          currentRoomId: newRoom?.id,
        };
        dispatch.socket.getListMessage({ roomId: newRoom?.id });
      }
      dispatch.socket.updateData({
        listRoom: customListRoom,
        ...addField,
      });
    },
    // nhận 1 tin từ socket
    updateListMessage: (payload, state) => {
      const { listMessage, currentRoomId, listRoom } = state.socket;

      const roomReceived = listRoom.find((i) => i.id === payload.roomId);
      dispatch.socket.updateListRoom({
        newRoom: {
          ...roomReceived,
          lastMessage: payload,
          lastMessageId: payload.id,
        },
        isNew: true,
      });

      if (currentRoomId !== payload.roomId) {
        dispatch.socket.updateData({
          [`messageRoom${payload.roomId}`]: [
            ...state.socket[`messageRoom${payload.roomId}`],
            payload,
          ],
        });
        return;
      }

      dispatch.socket.updateData({
        listMessage: [...listMessage, payload],
        [`messageRoom${payload.roomId}`]: [...listMessage, payload],
      });
      dispatch.socket.scrollToBottom();
    },
    getListMessage: (
      { roomId, loadMore } = {},
      {
        auth: { auth },
        socket: {
          currentRoom,
          currentRoomId,
          stompClient,
          listMessage = [],
          listRoom = [],
          ...rest
        },
      }
    ) => {
      return new Promise((resolve) => {
        const customRoomId = roomId || currentRoomId;

        if (
          rest[`messageRoom${customRoomId}`] &&
          (!loadMore || (customRoomId == currentRoomId && currentRoom.full))
        ) {
          // chọn phòng khác
          // nếu load hết tin nhắn cũ của phòng hiện tại thì stop
          dispatch.socket.updateData({
            listMessage: rest[`messageRoom${customRoomId}`],
          });
          console.log("active...", currentRoom);
          const eventScroll = (notAnimate) => {
            dispatch.socket.scrollToBottom(notAnimate);
            const listMess = rest[`messageRoom${customRoomId}`];
            dispatch.socket.sendlastSeen({
              messageId: listMess[listMess?.length - 1]?.id,
              roomId: listMess[listMess?.length - 1]?.roomId,
            });
          };
          if (currentRoom.full) {
            eventScroll(true);
          } else {
            setTimeout(eventScroll, 100);
          }

          resolve({});
        } else {
          // loadmore phòng hiện tại
          // lấy old message khi kết nối
          const page = loadMore ? (currentRoom?.page || 0) + 1 : 0;
          messageProvider
            .search({
              roomId: customRoomId,
              sort: "createdAt,desc",
              page,
              size: 20,
            })
            .then((res) => {
              if (res && res.code === 0) {
                if (customRoomId === currentRoomId) {
                  dispatch.socket.updateData({
                    listMessage: [...res.data?.reverse(), ...listMessage],
                    [`messageRoom${customRoomId}`]: [
                      ...res.data,
                      ...listMessage,
                    ],
                  });
                } else {
                  dispatch.socket.updateData({
                    [`messageRoom${customRoomId}`]: res.data?.reverse(),
                  });
                }

                const customRoom = {
                  ...listRoom.find((i) => i.id === customRoomId),
                  page,
                  full: res.data?.length < 20,
                };
                dispatch.socket.customRoom({
                  room: customRoom,
                });

                if (loadMore) {
                  dispatch.socket.updateData({
                    currentRoom: customRoom,
                  });
                }
                resolve({});

                // if (page === 0) {
                //   dispatch.socket.sendlastSeen({
                //     messageId: res.data[res.data?.length - 1]?.id,
                //     roomId: res.data[res.data?.length - 1]?.roomId,
                //   });
                //   dispatch.socket.scrollToBottom();
                // }
              }
            })
            .catch(resolve);
        }
      });
    },
    sendlastSeen: (
      { messageId, roomId },
      { auth: { auth }, socket: { stompClient, currentRoomId } }
    ) => {
      if (roomId === currentRoomId) {
        setTimeout(() => {
          stompClient?.send(
            `/app/last.seen.${auth?.userId}.${currentRoomId}.${messageId}`
          );
        }, 3000);
      }
    },
    sendMessage: (
      { content, type } = {},
      { auth: { auth }, socket: { stompClient, currentRoomId, currentRoom } }
    ) => {
      if (!currentRoomId) {
        toast.error("chưa chọn phòng");
        return;
      }
      if (!auth?.userId) {
        toast.error("chưa đăng nhập");
        return;
      }
      stompClient?.send(
        "/app/send.message",
        {},
        JSON.stringify({
          fromId: auth?.userId,
          roomId: currentRoomId,
          content,
          type,
        })
      );
    },
    // remove
    changeAvatar: (file, { auth: { auth } }) => {
      fileProvider
        .upload(file)
        .then((fileDetail) => {
          if (fileDetail && fileDetail.code === 0) {
            dispatch.auth.updateAvatar(fileDetail?.data.filePath);
          } else {
          }
        })
        .finally(() => {});
    },
  }),
};
