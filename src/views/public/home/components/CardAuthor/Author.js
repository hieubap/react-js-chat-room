import { getImg } from "@src/utils/common";
import React from "react";
import { StyledAuthor } from "./styled";

const Author = ({ name, avatar, title, email, description, skill }) => {
  return (
    <StyledAuthor>
      <div className="author-avatar">
        <img src={avatar} />
      </div>
      <div className="author-name">{name}</div>
      <div className="author-title">{title}</div>
      <div className="author-email">{email}</div>
      {/* <div className="author-body">{description}</div> */}
      <div className="author-skill">{skill}</div>
    </StyledAuthor>
  );
};

export default Author;
