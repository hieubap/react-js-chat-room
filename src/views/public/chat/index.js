import { momentFromNow } from "@src/utils/common";
import { getImg } from "@utils/common";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/message";
import AuthModal from "../container/login-modal";
import { WrapperStyled } from "./styled";

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
}) => {
  const [state, _setState] = useState({ content: "" });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  useEffect(() => {
    getAllUser();
  }, []);
  const handleCreate = () => {
    createRoom();
  };
  const handleAddUser = (idUser) => () => {
    addUser(idUser);
  };
  const selectRoom = (room) => () => {
    updateData({ currentRoomId: room?.id, currentRoom: room });
    getListMessage(room?.id);
  };
  return (
    <WrapperStyled>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        autoClose={5000}
      ></ToastContainer>
      <div className="main-left">
        <div className="room-header">
          <div>Chat</div>
          <div className="room-header-top">
            <div className="room-header-top-img">
              <label htmlFor="upload-avatar">
                <img src={getImg(auth?.avatar)} />
              </label>
            </div>
            <div className="room-header-top-name">{auth?.full_name}</div>
            <input
              id="upload-avatar"
              type="file"
              onChange={(e) => {
                const [file] = e.target.files;
                changeAvatar(file);
              }}
            />
            <button onClick={handleCreate}>Tạo phòng</button>
          </div>
        </div>
        <div className="room-group">
          {listRoom.map((item, idx) => (
            <div key={idx} className="room-item" onClick={selectRoom(item)}>
              <div className="room-item-img">
                <img src={getImg(item?.admin?.avatar)} />
              </div>
              <div className="room-item-content">
                <div className="room-item-content-user">Room {item.id}</div>
                <div className="room-item-content-message">
                  {item?.lastMessage?.fullName && (
                    <span>
                      {item?.lastMessage?.fullName?.substring(
                        item?.lastMessage?.fullName.length - 5
                      )}
                      :{" "}
                    </span>
                  )}
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
          <div className="main-center-top-name">{currentRoom?.id}</div>
        </div>
        <div className="main-center-mid">
          <div id="id-content-chat-message" className="content-message">
            {listMessage.map((item, idx) => (
              <Message
                key={idx}
                data={item}
                front={listMessage[idx - 1]?.fromId === item.fromId}
                end={listMessage[idx + 1]?.fromId === item.fromId}
                listMessage={listMessage}
              />
            ))}
          </div>
        </div>
        <div className="main-center-bottom">
          <div className="bottom-tools">
            <div className="bottom-tools-item">+</div>
            <div className="bottom-tools-item">+</div>
            <div className="bottom-tools-item">+</div>
            <div className="bottom-tools-item">+</div>
          </div>
          <div className="bottom-input-message">
            <input
              // contentEditable="true"

              placeholder="Aa"
              value={state.content}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  sendMessage({ content: state.content });
                  setState({ content: "" });
                }
              }}
              onChange={(e) => setState({ content: e.target?.value })}
            />
          </div>
        </div>
      </div>
      <div className="main-right">
        <div className="main-right-header">
          <div className="main-center-top-img">
            <img src="https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg" />
          </div>
          <div className="main-right-header-name">Nhóm học thêm</div>
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
                </div>
              ))}
            </div>
          )}
          <div className="collapse-tool-title">Thêm thành viên nhóm</div>
          {currentRoomId && (
            <div className="list-user">
              {listAllUser.map((item, key) => (
                <div
                  key={key}
                  className="list-user-item"
                  onClick={handleAddUser(item.id)}
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
                </div>
              ))}
              <div className="list-user-item">
                <div className="list-user-item-img">
                  <img src="https://akisa.vn/uploads/plugin/product_items/13551/mau-biet-thu-nha-dep-2-tang-hien-dai-bt21377-v2.jpg" />
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
    </WrapperStyled>
  );
};

export default connect(
  ({
    socket: { currentRoomId, listRoom, listAllUser, listMessage, currentRoom },
    auth: { auth },
  }) => ({
    auth,
    currentRoomId,
    currentRoom,
    listRoom,
    listMessage,
    listAllUser,
  }),
  ({
    socket: {
      createRoom,
      getAllUser,
      addUser,
      sendMessage,
      getListMessage,
      updateData,
      changeAvatar,
    },
  }) => ({
    createRoom,
    getAllUser,
    addUser,
    getListMessage,
    updateData,
    sendMessage,
    changeAvatar,
  })
)(ChatContainer);
