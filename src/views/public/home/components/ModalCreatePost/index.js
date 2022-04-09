import fileProvider from "@src/data-access/file-provider";
import { getImg } from "@src/utils/common";
import Modal from "@src/views/public/chat/components/modal";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { WrapperStyled } from "./styled";

const ModalCreatePost = ({
  auth,
  dataEdit,
  save = () => {},
  onClose = () => {},
  afterPost = () => {},
}) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useEffect(() => {
    if (dataEdit?.id) {
      setState({ content: dataEdit.content, imgPath: dataEdit.imgPath });
    }
  }, [dataEdit]);

  const handleSubmit = () => {
    const { content, imgPath } = state;
    if (!content) {
      toast.error("Hãy viết nội dung gì đó");
      return;
    }

    save({ id: dataEdit?.id, content, imgPath }).then((res) => {
      if (res && res.code === 0) {
        toast.success(
          dataEdit?.id ? "Sửa bài đăng thành công" : "Đăng bài viết thành công"
        );
        afterPost();
      }
    });
  };

  return (
    <Modal visible={true} width={600}>
      <WrapperStyled>
        <div className="modal-header">
          <span className="modal-header-text">
            {dataEdit?.id ? "Sửa bài viết" : "Tạo bài viết"}
          </span>
        </div>
        <div className="modal-close js-modal-close" onClick={onClose}>
          <i className="fa fa-times"></i>
        </div>
        <div className="modal-container-avt">
          <img
            src={getImg(auth.avatar)}
            alt=""
            className="modal-container-avt_img"
          />
          <span className="modal-container-avt_name">{auth.full_name}</span>
        </div>
        <div className="modal-container-content">
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
          ></textarea>
        </div>
        {state.imgPath && (
          <div className="img-upload">
            <img src={getImg(state.imgPath)} />
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
              <i className="icon-upload-img fa fa-image"></i>
            </label>
          </div>
          <div className="modal-container-post">
            <button className="modal-container-post-btn" onClick={handleSubmit}>
              {dataEdit?.id ? "Xong" : "Đăng bài"}
            </button>
          </div>
        </div>
      </WrapperStyled>
    </Modal>
  );
};

export default connect(
  ({ auth: { auth }, post: { dataEdit } }) => ({ auth, dataEdit }),
  ({ post: { save } }) => ({ save })
)(ModalCreatePost);
