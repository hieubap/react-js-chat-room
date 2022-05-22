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

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  state: {
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
    connect: (payload = {}, state) => {
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
      };

      function stompFailure(error) {
        toast.error("Hệ thống đang bảo trì. Xin vui lòng chờ ...");
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
    addUser: (userId, { socket: { currentRoomId } }) => {
      roomProvider.addUser(userId, currentRoomId).then((res) => {
        if (res && res.code === 0) {
          //   dispatch.socket.updateData({ listAllUser: res.data });
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
        newList = newRoom;
      }
      const listRoomMap = newList.map((item) => ({
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
        addField = { currentRoom: listRoomMap[0], currentRoomId: newRoom?.id };
        dispatch.socket.getListMessage(newRoom?.id);
      }
      dispatch.socket.updateData({
        listRoom: listRoomMap,
        ...addField,
      });
    },
    updateListMessage: (payload, state) => {
      const { listMessage, currentRoomId, listRoom } = state.socket;

      if (currentRoomId !== payload.roomId) {
        const roomReceived = listRoom.find((i) => i.id === payload.roomId);
        dispatch.socket.updateListRoom({
          newRoom: {
            ...roomReceived,
            lastMessage: payload,
            lastMessageId: payload.id,
          },
          isNew: true,
        });
        return;
      }

      dispatch.socket.updateData({
        listMessage: [...listMessage, payload],
        [`messageRoom${payload.roomId}`]: [...listMessage, payload],
      });
      dispatch.socket.scrollToBottom();
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
    scrollToBottom: () => {
      if (refTimeout.current) {
        clearTimeout(refTimeout.current);
      }
      refTimeout.current = setTimeout(() => {
        document
          .getElementById("id-content-chat-message")
          ?.scrollIntoView({ block: "end", behavior: "smooth" });
      });
    },
    getListMessage: (
      roomId,
      {
        auth: { auth },
        socket: { currentRoomId, stompClient, listMessage, ...rest },
      }
    ) => {
      if (rest[`messageRoom${roomId}`]) {
        dispatch.socket.updateData({
          listMessage: rest[`messageRoom${roomId}`],
        });
        setTimeout(() => {
          dispatch.socket.scrollToBottom();
          const listMess = rest[`messageRoom${roomId}`];
          dispatch.socket.sendlastSeen({
            messageId: listMess[listMess?.length - 1]?.id,
            roomId: listMess[listMess?.length - 1]?.roomId,
          });
        }, 100);
      } else {
        dispatch.socket.updateData({
          [`messageRoom${roomId}`]: [],
        });
        messageProvider
          .search({ roomId, sort: "createdAt,desc", size: 20 })
          .then((res) => {
            if (res && res.code === 0) {
              if (roomId === currentRoomId) {
                dispatch.socket.updateData({
                  listMessage: res.data?.reverse(),
                  [`messageRoom${roomId}`]: res.data,
                });
              } else
                dispatch.socket.updateData({
                  [`messageRoom${roomId}`]: res.data?.reverse(),
                });
              dispatch.socket.sendlastSeen({
                messageId: res.data[res.data?.length - 1]?.id,
                roomId: res.data[res.data?.length - 1]?.roomId,
              });
              dispatch.socket.scrollToBottom();
            }
          });
      }
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
      { auth: { auth }, socket: { stompClient, currentRoomId } }
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
