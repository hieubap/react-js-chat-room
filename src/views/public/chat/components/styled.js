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
    .modal-header {
      border-bottom: 1px solid #ccc;
      &-text {
        font-size: 20px;
        font-weight: 500;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .modal-close {
      position: absolute;
      right: 7px;
      top: 12px;
      font-size: 16px;
      padding: 3px 10px;
      cursor: pointer;
      opacity: 0.9;
      :hover {
        background-color: #ccc;
        border-radius: 50%;
      }
    }

    .modal-footer {
      /* padding: 10px 30px 20px;
      &-btn {
        width: 100%;
        height: 40px;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        background-color: rgb(27, 116, 228);
        border-radius: 4px;
        border: none;
        outline: none;
        cursor: pointer;
        :hover {
          background-color: rgb(7, 107, 230);
        }
      } */

      position: absolute;
      width: 100%;
      padding: 5px;
      bottom: 0;
      background: #188754;
      text-align: center;
      color: white;
      cursor: pointer;
      span:before {
        background-color: white;
      }
      &-text {
        position: relative;
        z-index: 1;
      }
      &-effect {
        width: 0;
        height: 3px;
        left: 50%;
        bottom: 0;
        position: absolute;
        background-color: #50a3b9;
        transition: all 0.5s;
      }
      &:hover {
        .modal-footer-effect {
          width: 50%;
          left: 25%;
        }
      }
    }
  }
`;

export const StyledAvatar = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: ${(p) => p.direction};
  align-items: center;
  cursor: pointer;
  .avatar-component {
    &-wrap {
      position: relative;
      .icon-remove {
        position: absolute;
        cursor: pointer;
        top: -3px;
        right: -3px;
        background-color: white;
        z-index: 10;
        border-radius: 50%;
        width: 15px;
        height: 20px;
        font-size: 15px;
        padding-left: 5px;
        box-shadow: 0 0 2px #888;
        &:hover {
          background-color: #e0e0e0;
        }
      }
    }
    &-img {
      width: ${(p) => p.width + "px"};
      height: ${(p) => p.width + "px"};
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &-content {
      padding: 0 15px;
      width: calc(
        100% - ${(p) => (p.direction === "column" ? 0 : p.width + 30)}px
      );
      &-user {
        font-size: 16px;
        font-weight: 500;
      }
      &-message {
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 50px);
        }
      }
    }
  }
`;
