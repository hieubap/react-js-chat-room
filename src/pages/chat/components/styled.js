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
  }
  .modal-content {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    &-layer {
      position: absolute;
      width: ${(props) => props.width + "px"};
      height: ${(props) => props.height + 50 + "px"};
      top: 100px;
      left: ${(props) => `calc(50% - ${props.width / 2}px)`};
    }
    &-main {
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: calc(100% - 50px);
      position: absolute;
      background-color: white;
    }
  }
`;
