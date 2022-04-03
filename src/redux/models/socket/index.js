import accountProvider from "@data-access/account-provider";
import roomProvider from "@data-access/room-provider";
import messageProvider from "@data-access/message-provider";
import dataCache from "@utils/data-cache";
import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import { createRef } from "react";
import fileProvider from "@src/data-access/file-provider";
import client from '@utils/client-utils'
// import { message } from "antd";

const refTimeout = createRef();

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
      const { userId } = state.auth?.auth || {};

      function connect() {
        socket = new SockJS("http://localhost:8085/chat-server/ws"); // api/v1
        stompClient = Stomp.over(socket);
        stompClient.connect(
          { Authorization : client.auth},
          stompSuccess,
          stompFailure
        );
        dispatch.socket.updateData({ stompClient });
      }

      const stompSuccess = (frame) => {
        console.log(frame, "frame");
        if (userId) {
          stompClient.subscribe("/broker/chat/" + userId, ({ body }) => {
            const res = JSON.parse(body);
            if (res.type === "listRoom") {
              dispatch.socket.updateData({ listRoom: res.data });
            } else if (res.type === "join") {
              dispatch.socket.updateListRoom(res.data);
            } else if (res.type === "warning") {
              toast.error(res.data);
            } else if (res.type === "chat") {
              dispatch.socket.updateListMessage(res.data);
              dispatch.socket.sendlastSeen({
                messageId: res.data?.id,
                roomId: res.data?.roomId,
              });
            } else if (res.type === "lastSeen") {
              console.log("updatelastseen");
              dispatch.socket.updateLastSeen(res.data);
            }
            console.log("received body: ", res);
          });
          stompClient.send("/app/list.room." + userId, {}, {});
        }
      };

      function stompFailure(error) {
        toast.error("Hệ thống đang bảo trì. Xin vui lòng chờ ...");
      }

      connect();
    },
    createRoom: (_, { auth: { auth } }) => {
      roomProvider._post({ adminId: auth?.userId }).then((res) => {
        if (res && res.code === 0) {
          dispatch.socket.updateListRoom(res.data);
        }
      });
    },
    getAllUser: (_) => {
      accountProvider._search({ page: 0, size: 99 }).then((res) => {
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
    updateListRoom: (payload, state) => {
      const { listRoom } = state.socket;
      const indexRoom = listRoom.findIndex((item) => item.id === payload.id);
      if (indexRoom !== -1) {
        listRoom.splice(indexRoom, 1);
      }

      dispatch.socket.updateData({ listRoom: [payload, ...listRoom] });
    },
    updateListMessage: (payload, state) => {
      const { listMessage, currentRoomId } = state.socket;

      if (currentRoomId != payload.roomId) {
        return;
      }

      dispatch.socket.updateData({ listMessage: [...listMessage, payload] });
      dispatch.socket.scrollToBottom();
    },
    updateLastSeen: (payload, state) => {
      const { listMessage, currentRoomId } = state.socket;
      const newMessages = Object.assign([], listMessage);

      if (currentRoomId != payload.roomId) {
        return;
      }

      const indexMessage = listMessage.findIndex(
        (item) => item.id === payload.messageId
      );
      const indexRemove = listMessage.findIndex((item) =>
        item.listLastSeen?.some((i) => i.userId === payload.userId)
      );

      if (indexRemove != -1) {
        const messageSeen = newMessages[indexRemove];
        messageSeen.listLastSeen = messageSeen?.listLastSeen.filter(
          (i) => i.userId != payload.userId
        );
        newMessages.splice(indexRemove, 1, messageSeen);
      }

      if (indexMessage != -1) {
        const messageSeen = newMessages[indexMessage];
        if (!messageSeen?.listLastSeen) {
          messageSeen.listLastSeen = [payload];
        } else messageSeen?.listLastSeen.push(payload);
        newMessages.splice(indexMessage, 1, messageSeen);
      }
      dispatch.socket.updateData({ listMessage: [...newMessages] });
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
      { auth: { auth }, socket: { currentRoomId, stompClient } }
    ) => {
      messageProvider
        ._search({ roomId, sort: "createdAt,asc", size: 99 })
        .then((res) => {
          if (res && res.code === 0) {
            dispatch.socket.updateData({ listMessage: res.data });
            dispatch.socket.sendlastSeen({
              messageId: res.data[res.data?.length - 1]?.id,
              roomId: res.data[res.data?.length - 1]?.roomId,
            });
            dispatch.socket.scrollToBottom();
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
      { content } = {},
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
        })
      );
    },
    // remove
    changeAvatar: (file, { auth: { auth } }) => {
      console.log(auth, "auth..");
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
