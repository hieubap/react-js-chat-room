import { getImg } from "@src/utils/common";
import React from "react";
import { StyledAuthor } from "./styled";

const Author = ({
  name,
  avatar,
  title,
  email,
  description,
  skill,
  facebook,
  github,
  gmail,
}) => {
  return (
    <StyledAuthor>
      <div className="author-avatar">
        <img src={avatar} />
      </div>
      <div className="author-name">{name}</div>
      <div className="author-title">
        <span>{title}</span>
      </div>
      <div className="author-email">{email}</div>
      {/* <div className="author-body">{description}</div> */}
      <div className="author-skill">{skill}</div>
      <div className="author-link">
        <i
          class="fa-brands fa-facebook"
          onClick={() => {
            window.open(facebook, "_blank").focus();
          }}
        ></i>
        <i
          class="fa-brands fa-github"
          onClick={() => {
            window.open(github, "_blank").focus();
          }}
        ></i>
        <i
          class="fa-brands fa-google-plus"
          //   onClick={() => {
          //     window.open(gmail, "_blank").focus();
          //   }}
        ></i>
      </div>
    </StyledAuthor>
  );
};

export default Author;
