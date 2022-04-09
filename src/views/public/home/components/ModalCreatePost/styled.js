import styled from "styled-components";

export const WrapperStyled = styled.div`
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

  .modal-container-avt {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 10px;
    &_img {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      border: 1px solid #e1e1e1;
      margin-right: 5px;
    }
    &_name {
      font-size: 16px;
      font-weight: 500;
      color: #050505;
    }
  }

  .modal-container-content {
    padding: 0 25px;
    textarea {
      resize: none;
      border: none;
      outline: none;
      width: 100%;
      font-size: 16px;
    }
  }
  .img-upload {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    img {
      width: 100%;
      border: 1px solid #ccc;
    }
  }

  .modal-container {
    &-footer {
    }
    &-select {
      margin: 0 30px 15px 30px;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-text {
        font-size: 16px;
        margin-left: 10px;
      }
      .icon-upload {
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        :hover {
          background-color: #ccc;
        }
        &-img {
          margin: auto;
          font-size: 28px;
        }
      }
    }
    &-post {
      padding: 0 30px 20px;
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
      }
    }
  }
`;
