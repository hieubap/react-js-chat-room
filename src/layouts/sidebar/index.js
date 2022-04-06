import React from "react";
import PropTypes from "prop-types";
import { WrapperStyled } from "./styled";

const routes = [
  // { title: "Home", path: "/p/home", classIcon: "fa-brands fa-app-store" },
  // { title: "Home", path: "/p/home", classIcon: "fa-brands fa-app-store" },
  {
    title: "Bảo mật và đăng nhập",
    path: "/p/setting/login-secure",
    classIcon: "fa-solid fa-person-walking-arrow-right",
  },
];

const SideBar = ({ history }) => {
  return (
    <WrapperStyled>
      <div className="top-sidebar"></div>
      <div className="mid-sidebar">
        <div className="mid-sidebar-wrapper">
          {routes.map((item, key) => (
            <div
              key={key}
              className="sidebar-item"
              onClick={() => history.push(item.path)}
            >
              <i className={item.classIcon}></i>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-sidebar"></div>
    </WrapperStyled>
  );
};

export default SideBar;
