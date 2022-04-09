import styled from "styled-components";

export const WrapperStyled = styled.div`
  width: 250px;
  height: 100%;
  background: var(--gray-dark);
  color: white;
  padding: 10px 0;
  .sidebar-item {
    padding: 10px;
    margin: 7px;
    cursor: pointer;
    border-radius: 2px;
    display: flex;
    align-items: center;
    i {
      width: 25px;
      font-size: 20px;
    }
    span {
      padding-left: 10px;
    }
    :hover,
    &.active {
      background-color: #3670ce;
    }
  }
`;
