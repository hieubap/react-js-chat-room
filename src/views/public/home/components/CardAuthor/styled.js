import styled from "styled-components";

export const WrapperStyled = styled.div`
  .header-team {
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid var(--indigo);
    padding-bottom: 10px;
  }
`;

export const StyledAuthor = styled.div`
  background-color: white;
  margin: 100px 0;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 5px #ddd;
  :hover {
    box-shadow: 0 0 5px var(--red);
  }
  .author {
    &-avatar {
      display: flex;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: -75px;
        box-shadow: 4px 4px 9px 1px #999;
        transform: translateY(0);
        transition: all 0.4s;
        :hover {
          transform: translateY(-5px);
        }
      }
    }
    &-name {
      font-weight: 600;
      margin-top: 10px;
      font-size: 18px;
      cursor: pointer;
    }
    &-title {
      margin-bottom: 4px;
      span {
        border: 2px solid var(--green);
        border-radius: 15px;
        padding: 0px 10px 2px;
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
    &-email {
      color: #777;
      font-size: 12px;
      margin-bottom: 8px;
    }
    &-skill {
      font-size: 14px;
    }
    &-link {
      font-size: 20px;
      margin-top: 3px;
      i {
        margin: 0 5px;
        cursor: pointer;
        transition: all 0.4s;
        transform: scale(1);
        :hover {
          transform: scale(1.3);
        }
      }
      .fa-facebook {
        color: var(--blue);
      }
      .fa-google-plus {
        color: var(--red);
      }
    }
  }
`;
