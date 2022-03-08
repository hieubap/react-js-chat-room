import "@assets/css/font-awesome.css";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckCircleOutlined from "@material-ui/icons/CheckCircleOutlineOutlined";
import ClosedCaptionOutlined from "@material-ui/icons/CancelOutlined";
import InputSearch from "@src/components/InputSearch";
import Table from "@src/components/Table";
import { getImg } from "@src/utils";
import { Badge, message, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Content } from "./styled";

const Food = ({ auth, getUser, getList, listData, updateData, save }) => {
  const refModal = useRef();
  const [state, _setState] = useState({
    showModalPost: false,
    params: {},
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const { params } = state;
  const setParams = (params) => {
    getList({ ...params, idRes: auth?.userId });
  };

  useEffect(() => {
    getList({ size: 20, idRes: auth?.userId });
    // getUser();
  }, []);

  const update = (state, data) => {
    save({
      state,
      id: data.id,
      idTeam: data.idTeam,
      phoneNumber: data.phoneNumber,
      time: data.time,
    }).then((res) => {
      if (res && res.code === 0) {
        getList({ ...params, idRes: auth?.userId });
        message.success(
          state === 2 ? "Xác nhận thành công" : "Hủy xác nhận thành công"
        );
      } else {
        message.success(res.message);
      }
    });
  };

  const columns = [
    {
      title: "STT",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "ID team",
      dataIndex: "idTeam",
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      render: (item) => moment(item).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      align: "center",
      render: (item) =>
        item === 2 ? (
          <Badge
            style={{ backgroundColor: "var(--green)" }}
            count="Đã xác nhận"
          ></Badge>
        ) : item === 1 ? (
          <Badge
            style={{ backgroundColor: "var(--red)" }}
            count="Hủy xác nhận"
          ></Badge>
        ) : (
          <Badge
            style={{ backgroundColor: "var(--blue)" }}
            count="Chưa xác nhận"
          ></Badge>
        ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (item) => moment(item).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Tiện ích",
      width: 150,
      render: (_, item) =>
        item.state ? (
          <div></div>
        ) : (
          <div>
            <Tooltip title="Duyệt">
              <CheckCircleOutlined
                onClick={() => {
                  update(2, item);
                }}
                style={{
                  fontSize: 28,
                  marginRight: 5,
                  cursor: "pointer",
                  color: "var(--yellow)",
                }}
              />
            </Tooltip>
            <Tooltip title="Hủy duyệt">
              <ClosedCaptionOutlined
                style={{
                  fontSize: 28,
                  marginRight: 5,
                  cursor: "pointer",
                  color: "var(--red)",
                }}
                onClick={() => {
                  update(1, item);
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
              <div className="header-title">Quản lý đơn hàng</div>
              <div className="header-content">
                <div className="group-search">
                  <InputSearch
                    type="text"
                    search={(value) =>
                      setParams({ ...params, page: 0, id: value })
                    }
                    placeholder="ID đơn hàng"
                    style={{ width: "50%" }}
                  />
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
            </div>
          </div>
        </Content>
      </div>
    </div>
  );
};
export default connect(
  ({ auth: { auth }, order: { _listData: listData } }) => ({
    auth,
    listData,
  }),
  ({
    order: { _getList: getList, updateData, _createOrEdit: save },
    account: { getUser },
  }) => ({
    getList,
    updateData,
    getUser,
    save,
  })
)(Food);
