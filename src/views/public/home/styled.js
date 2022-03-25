import React from "react";
import styled from "styled-components";

export const WrapperStyled = styled.div`
  background-color: rgb(249, 249, 249);
  .container {
    &__adver {
      flex: 1;
      text-align: center;
      position: fixed;
      &-left,
      &-right {
        position: fixed;
        top: 50px;
        img {
          width: 300px;
          height: 600px;
        }
      }
      &-left {
        left: 50px;
      }
      &-right {
        right: 50px;
      }
    }
    &__body {
      display: flex;
      justify-content: center;
      &--main {
        width: 40%;
      }
    }
  }
`;
