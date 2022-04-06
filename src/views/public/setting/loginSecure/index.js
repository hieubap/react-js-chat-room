import { momentFromNow } from "@src/utils/common";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import List from "./list";
import { WrapperStyled } from "./styled";

const dataSource = [
  {
    name: "Máy tính Window",
    address: "Ha Noi,Viet Nam",
    broswer: "Chrome",
    type: 1,
  },
  {
    name: "Máy tính Window",
    address: "Ha Noi,Viet Nam",
    broswer: "Chrome",
    type: 1,
  },
  {
    name: "Máy tính Window",
    address: "Ha Noi,Viet Nam",
    broswer: "Chrome",
    type: 1,
  },
];

const LoginSecure = ({
  deviceInfo,
  getCurrentUser,
  listCurrentUser,
  onLogoutDevice,
}) => {
  useEffect(() => {
    if (deviceInfo?.ip) getCurrentUser();
  }, [deviceInfo]);
  console.log(listCurrentUser, "listCurrentUser");

  const render = {
    renderLine1: (_, item) =>
      `${item.nameDevice} . ${item.address} . ${item.ip}`,
    renderLine2: (_, item) =>
      item.current ? (
        <span>
          {item.application}{" "}
          <span className="is-active"> . Đang hoạt động</span>
        </span>
      ) : (
        `${item.application} . ${momentFromNow(item.updatedAt)}`
      ),
    renderTool: (item) =>
      item.current ? (
        <></>
      ) : (
        <i
          className="fa-solid fa-right-from-bracket"
          onClick={() => {
            onLogoutDevice(item.id);
          }}
        ></i>
      ),
  };

  return (
    <WrapperStyled>
      <div className="wrapper-container-main">
        <List
          title="Nơi bạn đã đăng nhập"
          render={render}
          dataSource={listCurrentUser}
        ></List>
      </div>
    </WrapperStyled>
  );
};

export default connect(
  ({ deviceInfo: { listCurrentUser = [], info: deviceInfo } }) => ({
    listCurrentUser,
    deviceInfo,
  }),
  ({ deviceInfo: { getCurrentUser, onLogoutDevice } }) => ({
    getCurrentUser,
    onLogoutDevice,
  })
)(LoginSecure);
