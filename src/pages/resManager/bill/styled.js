import styled from "styled-components";

export const WrapperStyled = styled.div`
  .main {
    margin: 0;
    width: 100%;
  }

  .header {
    width: 100%;
    height: 80px;
    margin-bottom: 64px;
    border-bottom: 1px solid #ccc;
  }

  .title {
    font-size: 3.5rem;
    line-height: 80px;
    padding: 0 28px;
  }

  .search {
    margin: 0 200px;
  }

  .search_title {
    font-size: 2.2rem;
    margin: 0 10px 0 28px;
  }

  .search_input {
    height: 38px;
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    padding: 10px;
  }

  .table {
    margin-top: 30px;
    width: 100%;
  }

  .list_table {
    width: 1300px;
    border-collapse: collapse;
    margin: auto;
  }

  .list_table td {
    padding-left: 15px;
  }

  .list_table th,
  .list_table td {
    height: 50px;
    border: 1px solid #ccc;
    font-size: 1.6rem;
  }

  .hrow {
    background-color: rgb(52, 58, 64);
    color: #fff;
  }

  .name_customer {
    font-weight: bold;
  }

  .payments {
    background-color: rgb(45, 125, 255);
    color: #fff;
    padding: 3px;
    border-radius: 4px;
  }

  .payment_status {
    background-color: rgb(220, 53, 69);
    color: #fff;
    padding: 3px;
    border-radius: 4px;
  }

  .confirm_yes {
    font-size: 1.6rem;
    background-color: rgb(85, 185, 108);
    padding: 3px;
    border-radius: 4px;
    outline: none;
  }

  .confirm_no {
    font-size: 1.6rem;
    background-color: rgb(220, 53, 69);
    color: #fff;
    padding: 3px;
    border-radius: 4px;
  }

  .payment_status-yes {
    background-color: rgb(85, 185, 108);
    padding: 3px;
    border-radius: 4px;
  }

  .payment_status-no {
    background-color: rgb(220, 53, 69);
    color: #fff;
    padding: 3px;
    border-radius: 4px;
  }

  .detail {
    text-align: center;
    padding-right: 15px;
  }

  .detail_btn {
    background-color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(243, 243, 244, 0.6);
    align-items: center; /*nằm giữa theo chiều dọc*/
    justify-content: center; /*nằm giữa theo chiều ngang*/
    display: none;
  }

  .modal.open {
    display: flex;
  }

  .modal-container {
    background: #fff;
    min-width: 340px;
    border-radius: 4px;
    max-width: calc(100% - 48px);
    /* min-height: 200px; */
    position: relative;
    animation: modalFadeIn ease 0.2s;
    box-shadow: 0 0 5px rgb(182, 179, 179);
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-120px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-container-text {
    font-size: 2rem;
    font-weight: 500;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-close {
    position: absolute;
    right: 0;
    top: 3px;
    font-size: 2rem;
    padding: 12px;
    cursor: pointer;
    opacity: 0.9;
  }

  .modal-close:hover {
    background-color: #ccc;
    border-radius: 50%;
  }

  .modal-container-list {
  }

  .modal-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .modal_item-img {
    width: 55px;
    height: 55px;
  }

  .modal_item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal_item-title {
    font-size: 1.4rem;
    line-height: 2rem;
    max-height: 4rem; /*Chiều cao content tối đá = 2 dòng*/
    padding-right: 10px;
    font-weight: 500;
    margin: 0 5px;
    text-align: left; /*Căn lề trái*/
    overflow: hidden; /*Từ đây đến cuối làm làm ẩn bớt nội dung nếu dài quá*/
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .modal_item-price {
    font-size: 1.2rem;
    padding: 10px;
  }

  .modal_item-x {
    color: #757575;
    font-size: 0.9rem;
  }

  .modal_item-quantity {
    color: #757575;
  }
`;
