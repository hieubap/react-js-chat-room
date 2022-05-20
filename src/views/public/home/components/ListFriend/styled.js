import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  /* margin-top: 50px; */

  .main-right {
    width: 20%;
    &-header {
      margin: 0 auto;
      padding: 10px;
      height: 140px;
      .main-center-top-img {
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }
      &-name {
        font-size: 16px;
        text-align: center;
        font-weight: 600;
      }
    }
    &-body {
      height: 100%;
      overflow-y: scroll;
      width: 280px;
      /* background: white; */
      .collapse-tool {
        &-title {
          font-size: 14px;
          font-weight: 600;
          padding: 10px 15px;
          cursor: pointer;
        }
        &-title:hover {
          background-color: #ccc;
        }
      }
      .list-user {
        &-item {
          padding: 5px 15px;
          display: flex;
          align-items: center;
          cursor: pointer;
          i {
            font-size: 20px;
            padding: 8px 9px;
            background-color: #e0e0e0;
          }
          &-img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &-content {
            padding: 0 15px;
            width: calc(100% - 78px);
            &-user {
              font-size: 13px;
              font-weight: 500;
            }
            &-message {
              display: flex;
              color: #777;
              span:first-child {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: calc(100% - 50px);
              }
            }
          }
          :hover {
            background-color: #f7f7f7;
          }
          &-active {
            background-color: blue;
          }
        }
      }
    }
  }
`;
