import React from "react";
import { StyledModal } from "./styled";

const Modal = ({
  width = 400,
  height,
  visible,
  children,
  title = "title",
  okText = "Xong",
  onCancel = () => {},
  onOk = () => {},
}) => {
  return (
    <StyledModal visible={visible} width={width} height={height}>
      <div className="modal-layer"></div>
      <div className="modal-content">
        <div className="modal-content-layer">
          <div className="modal-content-main">
            <div className="modal-header">
              <span className="modal-header-text">{title}</span>
            </div>
            <div className="modal-close js-modal-close" onClick={onCancel}>
              <i className="fa fa-times"></i>
            </div>
            {children}
            <div className="modal-footer">
              <button className="modal-footer-btn" onClick={onOk}>
                {okText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
