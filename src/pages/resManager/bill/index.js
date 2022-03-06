import { Button } from "antd";
import React, { useEffect } from "react";
import { WrapperStyled } from "./styled";

const Bill = ({ history }) => {
  useEffect(() => {
    const postBtns = document.querySelectorAll(".js-detail_btn");
    const modal = document.querySelector(".js-modal");
    const modalContainer = document.querySelector(".js-modal-container");
    const modalClose = document.querySelector(".js-modal-close");

    // Hàm hiển thị modal bài post (thêm class open vào modal)
    function showPost() {
      modal.classList.add("open");
    }

    // Hàm ẩn modal bài post (gỡ bỏ class open trong modal)
    function hideshowPost() {
      modal.classList.remove("open");
    }

    // Lặp qua tình thẻ button và nghe hành vi click
    for (const postBtn of postBtns) {
      postBtn.addEventListener("click", showPost);
    }

    // Nghe hành vi click vào button close
    modalClose.addEventListener("click", hideshowPost);
    modal.addEventListener("click", hideshowPost);
    modalContainer.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }, []);
  return (
    <WrapperStyled>
      <div class="main">
        <div class="header">
          <span class="title">Danh sách</span>
        </div>
        <div class="search" style={{ position: "relative" }}>
          <span class="search_title">Search</span>
          <input type="text" class="search_input" placeholder="Tìm kiếm" />
          <Button
            style={{ position: "absolute", right: 0 }}
            type="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Trở lại
          </Button>
        </div>

        <div class="table">
          <table id="" class="list_table">
            <tr>
              <th class="hrow">Mã Đơn đặt hàng</th>
              <th class="hrow">Khách hàng</th>
              <th class="hrow">Nơi giao</th>
              <th class="hrow">Hình thức thanh toán</th>
              <th class="hrow">Tổng thành tiền</th>
              <th class="hrow">Trạng thái thanh toán</th>
              <th class="hrow">Chi tiết đơn</th>
              <th class="hrow">Hành động</th>
            </tr>
            <tr>
              <td>1</td>
              <td class="name_customer">Duy Truong</td>
              <td>DHBK</td>
              <td>
                <span class="payments">Qua Thẻ</span>
              </td>
              <td>
                1.000.000
                <span>VNĐ</span>
              </td>
              <td>
                <span class="payment_status">Chưa xử lý</span>
              </td>
              <td class="detail">
                <button class="detail_btn js-detail_btn">
                  <i class="detail_icon fas fa-eye"></i>
                </button>
              </td>
              <td class="active">
                <button class="confirm_yes">Xác nhận</button>
                <button class="confirm_no">Hủy</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td class="name_customer">Lai Anh Duy</td>
              <td>DHBK</td>
              <td>
                <span class="payments">Qua Thẻ</span>
              </td>
              <td>
                1.000.000
                <span>VNĐ</span>
              </td>
              <td>
                <span class="payment_status">Chưa xử lý</span>
              </td>
              <td class="detail">
                <button class="detail_btn js-detail_btn">
                  <i class="detail_icon fas fa-eye"></i>
                </button>
              </td>
              <td class="active">
                <button class="confirm_yes">Xác nhận</button>
                <button class="confirm_no">Hủy</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td class="name_customer">Pham Dat</td>
              <td>DHBK</td>
              <td>
                <span class="payments">Qua Thẻ</span>
              </td>
              <td>
                6.000.000
                <span>VNĐ</span>
              </td>
              <td>
                <span class="payment_status-yes">Đã giao hàng</span>
              </td>
              <td class="detail">
                <button class="detail_btn js-detail_btn">
                  <i class="detail_icon fas fa-eye"></i>
                </button>
              </td>
              <td class="active"></td>
            </tr>
            <tr>
              <td>4</td>
              <td class="name_customer">Huan Dao</td>
              <td>DHBK</td>
              <td>
                <span class="payments">Qua Thẻ</span>
              </td>
              <td>
                9.000.000
                <span>VNĐ</span>
              </td>
              <td>
                <span class="payment_status-yes">Đã giao hàng</span>
              </td>
              <td class="detail">
                <button class="detail_btn js-detail_btn">
                  <i class="detail_icon fas fa-eye"></i>
                </button>
              </td>
              <td class="active"></td>
            </tr>
            <tr>
              <td>5</td>
              <td class="name_customer">Nguyen Son</td>
              <td>DHBK</td>
              <td>
                <span class="payments">Qua Thẻ</span>
              </td>
              <td>
                6.000.000
                <span>VNĐ</span>
              </td>
              <td>
                <span class="payment_status-yes">Đã giao hàng</span>
              </td>
              <td class="detail">
                <button class="detail_btn js-detail_btn">
                  <i class="detail_icon fas fa-eye"></i>
                </button>
              </td>
              <td class="active"></td>
            </tr>
            <tr>
              <td>6</td>
              <td class="name_customer">Nguyen Hung</td>
              <td>DHBK</td>
              <td>
                <span class="payments">Qua Thẻ</span>
              </td>
              <td>
                6.000.000
                <span>VNĐ</span>
              </td>
              <td>
                <span class="payment_status-no">Hủy đơn</span>
              </td>
              <td class="detail">
                <button class="detail_btn js-detail_btn">
                  <i class="detail_icon fas fa-eye"></i>
                </button>
              </td>
              <td class="active"></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="modal js-modal">
        <div class="modal-container js-modal-container">
          <div class="modal-header">
            <span class="modal-container-text">Chi tiết</span>
          </div>
          <div class="modal-close js-modal-close">
            <i class="fas fa-times"></i>
          </div>
          <div class="modal-container-list">
            <div class="modal-item">
              <img
                src="/assets/img/mu-bao-hiem.jpg"
                alt=""
                class="modal_item-img"
              />
              <div class="modal_item-container">
                <h3 class="modal_item-title">Mũ bảo hiểm đi phượt</h3>
                <span class="modal_item-price">1.000.000 VNĐ</span>
                <span class="modal_item-x">x</span>
                <span class="modal_item-quantity">1</span>
              </div>
            </div>
            <div class="modal-item">
              <img
                src="/assets/img/gang-tay-chong-nuoc-10.jpg"
                alt=""
                class="modal_item-img"
              />
              <div class="modal_item-container">
                <h3 class="modal_item-title">Găng tay phượt chống nước</h3>
                <span class="modal_item-price">1.000.000 VNĐ</span>
                <span class="modal_item-x">x</span>
                <span class="modal_item-quantity">1</span>
              </div>
            </div>
            <div class="modal-item">
              <img
                src="/assets/img/giay-di-phuot-nam-dep-1.jpg"
                alt=""
                class="modal_item-img"
              />
              <div class="modal_item-container">
                <h3 class="modal_item-title">Giày đi phượt</h3>
                <span class="modal_item-price">1.000.000 VNĐ</span>
                <span class="modal_item-x">x</span>
                <span class="modal_item-quantity">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperStyled>
  );
};

export default Bill;
