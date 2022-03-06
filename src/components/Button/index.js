import Icon from "@ant-design/icons";
import React, { forwardRef } from "react";
import { Button as Bt } from "./style";
import { ReactComponent as AddIcon } from "@assets/svg/add.svg";

const Button = (
  { icon, content, iconSvg, className = "btn-pink", disabled, ...props },
  ref
) => {
  return (
    <Bt
      ref={ref}
      className={className}
      type="button"
      disabled={disabled}
      style={disabled ? { backgroundColor: "#ccc" } : {}}
      {...props}
    >
      <div style={{ display: "flex" }}>
        <span style={{ paddingRight: 5 }}>{content}</span>
        {icon && <i style={{ marginTop: 3 }} className={icon}></i>}
        {iconSvg && <Icon style={{ marginTop: 3 }} component={iconSvg} />}
      </div>
    </Bt>
  );
};

export default forwardRef(Button);
