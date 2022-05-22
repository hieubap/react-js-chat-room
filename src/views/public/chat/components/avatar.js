import React from "react";
import { StyledAvatar } from "./styled";

const Avatar = ({
  src,
  width = 60,
  name,
  content,
  onRemove,
  direction = "row",
}) => {
  return (
    <StyledAvatar className="avatar-component" width={width} direction={direction}>
      <div className="avatar-component-wrap">
        <div className="avatar-component-img">
          <img src={src} />
        </div>
        {onRemove && (
          <div className="icon-remove" onClick={onRemove}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        )}
      </div>
      {name && (
        <div className="avatar-component-content">
          <div className="avatar-component-content-user">{name}</div>
          <div className="avatar-component-content-message">
            <span>{content}</span>
          </div>
        </div>
      )}
    </StyledAvatar>
  );
};

Avatar.propTypes = {};

export default Avatar;
