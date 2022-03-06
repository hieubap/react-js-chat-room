import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: auto;
  .ant-upload {
    .ant-upload-select-picture-card {
      border: 3px dashed green;
      width: 70px;
      height: 70px;
      span {
        color: green;
      }
    }
  }
  .image {
    width: 150px;
    height: 150px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;
