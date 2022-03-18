import { message } from "antd";
import roomProvider from "@data-access/team-provider";
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import dataCache from "@utils/data-cache";
import { UrlServer } from "@src/utils/client-utils";
// import { message } from "antd";
export default {
  state: {
    stompClient: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      dataCache.save(`_store_chat`, { ...state, ...payload });
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    // xem chi tiết bản ghi theo id
    connect: (payload = {}, state) => {
      var stompClient = null;
      var socket = null;
      var chatRoomId = 1;

      function connect() {
        socket = new SockJS(UrlServer() + "/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect(
          { chatRoomId: chatRoomId, userId: 1 },
          stompSuccess,
          stompFailure
        );
        dispatch.chat.updateData({ stompClient });
      }

      const stompSuccess = (frame) => {
        dispatch.chat.subscribeAllRoom();
        stompClient.subscribe("/topic/publicChatRoom", (data) => {
          dispatch.message.updateMessage(JSON.parse(data?.body));
        });
        stompClient.subscribe("/topic/public.realtime", (data) => {
          const resData = JSON.parse(data?.body);
          if (
            resData.idLockAccount === state.auth?.auth?.userId &&
            state.auth?.auth?.type === resData.type
          ) {
            message.error(
              "Tài khoản của bị đã bị khóa. Hệ thống sẽ tự động đăng xuất. Vui lòng liên hệ quản trị viên",
              10000
            );
            setTimeout(() => {
              dispatch.auth._logout();
            }, 10000);
          }
        });

        // dispatch.chat.sendMessage();
      };

      function stompFailure(error) {
        console.log("fail");
      }

      connect();
    },
    subscribe: (chatRoomId, state) => {
      state.chat.stompClient?.subscribe(
        "/topic/" + chatRoomId + ".public.messages",
        "message subcribe =))"
      );
    },
    sendMessage: ({ idTeam, content } = {}, state) => {
      // if (!roomId) {
      //   message.error("chưa chọn phòng");
      //   return;
      // }
      // if (!state.auth?.auth?.userId) {
      //   message.error("chưa đăng nhập");
      //   return;
      // }
      state.chat.stompClient?.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify({
          idUser: state?.auth?.auth?.userId,
          createdBy: state.auth?.auth?.userId,
          idTeam: state.message?.idTeam,
          content,
        })
      );
    },
    subscribeAllRoom: (_, state) => {
      roomProvider
        ._search({ size: 999, userId: state?.auth?.auth?.userId })
        .then((res) => {
          if (res && res.code === 0) {
            dispatch.chat.updateData({
              listRoomId: res.data,
            });
            dispatch.team.updateData({
              _listData: res.data,
            });
          }
        });
    },
    lockAccount: (data, state) => {
      console.log(data, "data..");
      state.chat.stompClient?.send("/app/chat.lock", {}, JSON.stringify(data));
    },
  }),
};
