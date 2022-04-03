import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Modal from "../chat/components/modal";

const WrapperLogin = styled.div`
  .md-login-header {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    background-color: #2b2b2b;
    color: white;
    padding: 5px;
  }
  .md-login-body {
    margin-bottom: 10px;
    &-input {
      padding: 10px;
      display: flex;
      flex-direction: column;
      text-align: center;
      input {
        margin: 0 auto;
        width: 60%;
        border-radius: 5px;
        height: 35px;
        border: 1px solid #ccc;
        padding: 0 15px;
        outline: none;
        text-align: left;
        &:hover,
        &:focus {
          box-shadow: 0 0px 3px #50a3b9;
          border: 1px solid #50a3b9;
        }
      }
      &.danger {
        input {
          border-color: red;
        }
      }
      .danger {
        color: red;
      }
    }
  }
  .md-login-footer {
    .btn-login {
      background-color: #50a3b9;
      width: 50%;
      margin: 0 auto;
      text-align: center;
      color: white;
      border-radius: 15px;
      padding: 5px;
      cursor: pointer;
      transition: all 0.4s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  .md-login-signup {
    text-align: center;
    span {
      cursor: pointer;
      color: #73b7c9;
      :hover {
        color: #50a3b9;
      }
    }
  }
  .md-login-switch {
    position: absolute;
    width: 100%;
    padding: 5px;
    bottom: 0;
    background: #188754;
    text-align: center;
    color: white;
    cursor: pointer;
    span:before {
      background-color: white;
    }
    &-text {
      position: relative;
      z-index: 1;
    }
    &-effect {
      width: 0;
      height: 3px;
      left: 50%;
      bottom: 0;
      position: absolute;
      background-color: #50a3b9;
      transition: all 0.5s;
    }
    &:hover {
      .md-login-switch-effect {
        width: 50%;
        left: 25%;
      }
    }
  }
`;

const AuthModal = ({ onLogin, onRegister, auth }) => {
  console.log(auth, "auth");
  const [state, _setState] = useState({
    isLogin: true,
    visible: !auth?.userId,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const onChange = (key) => (e) => {
    setState({ [key]: e.target.value });
  };

  const handleSubmit = () => {
    const { username, password, fullName, password2 } = state;
    setState({ isSubmit: true });
    console.log(state, "state");
    if (!username || !password) {
      return;
    }
    if ((!fullName || !password2) && !state.isLogin) {
      return;
    }
    if (password !== password2 && !state.isLogin) {
      toast.error("Mật khẩu không đúng! Vui lòng kiểm tra lại");
      return;
    }
    const callApi = state.isLogin ? onLogin : onRegister;
    const body = { username, password, ...(state.isLogin ? {} : { fullName }) };
    callApi(body).then(() => {
      if (state.isLogin) {
        setState({ visible: false });
      } else {
        setState({ isLogin: true });
      }
    });
  };

  return (
    <Modal visible={state.visible} height={state.isLogin ? 300 : 450}>
      <WrapperLogin>
        <div className="md-login-header">
          {state.isLogin ? "Login" : "Register"}
        </div>
        <div className="md-login-body">
          {!state.isLogin && (
            <div
              className={`md-login-body-input ${
                state.isSubmit && !state.fullName ? "danger" : ""
              }`}
            >
              <input
                onChange={onChange("fullName")}
                placeholder="Your name"
              ></input>
              {state.isSubmit && !state.fullName && (
                <div className="danger">Vui lòng nhập username</div>
              )}
            </div>
          )}
          <div
            className={`md-login-body-input ${
              state.isSubmit && !state.username ? "danger" : ""
            }`}
          >
            <input
              onChange={onChange("username")}
              placeholder="Username"
            ></input>
            {state.isSubmit && !state.username && (
              <div className="danger">Vui lòng nhập username</div>
            )}
          </div>
          <div
            className={`md-login-body-input ${
              state.isSubmit && !state.password ? "danger" : ""
            }`}
          >
            <input
              type="password"
              onChange={onChange("password")}
              placeholder="Password"
            ></input>
            {state.isSubmit && !state.password && (
              <div className="danger">Vui lòng nhập password</div>
            )}
          </div>
          {!state.isLogin && (
            <div
              className={`md-login-body-input ${
                state.isSubmit && !state.password2 ? "danger" : ""
              }`}
            >
              <input
                type="password"
                onChange={onChange("password2")}
                placeholder="Confirm password"
              ></input>
              {state.isSubmit && !state.password2 && (
                <div className="danger">Vui lòng nhập username</div>
              )}
            </div>
          )}
        </div>
        <div className="md-login-footer">
          <div className="btn-login" onClick={handleSubmit}>
            {state.isLogin ? "Login" : "Sign up"}
          </div>
        </div>
        {state.isLogin ? (
          <>
            <div className="md-login-signup">
              Not a member yet?
              <span
                onClick={() => setState({ isLogin: false, isSubmit: false })}
              >
                Sign Up
              </span>
            </div>
            <div className="md-login-switch">
              <div
                className="md-login-switch-text"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8000/auth-server/oauth/authorize?response_type=code&client_id=hoang&scope=read&state=2K4ZDYkjCYQf6u5NPJYGDtOtxmUkgI73WIcI-PJFe8k%3D&redirect_uri=http://localhost:3000/sso")
                }
              >
                Auth
              </div>
              <span className="md-login-switch-effect"></span>
            </div>
          </>
        ) : (
          <>
            <div className="md-login-switch">
              <div
                className="md-login-switch-text"
                onClick={() => setState({ isLogin: true, isSubmit: false })}
              >
                Login
              </div>
              <span className="md-login-switch-effect"></span>
            </div>
          </>
        )}
      </WrapperLogin>
    </Modal>
  );
};

export default connect(
  ({ auth: { auth } }) => ({ auth }),
  ({ auth: { onLogin, onRegister } }) => ({ onLogin, onRegister })
)(AuthModal);
