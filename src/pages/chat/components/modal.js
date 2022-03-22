import React from "react";
import { StyledModal } from "./styled";

const Modal = ({ width = 400, height = 400, visible, children }) => {
  return (
    <StyledModal visible={visible} width={width} height={height}>
      <div className="modal-layer"></div>
      <div className="modal-content">
        <div className="modal-content-layer">
          <div className="modal-content-main">{children}</div>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
