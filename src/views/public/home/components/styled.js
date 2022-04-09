import styled from "styled-components";

export const WrapperStyled = styled.div`
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-shadow: 0 0.625px 20px 0 rgb(0 0 0 / 10%);
  background-color: white;
  .container {
    &-header {
      display: flex;
      justify-content: space-between;
      &-info {
        padding: 8px 15px;
        ul {
          list-style: none;
          display: inline-block;
          text-align: left;
          margin-left: 10px;
          padding: 0;
        }
        &_avatar {
          border-radius: 50%;
          width: 35px;
          height: 35px;
          border: 1px solid #e1e1e1;
        }
        &_name {
          font-size: 16px;
          font-weight: 500;
          color: #050505;
          margin-bottom: 3px;
        }
        &_time {
          font-size: 14px;
          color: #65676b;
        }
      }
      .sidebar {
        position: relative;
        .sidebar_menu {
          position: absolute;
          right: 10px;
          width: 75px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 0 5px rgb(182, 179, 179);
          &-icon {
            margin: 15px;
            font-size: 1.4rem;
            cursor: pointer;
          }
          &-list {
            list-style: none;
            padding: 5px 0;
            margin: 0;
          }
          &-item {
            display: block;
            text-decoration: none;
            font-size: 14px;
            font-weight: 450;
            color: #333;
            text-align: center;
            padding: 5px;
            cursor: pointer;
            :hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
    &-body {
      font-size: 16px;
      color: #333;
      text-align: left;
      margin: 5px 15px 15px 15px;
      white-space: break-spaces;
    }
    &-body_img {
      width: 100%;
    }
    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 15px;
      border-bottom: 1px solid rgb(235, 229, 229);
      &-like,
      &-cmt {
        &-icon {
          font-size: 16px;
          color: rgb(238, 66, 66);
        }
        &-q {
          color: #555;
          font-size: 16px;
          margin: 0 5px;
        }
      }
    }
    &-comment {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      &-like,
      &-cmt {
        cursor: pointer;

        &-icon {
          font-size: 16px;
          margin-right: 5px;
        }

        &-btn {
          font-size: 16px;
        }
      }
      &-liked {
        color: rgb(238, 66, 66);
      }
    }

    &-input-cmt {
      color: black;
      padding: 6px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .comment-input {
        width: 80%;
      }
      .left-comment {
        display: flex;
        width: 80%;
        .avatar {
          margin-right: 5px;
          img {
            border-radius: 50%;
            width: 35px;
            height: 35px;
            border: 1px solid #e1e1e1;
          }
        }
      }
      .textarea-comment {
        padding: 3px 7px;
        background-color: #f0f2f5;
        border-radius: 18px;
        textarea {
          padding: 0;
          background-color: #f0f2f5;
          border: none;
          width: 100%;
          outline: none;
          resize: none;
          overflow: hidden;
          min-height: 36px;
          max-height: 100px;
          font-size: 14px;
        }
      }
    }

    &__list-comment {
      color: black;
      padding: 6px 15px;
      display: flex;
      &-avatar {
        margin-right: 5px;
        img {
          border-radius: 50%;
          width: 35px;
          height: 35px;
          border: 1px solid #e1e1e1;
        }
      }
      .comment-item {
        background-color: #f0f2f5;
        border-radius: 10px;
        text-align: left;
        padding: 0px 15px 5px;
        max-width: calc(100% - 90px);
        .comment-username {
          font-size: 13px;
          font-weight: 600;
          color: black;
        }
        .content-comment {
          white-space: pre;
          font-size: 14px;
        }
      }
      .delete-comment {
        margin-left: 15px;
        padding-top: 16px;
        cursor: pointer;
        display: none;
      }
      :hover {
        .delete-comment {
          display: block;
        }
      }
    }
  }
`;
