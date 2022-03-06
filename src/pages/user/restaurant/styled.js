import styled from "styled-components";

export const WrapperStyled = styled.div`
  margin-top: 50px;
  padding-top: 5px;
  background-color: #eee;
  min-height: 100vh;
  padding-bottom: 50px;
  .title-group {
    margin: 20px;
    font-size: 24px;
    font-weight: 500;
    padding: 0 30px;
  }
  .list-sport {
    padding: 0 50px;
    display: flex;
    flex-wrap: wrap;
    .list-sport__item {
      width: 25%;

      .item-sport:hover {
        transform: scale(1.1);
      }
      .item-sport {
        padding: 15px;
        transition: all 0.4s;
        transform: scale(1);
        cursor: pointer;
        .item-sport_body {
          border-radius: 10px;
          overflow: hidden;
          .item-sport_background {
            img {
              width: 100%;
              height: 200px;
            }
          }
          .item-sport_content {
            background-color: white;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            margin-top: -25px;
            padding: 15px;
            position: relative;
            .title {
              font-size: 18px;
              font-weight: 500;
              color: #172b4d;
            }
            .address {
              color: #777;
              min-height: 30px;
            }
            .description {
              color: #779;
              min-height: 20px;
              i {
                color: #ffc107;
              }
              span {
                margin-left: 5px;
              }
            }
            .comment {
              display: flex;
              justify-content: space-between;
            }

            .btn-register {
              display: flex;
              margin-top: 5px;
              .btn-register_content:hover:not(.is-register) {
                background-color: var(--color-blue-2);
              }
              .btn-register_content {
                cursor: pointer;
                background-color: var(--color-blue);
                color: white;
                font-weight: 500;
                padding: 2px 10px;
                border-radius: 2px;
              }
              .is-register {
                background-color: var(--color-green);
              }
            }
          }
        }
      }
    }
  }
`;
