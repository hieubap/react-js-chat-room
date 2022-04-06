import React from "react";
import { useHistory } from "react-router";
import { WrapperHeader } from "./styled";

const Header = (props) => {
  const history = useHistory();
  const routes = [
    { title: "Home", path: "/p/home" },
    { title: "Chat", path: "/p/chat" },
    { title: "Map", path: "/p/map" },
    { title: "Setting", path: "/p/setting" },
  ];

  return (
    <WrapperHeader>
      <div className="main-header">
        <div className="main-header-left">
          <div className="navbar">
            {routes.map((item, key) => (
              <div
                key={key}
                className="navbar-item"
                onClick={() => {
                  history.push(item.path);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="main-header-right">
          <div className="wrapper-item">
            <div className="wrapper-item-content">chat</div>
          </div>
          <div className="wrapper-item">
            <div className="wrapper-item-content">chat</div>
          </div>
          <div className="wrapper-item">
            <div className="wrapper-item-content">Account</div>
          </div>
        </div>
      </div>
    </WrapperHeader>
  );
};

export default Header;
