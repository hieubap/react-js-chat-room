import styled from "styled-components";

export const WrapperStyled = styled.div`
  width: 1000px;
  padding: 30px calc(50% - 500px);
  .wrap-app {
    /* background-color: white; */
    padding: 10px;
    /* box-shadow: 0 0px 10px #ddd; */
    .group-title {
      padding: 5px;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 600;
    }
    .group-list {
      display: flex;
      justify-content: space-around;
      .item-app {
        width: 12%;
        padding: 5px;
        background-color: white;
        box-shadow: 0 0px 10px #ddd;
        cursor: pointer;
        transition: all 0.4s;
        &-image {
          img {
            width: 100%;
          }
        }
        &-description {
          text-align: center;
        }
        :hover {
          transform: scale(1.1);
          /* box-shadow: 0 0px 10px var(--blue); */
        }
      }
    }
  }
`;
