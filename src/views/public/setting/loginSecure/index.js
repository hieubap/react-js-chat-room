import { momentFromNow } from "@src/utils/common";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import VerifyModal from "../../container/verify-modal";
import List from "./list";
import { WrapperStyled } from "./styled";

const LoginSecure = ({
  deviceInfo,
  getCurrentUser,
  listCurrentUser,
  onLogoutDevice,
}) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

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
          {item.application}
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
            setState({ visible: true, id: item.id });
          }}
        ></i>
      ),
  };

  return (
    <WrapperStyled>
      <VerifyModal
        visible={state.visible}
        onSubmit={({ password }) => {
          onLogoutDevice({ id: state.id, password });
          setState({ visible: false });
        }}
      />
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
