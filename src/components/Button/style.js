import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  font-weight: 400;

  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  margin-right: 5px;
  font-size: 14px;
  height: 32px;
  line-height: 1.5;
  border-radius: 4px;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s,
    box-shadow 0.15s;
  border: 1px solid rgba(0, 0, 0, 0.103176);

  &.btn-white {
    background-color: white;
    border: 1px solid #bbb;
    color: black;
  }
  &.btn-white:hover {
    border: 1px solid #999;
    color: #999;
  }
  &.btn-pink {
    background-color: #ef5da8;
    color: white;
  }
  &.btn-pink:hover {
    background-color: #de4c97;
  }
`;
