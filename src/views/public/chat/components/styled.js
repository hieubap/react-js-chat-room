import styled from "styled-components";

export const StyledModal = styled.div`
  display: ${(pre) => (pre.visible ? "block" : "none")};
  .modal-layer {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: 2;
  }
  .modal-content {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    z-index: 3;
    left: 0;
    top: 0;
    &-layer {
      position: relative;
      width: ${(props) => props.width + "px"};
      min-height: 450px;
      height: auto;
      top: 50px;
      margin: auto;
      padding: 50px 0;
    }
    &-main {
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: auto;
      background-color: white;
      position: relative;
    }
  }
`;
