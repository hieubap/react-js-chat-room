import "@assets/css/font-awesome.css";
import { ReactComponent as AddIcon } from "@assets/svg/add.svg";
import Button from "@components/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InputSearch from "@src/components/InputSearch";
import Table from "@src/components/Table";
import { getImg } from "@src/utils";
import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import RestaurantForm from "./Form";
import { Content } from "./styled";

const Admin = ({ getList, listData }) => {
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
      title: "Tiện ích",
      width: 150,
      render: (_, item) => (
        <div>
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
                    placeholder="Tìm tên cửa hàng"
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
  ({ admin: { _getList: getList, updateData }, account: { getUser } }) => ({
    getList,
    updateData,
    getUser,
  })
)(Admin);
