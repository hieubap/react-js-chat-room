import styled from "styled-components";

export const WrapperStyled = styled.div`
  /* Tạo bài Post */
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(243, 243, 244, 0.6);
    align-items: center; /*nằm giữa theo chiều dọc*/
    justify-content: center; /*nằm giữa theo chiều ngang*/
    /* display: none; */
    overflow-y: scroll;

    .modal-close {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0;
      top: 3px;
      font-size: 2rem;
      padding: 12px;
      cursor: pointer;
      opacity: 0.9;
      display: flex;
      justify-content: center;
      align-items: baseline;
    }

    .modal-close:hover {
      background-color: #eee;
      border-radius: 50%;
    }
  }

  .modal-container {
    background: #fff;
    width: 659px;
    border-radius: 4px;
    max-width: calc(100% - 48px);
    min-height: 200px;
    position: relative;
    animation: modalFadeIn ease 0.5s;
    box-shadow: 0 0 5px rgb(182, 179, 179);

    margin: auto;
    top: 80px;
  }

  .modal-header {
    border-bottom: 1px solid #ccc;
  }

  .modal-container-text {
    font-size: 2rem;
    font-weight: 500;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-container-avt {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    margin: 10px;
  }

  .modal-container-avt-img {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    border: 1px solid #e1e1e1;
    margin-right: 5px;
  }

  .modal-container-avt-name {
    font-size: 1.5rem;
    font-weight: 500;
    color: #050505;
  }

  .modal-container-content {
    resize: none; /*ko kéo đc khung tạo ra do thẻ textarea*/
    border: none;
    width: 640px;
    outline: none;
    font-size: 2rem;
    margin: 0 10px;
  }

  .modal-container-footer {
  }

  .modal-container-select {
    margin: 0 30px 30px 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-container-select-text {
    font-size: 2rem;
    margin-left: 20px;
  }

  .modal-container-select-img {
    font-size: 2rem;
    margin-right: 20px;
  }

  .modal-container-post {
  }

  /* Khi đã nhập nội dung bài post => khi đó mới chọn đc nút đăng bài */
  .modal-container-post-btn {
    width: 600px;
    height: 40px;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0 30px 30px 30px;
    color: #fff;
    background-color: rgb(27, 116, 228);
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .modal-container-post-btn:hover {
    background-color: rgb(7, 107, 230);
  }

  .icon-upload {
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 10px;
  }
  .icon-upload:hover {
    background-color: #ccc;
  }
  .img-upload {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    img {
      border: 1px solid #ccc;
    }
  }
`;
