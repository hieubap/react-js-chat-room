import React, { useState } from "react";
import { connect } from "react-redux";
import { WrapperStyled } from "./styled";
import { message } from "antd";

const Register = ({ _register, history }) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { address, username, name, password, password2 } = state;
    setState({ clickSubmit: true });
    if (!name) {
      message.error("Vui lòng nhập tên người dùng");
      return;
    }
    if (!address) {
      message.error("Vui lòng nhập địa chỉ");
      return;
    }
    if (!username) {
      message.error("Vui lòng nhập username");
      return;
    }
    if (!password) {
      message.error("Vui lòng nhập password");
      return;
    }
    if (!password2) {
      message.error("Vui lòng nhập lại password");
      return;
    }
    if (password != password2) {
      message.error("password không đúng");
      return;
    }
    _register({ address, name, username, password }).then((res) => {
      if (res && res.code === 0) {
        message.success("Đăng ký thành công. Vui lòng đăng nhập vào hệ thống");

        // setTimeout(() => {
        //   window.location.href = "/auth/login";
        // }, 1000);
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <WrapperStyled>
      <div className="center-container">
        <div className="header-w3l">
          <h1>Online Sign in Form</h1>
        </div>
        <div className="main-content-agile">
          <div className="sub-main-w3">
            <div className="wthree-pro">
              <h2>Sign in Quick</h2>
            </div>
            <form action="#" method="post" className="form-auth">
              <div
                className={
                  state.clickSubmit && !state.name
                    ? "group-input invalid"
                    : "group-input"
                }
              >
                <input
                  placeholder="Tên người dùng"
                  name="Name"
                  onChange={(e) => {
                    setState({ name: e.target.value });
                  }}
                  type="text"
                />
                <span className="icon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className={
                  state.clickSubmit && !state.address
                    ? "group-input invalid"
                    : "group-input"
                }
              >
                <input
                  placeholder="Địa chỉ"
                  name="Name"
                  onChange={(e) => {
                    setState({ address: e.target.value });
                  }}
                  type="text"
                  required=""
                />
                <span className="icon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className={
                  state.clickSubmit && !state.username
                    ? "group-input invalid"
                    : "group-input"
                }
              >
                <input
                  placeholder="Username"
                  name="username"
                  onChange={(e) => {
                    setState({ username: e.target.value });
                  }}
                  type="text"
                  required=""
                />
                <span className="icon1">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className={
                  state.clickSubmit && !state.password
                    ? "group-input invalid"
                    : "group-input"
                }
              >
                <input
                  placeholder="Nhập mật khẩu"
                  name="Password"
                  onChange={(e) => {
                    setState({ password: e.target.value });
                  }}
                  type="password"
                  required=""
                />
                <span className="icon2">
                  <i className="fa fa-unlock" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className={
                  state.clickSubmit && !state.password2
                    ? "invalid group-input"
                    : "group-input"
                }
              >
                <input
                  placeholder="Nhập lại mật khẩu"
                  name="Password"
                  onChange={(e) => {
                    setState({ password2: e.target.value });
                  }}
                  type="password"
                  required=""
                />
                <span className="icon2">
                  <i className="fa fa-unlock" aria-hidden="true"></i>
                </span>
              </div>
              <div className="sub-w3l">
                <div className="right-w3l" onClick={handleSubmit}>
                  <input type="submit" value="Sign in" />
                </div>
                <div
                  className="right-w3l"
                  onClick={() => {
                    history.push("/auth/login");
                  }}
                >
                  <input type="submit" value="Login in" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="footer">
          <p>&copy; Online Sign in Form | Design by Skyingclub</p>
        </div>
      </div>
    </WrapperStyled>
  );
};
export default connect(
  ({}) => ({}),
  ({ auth: { _register } }) => ({ _register })
)(Register);
