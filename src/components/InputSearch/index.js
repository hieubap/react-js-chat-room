import { SearchOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { Styled } from "./styled";

const InputSearch = ({
  type = "text",
  search = () => {},
  placeholder = "Tìm kiếm",
  className,
  ...props
}) => {
  const refs = useRef(null);

  const onSearch = (e) => {
    if (refs.current) {
      clearTimeout(refs.current);
    }
    refs.current = setTimeout(() => {
      search(e.target.value);
    }, 500);
  };

  return (
    <Styled {...props} className={`search-box ${className}`}>
      <SearchOutlined style={{ color: "#666" }} />
      <input type={type} onChange={onSearch} placeholder={placeholder} />
    </Styled>
  );
};

export default InputSearch;
