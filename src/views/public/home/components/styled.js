import styled from "styled-components";

export const WrapperStyled = styled.div`
  margin-top: 50px;
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
      padding: 0 15px;
      border-bottom: 1px solid rgb(235, 229, 229);
      &-like {
        &-icon {
          font-size: 1.6rem;
          color: rgb(238, 66, 66);
        }
        &-q {
          font-size: 1.45rem;
          margin-left: 5px;
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
          font-size: 1.6rem;
          margin-right: 3px;
        }

        &-btn {
          font-size: 1.45rem;
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
      textarea {
        border: none;
        padding-top: 6px;
        width: 100%;
        margin-left: 15px;
        background-color: #f0f2f5;
        min-height: 36px;
        border-radius: 18px;
        padding-left: 10px;
        outline: none;
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
        border-radius: 5px;
        text-align: left;
        padding: 5px 15px;
        max-width: calc(100% - 90px);
        .comment-username {
          font-size: 13px;
          font-weight: bold;
          color: black;
        }
        .content-comment {
          white-space: pre;
        }
      }
    }
    .delete-comment {
      margin-left: 15px;
      padding-top: 16px;
      cursor: pointer;
    }
  }
`;
