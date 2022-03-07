import { Input } from "antd";
import React, { useRef, useState } from "react";

const InputTimeout = ({ placeholder, onChange, ...props }) => {
  const refTimeout = useRef();
  const [value, setValue] = useState("");

  const _onChange = (e) => {
    setValue(e?.target?.value);

    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      onChange(e?.target?.value);
    }, 700);
  };

  return (
    <Input
      onChange={_onChange}
      value={value}
      placeholder={placeholder}
      {...props}
    ></Input>
  );
};

export default InputTimeout;
