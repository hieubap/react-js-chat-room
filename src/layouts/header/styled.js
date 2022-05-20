import styled from "styled-components";

export const WrapperHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 50px;
  z-index: 1;
  box-shadow: 0 -5px 20px #aaa;
  .main-header {
    width: calc(100% - 200px);
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: black;
    font-weight: 600;
    &-left {
      .navbar {
        display: flex;
        &-item {
          padding: 12px;
          cursor: pointer;
          i {
            font-size: 20px;
            margin: 0 10px;
          }
          &.active {
            background-color: white;
            i {
              color: var(--green);
            }
          }
        }
        &-item::before {
          background-color: red;
        }
      }
    }
    &-right {
      display: flex;
      .wrapper-item {
        padding: 10px;
        &-content {
          background-color: #505c69;
          color: white;
          border-radius: 15px;
          padding: 5px 10px;
          cursor: pointer;
        }
      }
    }
  }
`;
