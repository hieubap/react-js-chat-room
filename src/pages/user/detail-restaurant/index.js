import React, { useState } from "react";
import { connect } from "react-redux";
import Comment from "./component/Comment";
import GioHang from "./component/gio-hang";
import Info from "./component/Info";
import ListFood from "./component/ListFood";
import { WrapperStyled } from "./styled";

const Shop = ({ listAdd = [] }) => {
  const [state, _setState] = useState({ showBill: false, activeTab: 0 });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const tabs = [
    {
      name: "Thông tin",
    },
    {
      name: "Thực đơn",
    },
    {
      name: "Đánh giá",
    },
  ];

  return (
    <WrapperStyled>
      <div className="app">
        <div className="container">
          <div className="grid wide">
            <div className="row sm-gutter app__content">
              <div className="col l-10 m-12 c-12">
                <div className="home-filter hide-on-mobile-tablet">
                  {tabs.map((item, idx) => (
                    <button
                      className={`home-filter__btn btn ${
                        idx === state.activeTab ? "btn--primary" : ""
                      }`}
                      onClick={() => setState({ activeTab: idx })}
                    >
                      {item.name}
                    </button>
                  ))}
                  {/* <button className="home-filter__btn btn">Thông tin</button>
                  <button className="home-filter__btn btn btn--primary">
                    Thực đơn
                  </button>
                  <button className="home-filter__btn btn">Đánh giá</button> */}
                  <div class="home-filter__page">
                    <span class="home-filter__page-num">Nhà hàng ABCD</span>
                  </div>
                </div>

                <Info display={state.activeTab === 0} />
                <ListFood display={state.activeTab === 1} />
                <Comment display={state.activeTab === 2} />
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="grid wide footer__content">
            <div className="row">
              <div className="col l-2-3 m-3 c-6">
                <div className="footer__heading">Chăm sóc khách hàng</div>
                <ul className="footer-list">
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Trung tâm trợ giúp
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Skying Club Shop
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Hướng dẫn mua hàng
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l-2-3 m-3 c-6">
                <div className="footer__heading">Giới thiệu</div>
                <ul className="footer-list">
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Giới thiệu
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Tuyển dụng
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Điều khoản
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l-2-3 m-3 c-6">
                <div className="footer__heading">Danh mục</div>
                <ul className="footer-list">
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Đồ chơi
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Xe đua
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      Gấu bông
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l-2-3 m-3 c-6">
                <div className="footer__heading">Theo dõi chúng tôi</div>
                <ul className="footer-list">
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      <i className="footer-item__icon fab fa-facebook"></i>
                      Facebook
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      <i className="footer-item__icon fab fa-instagram"></i>
                      Instagram
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="" className="footer-item__link">
                      <i className="footer-item__icon fab fa-twitter-square"></i>
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="grid wide">
              <p className="footer__text">
                © 2022 - Bản quyền thuộc về Skying Club Shop
              </p>
            </div>
          </div>
        </footer>
      </div>

      <div className="modal">
        <div className="modal__overlay"></div>

        <div className="modal__body">
          <form id="register-form" className="auth-form fm">
            <div className="auth-form__container">
              <div className="auth-form__header">
                <div className="auth-form__heading">Đăng ký</div>
              </div>

              <div className="auth-form__groups">
                <div className="auth-form__group">
                  <input
                    id="email"
                    rule="email"
                    type="text"
                    className="auth-form__input"
                    placeholder="Email của bạn"
                  />
                </div>
                <div className="auth-form__group">
                  <input
                    id="password"
                    rule="password"
                    type="password"
                    className="auth-form__input"
                    placeholder="Mật khẩu của bạn"
                  />
                </div>
                <div className="auth-form__group">
                  <input
                    id="password_confirmation"
                    rule="password_confirmation"
                    type="password"
                    className="auth-form__input"
                    placeholder="Nhập lại mật khẩu của bạn"
                  />
                  <span className="auth-form__message"></span>
                </div>
              </div>

              <div className="auth-form__aside">
                <p className="auth-form__policy-text">
                  Bằng việc đăng ký, bạn đã đồng ý với Minecraft Shop
                  <a href="" className="auth-form__text-link">
                    Điều khoản dịch vụ
                  </a>{" "}
                  &
                  <a href="" className="auth-form__text-link">
                    Chính sách bảo mật
                  </a>
                </p>

                <div className="auth-form__switch-wrapper">
                  <span className="auth-form__switch-text">
                    Bạn đã có tài khoản?
                  </span>
                  <span className="auth-form__switch-btn">Đăng nhập</span>
                </div>
              </div>

              <div className="auth-form__controls">
                <button className="btn auth-form__controls-back">
                  TRỞ LẠI
                </button>
                <button className="btn btn--primary">ĐĂNG KÝ</button>
              </div>
            </div>

            <div className="auth-form__socials">
              <a
                href=""
                className="auth-form__socials--facebook btn btn--size-s btn--with-icon"
              >
                <i className="auth-form__socials-icon fab fa-facebook-square"></i>
                <span className="auth-form__socials-title">
                  Kết nối với Facebook
                </span>
              </a>
              <a
                href=""
                className="auth-form__socials--google btn btn--size-s btn--with-icon"
              >
                <i className="auth-form__socials-icon fab fa-google"></i>
                <span className="auth-form__socials-title">
                  Kết nối với Google
                </span>
              </a>
            </div>
          </form>

          <form id="login-form" className="auth-form fm">
            <div className="auth-form__container">
              <div className="auth-form__header">
                <div className="auth-form__heading">Đăng nhập</div>
              </div>

              <div className="auth-form__groups">
                <div className="auth-form__group">
                  <input
                    id="login-username-input"
                    rule="email"
                    type="text"
                    className="auth-form__input"
                    placeholder="Email của bạn"
                  />
                </div>
                <div className="auth-form__group">
                  <input
                    id="login-password-input"
                    rule="password"
                    type="password"
                    className="auth-form__input"
                    placeholder="Mật khẩu của bạn"
                  />
                </div>
              </div>

              <div className="auth-form__aside">
                <div className="auth-form__help">
                  <a
                    href=""
                    className="auth-form__help-link auth-form__help-forgot"
                  >
                    Quên mật khẩu
                  </a>
                  <span className="auth-form__help-separate"></span>
                  <a href="" className="auth-form__help-link">
                    Cần trợ giúp?
                  </a>
                </div>
              </div>

              <div className="auth-form__controls">
                <button className="btn auth-form__controls-back">
                  TRỞ LẠI
                </button>
                <button id="btn-login" className="btn btn--primary">
                  ĐĂNG NHẬP
                </button>
              </div>

              <div className="auth-form__switch-wrapper">
                <span className="auth-form__switch-text">
                  Bạn chưa có tài khoản?
                </span>
                <span className="auth-form__switch-btn">Đăng ký</span>
              </div>
            </div>

            <div className="auth-form__socials">
              <a
                href=""
                className="auth-form__socials--facebook btn btn--size-s btn--with-icon"
              >
                <i className="auth-form__socials-icon fab fa-facebook-square"></i>
                <span className="auth-form__socials-title">
                  Kết nối với Facebook
                </span>
              </a>
              <a
                href=""
                className="auth-form__socials--google btn btn--size-s btn--with-icon"
              >
                <i className="auth-form__socials-icon fab fa-google"></i>
                <span className="auth-form__socials-title">
                  Kết nối với Google
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="buy-bottom" onClick={() => setState({ showBill: true })}>
        <div className="card-fixed">
          <i className="header__cart-icon fas fa-shopping-cart"></i>
          <span className="header__cart-wrap-notice" id="number_select">
            {listAdd.length}
          </span>
        </div>
      </div>

      {state.showBill && (
        <GioHang onCancel={() => setState({ showBill: false })} />
      )}
    </WrapperStyled>
  );
};

export default connect(({ shop: { listAdd } }) => ({ listAdd }))(Shop);
