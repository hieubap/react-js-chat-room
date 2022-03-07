import { Avatar, Button, Drawer, Input, message, Popconfirm, Tabs } from "antd";
import CircularProgress from "@core/components/CircularProgress";
import CustomScrollbars from "@core/components/CustomScrollbar";
import IntlMessages from "@core/components/IntlMessages";
import Moment from "moment";
import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getImg } from "@utils";
import ChatUserList from "./components/ChatUserList";
import ContactList from "./components/ContactList";
import Conversation from "./components/Conversation";
import users from "./data/chatUsers";
import conversationList from "./data/conversationList";
import { StyledWrapper } from "./styled";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputTimeout from "@src/components/InputTimeout";
// import "./index.css";

const TabPane = Tabs.TabPane;

const Chat = (props) => {
  const [state, _setState] = useState({
    loader: false,
    userNotFound: "No user found",
    drawerState: false,
    selectedSectionId: "",
    selectedTabIndex: 1,
    userState: 1,
    searchChatUser: "",
    contactList: users.filter((user) => !user.recent),
    selectedUser: {},
    message: "",
    chatUsers: users.filter((user) => user.recent),
    conversationList: conversationList,
    conversation: null,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const {
    chat: { connect, sendMessage },
    team: { _createOrEdit: createTeam, _getList: getTeam, addUser },
    user: { _getList: _getListUser },
  } = useDispatch();

  const { _listData: listTeam } = useSelector((state) => state.team);
  const { auth } = useSelector((state) => state.auth);
  const {
    idTeam,
    selectTeam,
    _listData: listMessage,
  } = useSelector((state) => state.message);
  const { _listData: listUser } = useSelector((state) => state.user);

  console.log(listMessage, "listmessage");

  useEffect(() => {
    connect();
  }, []);

  const filterContact = (userName) => {
    if (userName === "") {
      return users.filter((user) => !user.recent);
    }
    return users.filter(
      (user) =>
        !user.recent &&
        user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };

  const filterUsers = (userName) => {
    if (userName === "") {
      return users.filter((user) => user.recent);
    }
    return users.filter(
      (user) =>
        user.recent &&
        user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1
    );
  };

  const Communication = () => {
    const { message, selectedUser = {}, conversation } = state;
    // const { conversationData } = conversation;
    return (
      <div className="gx-chat-main">
        <div className="gx-chat-main-header">
          <span className="gx-d-block gx-d-lg-none gx-chat-btn">
            <i
              className="gx-icon-btn icon icon-chat"
              onClick={onToggleDrawer.bind(this)}
            />
          </span>
          <div className="gx-chat-main-header-info">
            <div className="gx-chat-avatar gx-mr-2">
              <div className="gx-status-pos">
                {/* <Avatar
                  src={selectedUser.thumb}
                  className="gx-rounded-circle gx-size-60"
                  alt=""
                /> */}

                {/* <span className={`gx-status gx-${selectedUser.status}`} /> */}
              </div>
            </div>

            <div className="gx-chat-contact-name">{selectedUser.name}</div>
          </div>
        </div>

        <CustomScrollbars className="gx-chat-list-scroll">
          <Conversation
            conversationData={listMessage}
            selectedUser={selectedUser}
          />
        </CustomScrollbars>

        <div className="gx-chat-main-footer">
          <div
            className="gx-flex-row gx-align-items-center"
            style={{ maxHeight: 51 }}
          >
            <div className="gx-col">
              <div className="gx-form-group">
                <textarea
                  id="required"
                  className="gx-border-0 ant-input gx-chat-textarea"
                  onKeyUp={_handleKeyPress.bind(this)}
                  onChange={updateMessageValue.bind(this)}
                  value={message}
                  placeholder="Type and hit enter to send message"
                />
              </div>
            </div>
            <SendOutlinedIcon
              className="gx-icon-btn icon icon-sent"
              onClick={submitComment.bind(this)}
            />
            {/* <i  /> */}
          </div>
        </div>
      </div>
    );
  };

  const actions = [
    {
      name: "Đặt bàn",
    },
    {
      name: "Xem thành viên",
    },
    {
      name: "Thêm thành viên",
      onClick: () => {},
    },
    {
      name: "Rời nhóm",
    },
  ];

  const AppUsersInfo = () => {
    return (
      <div className="gx-chat-sidenav-main">
        {/* <div className="gx-bg-grey-light gx-chat-sidenav-header">
          <div className="gx-chat-user-hd gx-mb-0">
            <i
              className="gx-icon-btn icon icon-arrow-left"
              onClick={() => {
                setState({ userState: 1 });
              }}
            />
          </div>
          <div className="gx-chat-user gx-chat-user-center">
            <div className="gx-chat-avatar gx-mx-auto">
              <Avatar
                src="https://via.placeholder.com/150x150"
                className="gx-size-60"
                alt="John Doe"
              />
            </div>

            <div className="gx-user-name h4 gx-my-2">Robert Johnson</div>
          </div>
        </div> */}
        {idTeam && (
          <div className="gx-chat-sidenav-content">
            <CustomScrollbars className="gx-chat-sidenav-scroll">
              <div className="gx-p-4 group-action">
                {actions.map((item, idx) => (
                  <div
                    key={idx}
                    className={`action-item ${
                      idx === state.selectAction ? "active-action-item" : ""
                    }`}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      setState({ selectAction: idx });
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="action-content">
                {state.selectAction === 2 && (
                  <div>
                    <InputTimeout
                      placeholder="Tìm tên user"
                      onChange={(e) => {
                        _getListUser({ name: e });
                      }}
                    />
                    <div className="action-content-group">
                      {listUser?.map((item) => (
                        <div
                          className="action-content-group-item"
                          onClick={() => {
                            addUser({
                              id: idTeam,
                              idNewUser: item.id,
                            }).then((res) => {
                              if (res && res.code === 0) {
                                message.success("Thêm thành viên thành công");
                              } else {
                                message.error(res.message);
                              }
                            });
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {state.selectAction === 1 && (
                  <div>
                    <div className="action-content-group">
                      {selectTeam.listUser?.map((item) => (
                        <div
                          className="action-content-group-item"
                          onClick={() => {
                            addUser({
                              id: idTeam,
                              idNewUser: item.id,
                            }).then((res) => {
                              if (res && res.code === 0) {
                                message.success("Thêm thành viên thành công");
                              } else {
                                message.error(res.message);
                              }
                            });
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CustomScrollbars>
          </div>
        )}
      </div>
    );
  };

  console.log(listTeam, selectTeam, "listTeam");

  const ChatUsers = () => {
    return (
      <div className="gx-chat-sidenav-main">
        <div className="gx-chat-sidenav-header">
          <div className="gx-chat-user-hd">
            <div
              className="gx-chat-avatar gx-mr-3"
              onClick={() => {
                setState({
                  userState: 2,
                });
              }}
            >
              <div className="gx-status-pos">
                <Avatar
                  id="avatar-button"
                  src={getImg(auth.avatar)}
                  // "https://via.placeholder.com/150x150"
                  className="gx-size-50"
                  alt=""
                />
                <span className="gx-status gx-online" />
              </div>
            </div>

            <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
              <div className="gx-module-title">
                <h5 className="gx-mb-0">{auth?.full_name}</h5>
              </div>
              <div className="gx-module-user-detail">
                <span className="gx-text-grey gx-link">{auth?.email}</span>
              </div>
            </div>
          </div>

          <Popconfirm
            onConfirm={() => {
              createTeam({
                idLeader: auth?.userId,
              }).then((res) => {
                if (res && res.code === 0) {
                  message.success("Tạo nhóm mới thành công");
                  getTeam({ userId: auth?.userId });
                }
              });
            }}
            title="Bạn có chắc muốn tạo nhóm mới"
          >
            <Button type="primary">Tạo nhóm mới</Button>
          </Popconfirm>

          <div className="gx-chat-search-wrapper">
            {/* <SearchBox
              styleName="gx-chat-search-bar gx-lt-icon-search-bar-lg"
              placeholder="Search or start new chat"
              onChange={updateSearchChatUser.bind(this)}
              value={state.searchChatUser}
            /> */}
          </div>
        </div>

        <div className="gx-chat-sidenav-content">
          {/*<AppBar position="public" className="no-shadow chat-tabs-header">*/}
          <Tabs className="gx-tabs-half" defaultActiveKey="1">
            <TabPane label={"Nhóm của bạn"} tab={"Nhóm của bạn"} key="1">
              <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">
                {/* {state.chatUsers.length === 0 ? (
                  <div className="gx-p-5">{state.userNotFound}</div>
                ) : (
                  
                )} */}
                <ChatUserList
                  chatUsers={listTeam}
                  selectedSectionId={state.selectedSectionId}
                  onSelectUser={onSelectUser}
                />
              </CustomScrollbars>
            </TabPane>
            {/* <TabPane
              label={<IntlMessages id="chat.contacts" />}
              tab={<IntlMessages id="chat.contacts" />}
              key="2"
            >
              <CustomScrollbars className="gx-chat-sidenav-scroll-tab-2">
                {state.contactList.length === 0 ? (
                  <div className="gx-p-5">{state.userNotFound}</div>
                ) : (
                  <ContactList
                    contactList={state.contactList}
                    selectedSectionId={state.selectedSectionId}
                    onSelectUser={onSelectUser.bind(this)}
                  />
                )}
              </CustomScrollbars>
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    );
  };

  const _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitComment();
    }
  };

  const handleChange = (event, value) => {
    setState({ selectedTabIndex: value });
  };

  const handleChangeIndex = (index) => {
    setState({ selectedTabIndex: index });
  };

  console.log(state, "state...");

  const onSelectUser = (selectTeam) => {
    setState({ selectTeam });
    // setState({
    //   // loader: true,
    //   selectedSectionId: user.id,
    //   drawerState: props.drawerState,
    //   selectedUser: user,
    //   conversation: state.conversationList.find((data) => data.id === user.id),
    // });
    // setState({ loader: false });
    // setTimeout(() => {
    // }, 500);
  };

  const showCommunication = () => {
    return (
      <div className="gx-chat-box">
        {!idTeam ? (
          <div className="gx-comment-box">
            <div className="gx-fs-80">
              <i className="icon icon-chat gx-text-muted" />
            </div>
            <h1 className="gx-text-muted">Chọn chóm để bắt đầu trò chuyện</h1>
            <Button
              className="gx-d-block gx-d-lg-none"
              type="primary"
              onClick={onToggleDrawer.bind(this)}
            >
              Chọn nhóm
            </Button>
          </div>
        ) : (
          Communication()
        )}
      </div>
    );
  };

  const submitComment = () => {
    if (state.message !== "") {
      // const updatedConversation = state.conversation.conversationData.concat({
      //   type: "sent",
      //   message: state.message,
      //   sentAt: Moment().format("hh:mm:ss A"),
      // });

      sendMessage({ content: state.message });
      setState({ message: "" });
      // setState({
      //   conversation: {
      //     ...state.conversation,
      //     conversationData: updatedConversation,
      //   },
      //   message: "",
      //   conversationList: state.conversationList.map((conversationData) => {
      //     if (conversationData.id === state.conversation.id) {
      //       return {
      //         ...state.conversation,
      //         conversationData: updatedConversation,
      //       };
      //     } else {
      //       return conversationData;
      //     }
      //   }),
      // });
    }
  };

  const updateMessageValue = (evt) => {
    setState({
      message: evt.target.value,
    });
  };

  const updateSearchChatUser = (evt) => {
    setState({
      searchChatUser: evt.target.value,
      contactList: filterContact(evt.target.value),
      chatUsers: filterUsers(evt.target.value),
    });
  };

  const onToggleDrawer = () => {
    setState({
      drawerState: !state.drawerState,
    });
  };

  const { loader, userState, drawerState } = state;
  return (
    <StyledWrapper className="gx-main-content">
      <div className="gx-app-module gx-chat-module">
        <div className="gx-chat-module-box">
          <div className="gx-d-block gx-d-lg-none">
            <Drawer
              placement="left"
              closable={false}
              visible={drawerState}
              onClose={onToggleDrawer.bind(this)}
            >
              {userState === 1 ? ChatUsers() : AppUsersInfo()}
            </Drawer>
          </div>
          <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
            {userState === 1 ? ChatUsers() : AppUsersInfo()}
          </div>
          {loader ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : (
            showCommunication()
          )}
          <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
            {AppUsersInfo()}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default connect(
  ({}) => ({}),
  ({}) => ({})
)(Chat);
