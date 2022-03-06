import styled from "styled-components";

export const WrapperStyled = styled.div`
  .container__body--main-frame-header {
    margin: 15px;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .frame-header-avt {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    border: 1px solid #e1e1e1;
  }

  .container__body--main-frame-headerNT {
    list-style: none;
    /* display: inline-flex;
    flex-direction: column; */
    display: inline-block;
    text-align: left;
    margin-left: 10px;
  }

  .sidebar_menu {
    position: absolute;
    right: 0;
    margin-right: 10px;
    padding-top: 5px;
    width: 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 5px rgb(182, 179, 179);

    .sidebar_menu-list {
      list-style: none;
      li {
        padding: 5px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
      }
    }
    a {
      display: block;
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: 450;
      color: #333;
      text-align: center;
      line-height: 40px;
    }
  }

  .container__body--main-frame-header-menu {
    margin: 15px;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .container__body--main-framepost-caption {
    font-size: 1.5rem;
    color: #333;
    text-align: left;
    margin: 0 15px 15px 15px;
    white-space: break-spaces;
  }

  .container__body--main-framepost-img {
    width: 100%;
  }

  .container__framepost-inf {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid rgb(235, 229, 229);
  }

  .container__framepost-inf-like {
  }

  .container__framepost-inf-like-icon {
    font-size: 1.6rem;
    color: rgb(238, 66, 66);
  }

  .container__framepost-inf-like-q {
    font-size: 1.45rem;
    margin-left: 5px;
  }

  .container__framepost-inf-cmt {
    .container__framepost-inf-cmt-q {
      font-size: 1.45rem;
      margin-right: 5px;
    }

    .container__framepost-inf-cmt-d {
      font-size: 1.45rem;
    }
  }

  .container__framepost-action {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
  }

  .container__framepost-action-like {
    cursor: pointer;
  }
  .container__framepost-action-liked {
    color: rgb(238, 66, 66);
  }

  .container__framepost-action-like-icon {
    font-size: 1.6rem;
    margin-right: 3px;
  }

  .container__framepost-action-like-btn {
    font-size: 1.45rem;
  }

  .container__framepost-action-cmt {
    cursor: pointer;
  }

  .container__framepost-action-cmt-icon {
    font-size: 1.6rem;
    margin-right: 3px;
  }

  .container__framepost-action-cmt-btn {
    font-size: 1.45rem;
  }

  .container__framepost-action-cmt-d {
    font-size: 1.45rem;
    margin-left: 2px;
  }

  .comment {
    color: black;
    padding: 6px 15px;
    display: flex;
    .avatar {
      margin-right: 5px;
    }
    .comment-item {
      background-color: #f0f2f5;
      border-radius: 15px;
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

  .input-comment {
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
  .delete-comment {
    margin-left: 15px;
    padding-top: 16px;
    cursor: pointer;
  }
`;
