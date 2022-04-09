import styled from "styled-components";

export const WrapperStyled = styled.div`
  background-color: rgb(249, 249, 249);
  .container {
    &__adver {
      flex: 1;
      text-align: center;
      position: fixed;
      &-left {
        position: fixed;
        top: 50px;
        img {
          width: 300px;
          height: 600px;
        }
      }
      &-left {
        left: 0;
      }
      &-right {
        position: absolute;
        top: 80px;
        right: 40px;
      }
    }
    &__body {
      display: flex;
      justify-content: center;
      &--main {
        width: 40%;
        padding: 20px 0;
      }

      &--postbtn {
        width: 100%;
        height: 40px;
        border: 1px solid rgb(240, 237, 237);
        border-radius: 40px;
        font-size: 16px;
        cursor: pointer;
        :hover {
          background-color: #e7e2e2;
        }
      }
    }
  }
`;
