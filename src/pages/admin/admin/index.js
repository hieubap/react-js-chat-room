import "@assets/css/font-awesome.css";
import { ReactComponent as AddIcon } from "@assets/svg/add.svg";
import Button from "@components/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InputSearch from "@src/components/InputSearch";
import Table from "@src/components/Table";
import userProvider from "@src/data-access/admin-provider";
import { getImg } from "@src/utils";
import { Badge, message, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import RestaurantForm from "./Form";
import { Content } from "./styled";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";

const Admin = ({ lockAccount, getList, listData }) => {
  const refModal = useRef();
  const [state, _setState] = useState({
    showModalPost: false,
    params: {},
  });
  const { params } = state;
  const setParams = (params) => {
    getList(params);
  };

  useEffect(() => {
    getList({ size: 20 });
    // getUser();
  }, []);

  const columns = [
    {
      title: "STT",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      width: 150,
      render: (item) => (
        <img src={getImg(item)} style={{ width: 100, height: 100 }} />
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      align: "center",
      render: (item) => (
        <Badge
          className="w100 text-white pointer"
          // onClick={() => history.push("/manage/info-course/" + data.id)}
          style={{ backgroundColor: item ? "var(--green)" : "var(--red)" }}
          count={item ? "Hoạt động" : "Khóa"}
        ></Badge>
      ),
    },
    {
      title: "Tiện ích",
      width: 150,
      render: (_, item) => (
        <div>
          <Tooltip title={item.active ? "Khóa" : "Mở khóa"}>
            <LockOpenOutlined
              onClick={() => {
                userProvider
                  ._put(
                    {
                      active: !item.active,
                      address: item.address,
                      avatar: item.avatar,
                      name: item.name,
                      password: item.password,
                      username: item.username,
                    },
                    item?.id
                  )
                  .then((json) => {
                    if (json && json.code === 0 && json.data) {
                      message.success(
                        json.data?.active
                          ? "Mở khóa thành công"
                          : "Khóa thành công"
                      );
                      getList({ size: 20 });
                      if (!json.data?.active) {
                        lockAccount({ idLockAccount: item.id, type: 1 });
                      }
                    } else if (json && json.code === 401) {
                      window.location.href = "/login";
                    } else {
                      message.error(json.message);
                    }
                  });
              }}
              style={{
                fontSize: 28,
                marginRight: 5,
                cursor: "pointer",
                color: item.active ? "var(--red)" : "var(--green)",
              }}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <EditOutlinedIcon
              onClick={() => refModal.current && refModal.current.show(item)}
              style={{
                fontSize: 28,
                marginRight: 5,
                cursor: "pointer",
                color: "var(--blue)",
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="card-content">
        <Content>
          <div className="body">
            <div className="content">
              <div className="header-title">Quản lý Quản trị viên</div>
              <div className="header-content">
                <div className="group-search">
                  <InputSearch
                    type="text"
                    search={(value) =>
                      setParams({ ...params, page: 0, name: value })
                    }
                    placeholder="Tìm tên"
                    style={{ width: "30%" }}
                  />
                  <InputSearch
                    type="text"
                    search={(value) =>
                      setParams({ ...params, page: 0, username: value })
                    }
                    placeholder="Tìm tên tài khoản"
                    style={{ width: "30%" }}
                  />
                  <InputSearch
                    type="text"
                    search={(value) =>
                      setParams({
                        ...params,
                        page: 0,
                        address: value,
                      })
                    }
                    placeholder="Tìm địa chỉ"
                    style={{ width: "40%" }}
                  />
                </div>
                <div className="btn-create">
                  <Button
                    content="Thêm mới"
                    onClick={() =>
                      refModal.current && refModal.current.show({})
                    }
                    iconSvg={AddIcon}
                  ></Button>
                </div>
              </div>

              <div className="table-ds">
                <Table
                  buttonCreate={{
                    onCreate: () =>
                      refModal.current && refModal.current.show({}),
                  }}
                  dataSource={listData}
                  scroll={{ x: 830, y: "auto" }}
                  rowKey={(record) => record.id}
                  columns={columns}
                  footer={null}
                ></Table>
              </div>
              {/* <Pagination
              page={params.page + 1}
              size={params.size}
              totalElements={state.totalElements}
              onChangePage={(page) => setParams({ ...params, page })}
              onChangeSize={(size) => setParams({ ...params, page: 0, size })}
            ></Pagination> */}

              <RestaurantForm
                ref={refModal}
                reload={() => getList({ ...params, reload: params.reload })}
              ></RestaurantForm>
            </div>
          </div>
        </Content>
      </div>
    </div>
  );
};
export default connect(
  ({ auth: { auth }, admin: { _listData: listData } }) => ({
    auth,
    listData,
  }),
  ({
    admin: { _getList: getList, updateData },
    account: { getUser },
    chat: { lockAccount },
  }) => ({
    getList,
    updateData,
    getUser,
    lockAccount,
  })
)(Admin);
