import styled from "styled-components";

export const WrapperStyled = styled.div`
  .wrapper-container-main {
    padding: 30px 80px;
  }
`;

export const WrapperList = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  .corn-list {
    &-title {
      padding: 12px;
      font-size: 16px;
      font-weight: 600;
      background-color: #f5f6f7;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid #ccc;
    }
    &-item {
      padding: 12px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      &-1 {
        font-size: 15px;
      }
      &-2 {
        font-size: 14px;
        color: #90949c;
        .is-active {
          color: #00a400;
          font-weight: 600;
        }
      }
      &-left {
        display: flex;
        align-items: center;
        i {
          font-size: 20px;
          width: 25px;
        }
      }
      &-right {
        display: none;
        i {
          cursor: pointer;
        }
      }
      :hover {
        .corn-list-item-right {
          display: block;
        }
      }
    }
  }
`;
