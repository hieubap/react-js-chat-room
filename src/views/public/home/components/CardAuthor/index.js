import React from "react";
import Author from "./Author";
import { WrapperStyled } from "./styled";

const listAuthor = [
  {
    avatar: require("@assets/images/HIEU.jpg").default,
    name: "Ngô Hiếu",
    title: "Fullstack",
    email: "ngohieu1811@gmail.com",
    description: "Học lập trình web từ 10/2020",
    skill: "Java(spring boot), React, React Native",
    facebook: "https://www.facebook.com/hieubap.2000/",
    github: "https://github.com/hieubap/react-js-friend-chat/tree/develop",
    gmail: "",
  },
  {
    avatar: require("@assets/images/HOANG.png").default,
    name: "Phạm Hoàng",
    title: "Backend",
    email: "hoangpsf@gmail.com",
    description: "Lập trình viên VPBank",
    skill: "Java(spring boot)",
  },
];

const CardAuthor = (props) => {
  return (
    <WrapperStyled>
      <div className="header-team">Đội ngũ phát triển</div>
      {listAuthor.map((item, key) => (
        <Author key={key} {...item}></Author>
      ))}
    </WrapperStyled>
  );
};

CardAuthor.propTypes = {};

export default CardAuthor;
