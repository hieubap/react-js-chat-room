import React, { useState } from "react";
import { WrapperStyled } from "./styled";

const routes = [
  // { title: "Home", path: "/p/home", classIcon: "fa-brands fa-app-store" },
  // { title: "Home", path: "/p/home", classIcon: "fa-brands fa-app-store" },

  {
    title: "Đội ngũ phát triển",
    path: "/p/setting/login-secure",
    classIcon: "fa-solid fa-people-group",
  },
  {
    title: "Bảo mật đăng nhập",
    path: "/p/setting/login-secure",
    classIcon: "fa-solid fa-shield-halved",
  },
  {
    title: "Tài khoản",
    path: "/p/setting/login-secure",
    classIcon: "fa-solid fa-circle-user",
  },
  {
    title: "Đăng xuất",
    path: "/p/setting/login-secure",
    classIcon: "fa-solid fa-person-walking-arrow-right",
  },
];

const SideBar = ({ history }) => {
  const [active, setActive] = useState(-1);

  const onClick = (index, item) => () => {
    setActive(index);
    history.push(item.path);
  };

  return (
    <WrapperStyled>
      <div className="top-sidebar"></div>
      <div className="mid-sidebar">
        <div className="mid-sidebar-wrapper">
          {routes.map((item, key) => (
            <div
              key={key}
              className={`sidebar-item ${active === key ? "active" : ""}`}
              onClick={onClick(key, item)}
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
