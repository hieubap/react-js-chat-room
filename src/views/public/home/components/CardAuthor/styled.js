import styled from "styled-components";

export const WrapperStyled = styled.div``;

export const StyledAuthor = styled.div`
  background-color: white;
  margin: 120px 0;
  padding: 10px;
  text-align: center;
  .author {
    &-avatar {
      display: flex;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: -75px;
      }
    }
    &-name {
      font-weight: bold;
      margin-top: 10px;
      font-size: 18px;
    }
    &-title {
    }
    &-email {
      color: #777;
    }
    &-skill {
      font-size: 14px;
    }
  }
`;
