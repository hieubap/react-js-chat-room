import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { WrapperStyled } from "./styled";
import { message } from "antd";
import fileProvider from "@src/data-access/file-provider";
import clientUtils from "@src/utils/client-utils";
import { getImg } from "@src/utils/common";

const ModalCreatePost = ({
  auth,
  _dataEdit,
  _createOrEdit = () => {},
  onClose = () => {},
  afterPost = () => {},
}) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useEffect(() => {
    if (_dataEdit?.id) {
      setState({ content: _dataEdit.content, imgPath: _dataEdit.imgPath });
    }
  }, [_dataEdit]);

  const handleSubmit = () => {
    const { content, imgPath } = state;
    if (!content) {
      message.error("Hãy viết nội dung gì đó");
      return;
    }

    _createOrEdit({ id: _dataEdit?.id, content, imgPath }).then((res) => {
      if (res && res.code === 0) {
        message.success(
          _dataEdit?.id ? "Sửa bài đăng thành công" : "Đăng bài viết thành công"
        );
        afterPost();
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <WrapperStyled>
      <div className="modal js-modal">
        <div className="modal-container js-modal-container">
          <div className="modal-header">
            <span className="modal-container-text">
              {_dataEdit?.id ? "Sửa bài viết" : "Tạo bài viết"}
            </span>
          </div>
          <div className="modal-close js-modal-close" onClick={onClose}>
            <i className="fa fa-times"></i>
          </div>
          <div className="modal-container-avt">
            <img
              src={getImg(auth.avatar)}
              alt=""
              className="modal-container-avt-img"
            />
            <span className="modal-container-avt-name">{auth.full_name}</span>
          </div>
          <textarea
            name="content"
            placeholder="Bạn đang nghĩ gì?"
            id=""
            cols="30"
            rows="6"
            value={state.content}
            onChange={(e) => {
              setState({ content: e.target.value });
            }}
            className="modal-container-content"
          ></textarea>
          {state.imgPath && (
            <div className="img-upload">
              <img src={`${clientUtils.serverApi}/files/${state.imgPath}`} />
            </div>
          )}
          <div className="modal-container-footer">
            <div className="modal-container-select">
              <span className="modal-container-select-text">
                Thêm vào bài viết
              </span>
              <input
                id="input-image"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => {
                  fileProvider.upload(e.target?.files[0]).then((res) => {
                    if (res && res.code === 0) {
                      setState({ imgPath: res.data?.filePath });
                    }
                  });
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="input-image" className="icon-upload">
                <i className="modal-container-select-img fa fa-image"></i>
              </label>
            </div>
            <div className="modal-container-post">
              <button
                className="modal-container-post-btn"
                onClick={handleSubmit}
              >
                {_dataEdit?.id ? "Xong" : "Đăng bài"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </WrapperStyled>
  );
};

export default connect(
  ({ auth: { auth }, post: { _dataEdit } }) => ({ auth, _dataEdit }),
  ({ post: { _createOrEdit } }) => ({ _createOrEdit })
)(ModalCreatePost);
