import { getImg } from "@src/utils/common";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { connect } from "react-redux";
import Avatar from "../components/avatar";
import Modal from "../components/modal";
import { StyledAddMem } from "./styled";

const ModalMember = (
  { onSubmit = () => {}, listAllUser = [], title = "" },
  ref
) => {
  const [state, _setState] = useState({ listSelect: [], searchText: "" });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const close = () => {
    setState({ visible: false });
  };

  const cancel = () => {
    setState({ visible: false, listSelect: [], searchText: "" });
  };

  useImperativeHandle(ref, () => ({
    show: ({} = {}) => {
      console.log("show ...");
      setState({ visible: true });
    },
    close,
    cancel,
  }));

  const handleAddUser = () => {
    onSubmit(
      state.listSelect.map((i) => i.userId),
      state.listSelect,
      close
    );
  };

  const clickCheckbox = (data) => (e) => {
    if (e.target.checked) {
      setState({ listSelect: [...state.listSelect, data] });
    } else {
      setState({
        listSelect: state.listSelect.filter((i) => i.id != data?.id),
      });
    }
  };

  const onSearch = (e) => {
    setState({ searchText: e.target?.value });
  };

  return (
    <Modal
      visible={state.visible}
      onCancel={close}
      onOk={handleAddUser}
      width={600}
      title={title}
    >
      <StyledAddMem>
        <div className="wrapper-search">
          <i className="fa fa-search" />
          <input
            className="search-input"
            placeholder="Tìm kiếm"
            onChange={onSearch}
          />
        </div>

        <div className="list-select-member">
          {state.listSelect?.length > 0 ? (
            state.listSelect.map((item) => (
              <Avatar
                src={getImg(item?.image)}
                name={item?.fullName}
                onRemove={clickCheckbox(item)}
                direction="column"
                width={40}
              ></Avatar>
            ))
          ) : (
            <div className="text-empty-select">Chưa chọn người dùng nào</div>
          )}
        </div>
        <div className="title-member">Gợi ý</div>
        <div className="list-member">
          {listAllUser
            .filter(
              (i) =>
                i?.fullName
                  ?.toLowerCase()
                  ?.indexOf(state.searchText?.toLowerCase()) !== -1
            )
            .map((item, key) => (
              <div key={key} className="member-item">
                <Avatar
                  src={getImg(item?.image)}
                  name={item?.fullName}
                ></Avatar>
                <input
                  type="checkbox"
                  checked={state.listSelect.some((i) => i.id === item.id)}
                  onClick={clickCheckbox(item)}
                  onChange={() => {}}
                />
              </div>
            ))}
        </div>
      </StyledAddMem>
    </Modal>
  );
};

export default connect(
  ({ socket: { allUser: listAllUser } }) => ({ listAllUser }),
  ({ socket: { addUsers } }) => ({ addUsers }),
  null,
  {
    forwardRef: true,
  }
)(forwardRef(ModalMember));
