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
      {listAuthor.map((item, key) => (
        <Author key={key} {...item}></Author>
      ))}
    </WrapperStyled>
  );
};

CardAuthor.propTypes = {};

export default CardAuthor;
