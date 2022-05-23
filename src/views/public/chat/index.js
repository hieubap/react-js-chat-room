import fileProvider from "@src/data-access/file-provider";
import { dataURLtoFile, momentFromNow } from "@src/utils/common";
import { getImg } from "@utils/common";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Message from "./components/message";
import ModalAddMember from "./modal/member";
import { WrapperStyled } from "./styled";

let countFile = 1;

const ChatContainer = ({
  auth,
  listRoom,
  listMessage,
  listAllUser,
  currentRoomId,
  currentRoom,
  createRoom,
  getAllUser,
  addUser,
  updateData,
  sendMessage,
  getListMessage,
  changeAvatar,
  addUsers,
  addFriend,
  myFiend,
  allMyFriend,
}) => {
  const [state, _setState] = useState({ content: "", listFile: [], page: 0 });
  const refModalAddMem = useRef();
  const refModalNewChat = useRef();
  const refModalAddFriend = useRef();
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  useEffect(() => {
    myFiend();
    getAllUser();
  }, []);
  const handleAddUser = (idUser) => () => {
    addUser(idUser);
  };
  const selectRoom = (room) => () => {
    console.log(room, "room");
    updateData({ currentRoomId: room?.userId, currentRoom: room });
    getListMessage({ roomId: room?.userId });
  };
  const onPasteClipboard = (pasteEvent) => {
    var item = pasteEvent.clipboardData.items[0];

    if (item.type.indexOf("image") === 0) {
      var blob = item.getAsFile();

      var reader = new FileReader();
      reader.onload = function (event) {
        var image = new Image();

        image.src = reader.result;
        if (state.listFile?.length === 0) {
          setTimeout(() => {
            document.getElementById("id-content-chat-message")?.scrollIntoView({
              block: "end",
              behavior: "smooth",
            });
          }, 200);
        }
        image.onload = function () {
          setState({
            listFile: [
              ...state.listFile,
              {
                src: event.target.result,
                autoW: image.width > image.height,
                image: dataURLtoFile(
                  event.target.result,
                  `clipboard${moment().format(
                    "YYYY_MM_DD_HH_mm_ss"
                  )}__${countFile++}`
                ),
                reader,
              },
            ],
          });
        };
      };

      reader.readAsDataURL(blob);
    }
  };

  const addMembers = (listId) => {
    if (listId?.length === 0) {
      toast.error("Chưa chọn người dùng");
      return;
    }
    addUsers(listId).then((res) => {
      if (refModalNewChat.current) {
        refModalAddMem.current.cancel();
      }
    });
  };

  const newChat = (listId) => {
    if (listId?.length === 0) {
      toast.error("Chưa chọn người dùng");
      return;
    }
    createRoom(listId).then((res) => {
      if (refModalNewChat.current) {
        refModalNewChat.current.cancel();
      }
    });
  };

  const onAddFriend = (listId) => {
    if (listId?.length === 0) {
      toast.error("Chưa chọn người dùng");
      return;
    }
    addFriend({ listId });
  };

  return (
    <WrapperStyled>
      <div className="main-left">
        <div className="room-header">
          <div className="room-header-title">Chat</div>
          <div className="room-header-top">
            <div className="room-header-top-img">
              <label htmlFor="upload-avatar">
                <img src={getImg(auth?.image)} />
              </label>
            </div>
            <div className="room-header-top-name">{auth?.fullName || " "}</div>
            <input
              id="upload-avatar"
              type="file"
              onChange={(e) => {
                const [file] = e.target.files;
                changeAvatar(file);
              }}
            />
            <div>
              <i
                className="fa-solid fa-handshake"
                onClick={() => {
                  if (refModalAddFriend.current)
                    refModalAddFriend.current.show();
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                  if (refModalNewChat.current) refModalNewChat.current.show();
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className="room-group">
          {allMyFriend?.map((item, idx) => (
            <div key={idx} className="room-item" onClick={selectRoom(item)}>
              <div className="room-item-img">
                <img src={getImg(item?.avatar)} />
              </div>
              <div className="room-item-content">
                <div className="room-item-content-user">
                  {item.name || item.username}
                </div>
                <div className="room-item-content-message">
                  <span>
                    {item?.lastMessage?.fullName
                      ? item?.lastMessage?.fullName?.substring(
                          item?.lastMessage?.fullName.length - 4
                        )
                      : " "}
                  </span>
                  <span>{item?.lastMessage?.content} </span>
                  <span>
                    . {item.createdAt && momentFromNow(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-center">
        <div className="main-center-top">
          <div className="main-center-top-img">
            <img src={getImg(currentRoom?.avatar)} />
          </div>
          <div className="main-center-top-name">{currentRoom?.name}</div>
        </div>
        <div
          className={`main-center-mid ${
            state.listFile?.length > 0 ? "main-center-mid-visible-file" : ""
          }`}
          onScroll={(e) => {
            if (e.target.scrollTop < 120 && !state.loading) {
              setState({ loading: true, page: state.page + 1 });
              getListMessage({ roomId: currentRoomId, page: state.page });
            }
          }}
        >
          <div id="id-content-chat-message" className="content-message">
            {listMessage.map((item, idx) => (
              <Message
                key={idx}
                data={{ ...item, content: item.text }}
                front={listMessage[idx - 1]?.fromUser === item.fromUser}
                end={listMessage[idx + 1]?.fromUser === item.fromUser}
                numberLike={listMessage[idx + 1]?.numberLike}
                listMessage={listMessage}
              />
            ))}
          </div>
        </div>
        {currentRoomId && (
          <div
            className={`main-center-bottom ${
              state.listFile?.length > 0
                ? "main-center-bottom-visible-file"
                : ""
            }`}
          >
            {/* <div className="bottom-tools">
            <div className="bottom-tools-item">+</div>
            <div className="bottom-tools-item">+</div>
            <div className="bottom-tools-item">+</div>
            <div className="bottom-tools-item">+</div>
          </div> */}
            <div className="bottom-input-message">
              <div
                className={`message-file ${
                  state.listFile?.length > 0 ? "message-file-over" : ""
                }`}
              >
                {state.listFile.map((item, idx) => (
                  <div className="message-file-item">
                    <div className="file-item_img">
                      <img
                        id="img-clipboard"
                        src={item.src}
                        className={`${item.autoW ? "auto-w" : "auto-h"}`}
                      />
                    </div>
                    <div
                      className="file-item_icon-remove"
                      onClick={() => {
                        setState({
                          listFile: state.listFile.filter((_, i) => i != idx),
                        });
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                ))}
              </div>
              <input
                // contentEditable="true"
                onPaste={onPasteClipboard}
                placeholder="Aa"
                value={state.content}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    if (!!state.content) {
                      sendMessage({ content: state.content, type: 1 });
                      setState({ content: "" });
                    }
                    if (state.listFile.length > 0) {
                      Promise.all(
                        state.listFile.map((file) =>
                          fileProvider.upload(file.image)
                        )
                      ).then((res) => {
                        sendMessage({
                          content: JSON.stringify(
                            res.map((i) => i.data?.filePath)
                          ),
                          type: 2,
                        });
                        setState({ listFile: [] });
                      });
                    }
                  }
                }}
                onChange={(e) => setState({ content: e.target?.value })}
              />
            </div>
          </div>
        )}
      </div>
      <div className="main-right">
        <div className="main-right-header">
          <div className="main-center-top-img">
            <img src={getImg(currentRoom?.avatar)} />
          </div>
          <div className="main-right-header-name">{currentRoom?.name}</div>
        </div>
        <div className="main-right-body">
          <div className="collapse-tool-title">Xem thành viên nhóm</div>
          {currentRoomId && (
            <div className="list-user">
              <div
                className="list-user-item"
                // onClick={handleAddUser(item.id)}
              >
                <div className="list-user-item-img">
                  <img src={getImg(currentRoom?.admin?.avatar)} />
                </div>
                <div className="list-user-item-content">
                  <div className="list-user-item-content-user">
                    {currentRoom?.admin?.fullName}
                  </div>
                  <div className="list-user-item-content-message">
                    <span>Quản trị viên</span>
                  </div>
                </div>
              </div>
              {currentRoom?.connectedUsers?.map((item, key) => (
                <div
                  key={key}
                  className="list-user-item"
                  // onClick={handleAddUser(item.id)}
                >
                  <div className="list-user-item-img">
                    <img src={getImg(item?.avatar)} />
                  </div>
                  <div className="list-user-item-content">
                    <div className="list-user-item-content-user">
                      {item.fullName}
                    </div>
                    <div className="list-user-item-content-message">
                      <span></span>
                    </div>
                  </div>
                  <div
                    className="list-user-item-remove"
                    onClick={() => {
                      toast.error(
                        "Tính năng hiện chưa có. DEV bận chưa có thời gian phát triển =))"
                      );
                    }}
                  >
                    <i className="fa-solid fa-remove"></i>
                  </div>
                </div>
              ))}
              <div
                className="list-user-item"
                onClick={() => {
                  console.log("click ...");
                  if (refModalAddMem.current) refModalAddMem.current.show({});
                }}
              >
                <div className="list-user-item-img">
                  <i className="fa-solid fa-plus"></i>
                </div>
                <div className="list-user-item-content">
                  <div className="list-user-item-content-user">
                    Thêm thành viên
                  </div>
                  <div className="list-user-item-content-message">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalAddMember
        ref={refModalAddMem}
        onSubmit={addMembers}
        title="Thêm người"
      />
      <ModalAddMember
        ref={refModalNewChat}
        onSubmit={newChat}
        title="Hội thoại mới"
      />
      <ModalAddMember
        ref={refModalAddFriend}
        onSubmit={onAddFriend}
        title="Kết bạn"
      />
    </WrapperStyled>
  );
};

export default connect(
  ({
    socket: {
      currentRoomId,
      listRoom,
      listAllUser,
      listMessage,
      currentRoom,
      allMyFriend,
    },
    auth: { auth },
  }) => ({
    auth,
    currentRoomId,
    currentRoom,
    listRoom,
    listMessage,
    listAllUser,
    allMyFriend,
  }),
  ({
    auth: { changeAvatar },
    socket: {
      createRoom,
      getAllUser,
      addUser,
      sendMessage,
      getListMessage,
      updateData,
      addUsers,
      addFriend,
      myFiend,
    },
  }) => ({
    createRoom,
    getAllUser,
    addUser,
    getListMessage,
    updateData,
    sendMessage,
    changeAvatar,
    addUsers,
    addFriend,
    myFiend,
  })
)(ChatContainer);
