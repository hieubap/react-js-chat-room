import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { WrapperHeader } from "./styled";
import authProvider from "@data-access/auth-provider";

const Header = ({ auth }) => {
  const [activeKey, setActiveKey] = useState();
  const history = useHistory();
  const routes = [
    { title: "Home", path: "/p/home", icon: "fa-solid fa-house" },
    { title: "Chat", path: "/p/chat", icon: "fa-solid fa-comment-dots" },
    { title: "App", path: "/p/app", icon: "fa-solid fa-comment-dots" },
    { title: "Setting", path: "/p/setting", icon: "fa-solid fa-gear" },
  ];

  useEffect(() => {
    setActiveKey(routes.findIndex((i) => i.path === window.location.pathname));
  }, []);

  return (
    <WrapperHeader>
      <div className="main-header">
        <div className="main-header-left">
          <div className="navbar">
            {routes.map((item, key) => (
              <div
                key={key}
                className={"navbar-item" + (activeKey === key ? " active" : "")}
                onClick={() => {
                  history.push(item.path);
                  setActiveKey(key);
                }}
              >
                {/* <i className={item.icon} /> */}
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="main-header-right">
          <div className="wrapper-item">
            <div className="wrapper-item-content">
              {auth?.fullName}/{auth?.username}
            </div>
          </div>
          <div
            className="wrapper-item"
            onClick={() => {
              authProvider.logout();
            }}
          >
            <div className="wrapper-item-content">Logout</div>
          </div>
        </div>
      </div>
    </WrapperHeader>
  );
};

export default connect(({ auth: { auth } }) => ({ auth }))(Header);
