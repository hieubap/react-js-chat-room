import { message } from "antd";
import roomProvider from "@data-access/room-provider";
import SockJS from "sockjs-client";
import Stomp from "stomp-websocket";
import dataCache from "@utils/data-cache";
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
        socket = new SockJS("http://localhost:8880/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect(
          { chatRoomId: chatRoomId, userId: 1 },
          stompSuccess,
          stompFailure
        );
        dispatch.chat.updateData({ stompClient });
      }

      function stompSuccess(frame) {
        // enableInputMessage();
        // successMessage(
        //   "Your WebSocket connection was successfuly established!"
        // );

        // dispatch.chat.subscribe(1);
        dispatch.chat.subscribeAllRoom();
        // stompClient.subscribe("/topic/room/1", () => {});
        // stompClient.send(
        //   "/chat/send.message",
        //   {},
        //   JSON.stringify({
        //     roomId: 1,
        //     content: "nội dung gửi đi",
        //   })
        // );

        // stompClient.subscribe("/topic/publicChatRoom", () => {});

        // // Tell your username to the server
        // stompClient.send(
        //   "/app/chat.addUser",
        //   {},
        //   JSON.stringify({ senderId: 1, sender: "username", type: "JOIN" })
        // );

        // stompClient.subscribe(
        //   "/chatroom/connected.users",
        //   updateConnectedUsers
        // );
        // stompClient.subscribe("/chatroom/old.messages", oldMessages);

        // stompClient.subscribe(
        //   "/user/queue/" + chatRoomId + ".private.messages",
        //   privateMessages
        // );
        // stompClient.subscribe(
        //   "/topic/" + chatRoomId + ".connected.users",
        //   updateConnectedUsers
        // );
      }

      function stompFailure(error) {
        console.log("fail");
        // errorMessage("Lost connection to WebSocket! Reconnecting in 10 seconds...");
        // disableInputMessage();
        // setTimeout(connect, 10000);
      }

      function disconnect() {
        // if (stompClient != null) {
        //   stompClient.disconnect();
        // }
        // window.location.href = "/chat";
      }

      function updateConnectedUsers(response) {
        // var connectedUsers = JSON.parse(response.body);
        // var $tbody = $("tbody").html("");
        // bindConnectedUsers();
      }

      function oldMessages(response) {
        // var instantMessages = JSON.parse(response.body);
        // $.each(instantMessages, function (index, instantMessage) {
        //   if (instantMessage.public == true) {
        //     appendPublicMessage(instantMessage);
        //   } else {
        //     appendPrivateMessage(instantMessage);
        //   }
        // });
        // scrollDownMessagesPanel();
      }

      function publicMessages(message) {
        var instantMessage = JSON.parse(message.body);
        appendPublicMessage(instantMessage);
        scrollDownMessagesPanel();
      }

      function appendPublicMessage(instantMessage) {
        // if (instantMessage.fromUser == "admin") {
        //   newMessages.append(
        //     '<p class="alert alert-warning"><strong>' +
        //       instantMessage.fromUser +
        //       "</strong>: " +
        //       instantMessage.text +
        //       "</p>"
        //   );
        // } else {
        //   newMessages.append(
        //     "<p>" +
        //       instantMessage.fromUser +
        //       ": " +
        //       instantMessage.text +
        //       "</p>"
        //   );
        // }
      }

      function privateMessages(message) {
        // var instantMessage = JSON.parse(message.body);
        // appendPrivateMessage(instantMessage);
        // scrollDownMessagesPanel();
      }

      function appendPrivateMessage(instantMessage) {
        // newMessages.append(
        //   '<p class="alert alert-info">[private] ' +
        //     "<strong>" +
        //     instantMessage.fromUser +
        //     ' <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> ' +
        //     instantMessage.toUser +
        //     "</strong>: " +
        //     instantMessage.text +
        //     "</p>"
        // );
      }

      function sendMessage() {
        var instantMessage;

        // if (inputMessageIsEmpty()) {
        //   inputMessage.focus();
        //   return;
        // }

        // if (spanSendTo.text() == "public") {
        //   instantMessage = {
        //     text: inputMessage.val(),
        //   };
        // } else {
        //   instantMessage = {
        //     text: inputMessage.val(),
        //     toUser: spanSendTo.text(),
        //   };
        // }
        // stompClient.send(
        //   "/chatroom/send.message",
        //   {},
        //   JSON.stringify(instantMessage)
        // );
        // inputMessage.val("").focus();
      }

      function sendTo(e) {
        // spanSendTo.text(e.toElement.textContent);
        // inputMessage.focus();
      }

      function checkEnter(e) {
        // var key = e.which;
        // if (key == 13) {
        //   btnSend.click();
        //   return false;
        // }
      }

      function scrollDownMessagesPanel() {
        // newMessages.animate({ scrollTop: newMessages[0].scrollHeight }, "fast");
      }

      function enableInputMessage() {
        // inputMessage.prop("disabled", false);
      }

      function successMessage(msg) {
        // noty({
        //   text: msg,
        //   layout: "top",
        //   type: "success",
        //   timeout: 5000,
        // });
      }

      function errorMessage(msg) {
        // noty({
        //   text: msg,
        //   layout: "top",
        //   type: "error",
        //   timeout: 5000,
        // });
      }

      //   inputMessage.on("keypress", checkEnter).focus();
      //   btnSend.on("click", sendMessage);
      //   btnDisconnect.on("click", disconnect);
      //   btnPublic.on("click", function () {
      //     spanSendTo.text("public");
      //     inputMessage.focus();
      //   });

      // //////connect();



      //   bindConnectedUsers();
      //   scrollDownMessagesPanel();
      //   disableInputMessage();
    },
    subscribe: (chatRoomId, state) => {
      state.chat.stompClient?.subscribe(
        "/topic/" + chatRoomId + ".public.messages",
        "message subcribe =))"
      );
    },
    sendMessage: ({ roomId }, state) => {
      if (!roomId) {
        message.error("chưa chọn phòng");
        return;
      }
      if (!state.auth?.auth?.userId) {
        message.error("chưa đăng nhập");
        return;
      }
      state.chat.stompClient?.send(
        "/chat/send.message",
        {},
        JSON.stringify({
          createdBy: state.auth?.auth?.userId,
          roomId,
          content: "nội dung gửi đi",
        })
      );
    },
    subscribeAllRoom: () => {
      roomProvider.getListRoomId().then((res) => {
        if (res && res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            dispatch.chat.subscribe(res.data[i]);
          }
          dispatch.chat.update({ listRoomId: res.data });
        }
      });
    },
    
  }),
};
