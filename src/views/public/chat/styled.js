import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  /* margin-top: 50px; */
  .main-left {
    width: 20%;
    background-color: white;
    .room {
      &-header {
        height: 90px;
        &-title {
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          margin: 0 0 -7px 0;
          padding-top: 7px;
        }
        &-top {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          input[type="file"] {
            display: none;
          }
          i {
            font-size: 24px;
            margin-left: auto;
            cursor: pointer;
            margin-left: 10px;
          }
          &-img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
            }
            label {
              cursor: pointer;
            }
          }
          &-name {
            font-size: 16px;
            font-weight: 500;
            padding-left: 10px;
          }
        }
      }
      &-group {
        overflow: scroll;
        border-top: 1px solid #ccc;
        height: calc(100% - 90px);
        .room-item {
          padding: 5px 5px 5px 15px;
          display: flex;
          align-items: center;
          cursor: pointer;
          &-img {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &-content {
            padding: 0 0 0 15px;
            width: calc(100% - 70px);
            &-user {
              font-size: 16px;
              font-weight: 500;
            }
            &-message {
              display: flex;
              font-size: 13px;
              color: #777;
              span:first-child {
                width: 33px;
              }
              span:nth-child(2) {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: calc(100% - 95px);
              }
            }
          }
          :hover {
            background-color: #ccc;
          }
          &-active {
            background-color: blue;
          }
        }
      }
    }
  }
  .main-center {
    background: white;
    width: 60%;
    border-left: 1px solid #00c;
    position: relative;
    &-top {
      height: 60px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px #eee;
      padding: 0 10px;
      &-img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-name {
        font-size: 16px;
        font-weight: 500;
        padding-left: 10px;
      }
    }
    &-mid {
      height: calc(100% - 110px);
      overflow-y: scroll;

      &-visible-file {
        bottom: 45px;
        height: calc(100% - 200px);
      }
      .content-message {
        &-item {
          padding: 6px 10px;
          display: flex;
          .wrapper-data {
            max-width: 45%;

            .list-image {
              display: flex;
              flex-wrap: wrap;
              max-width: 312px;
              &-item {
                margin: 0 2px;
                height: 100px;
                width: 100px;
                overflow: hidden;
                border-radius: 10px;
                cursor: pointer;

                img {
                  transition: all 0.4s;
                  transform: scale(1);
                  &.auto-w {
                    width: auto;
                    height: 100%;
                  }
                  &.auto-h {
                    height: auto;
                    width: 100%;
                  }
                }

                :hover {
                  img {
                    transform: scale(1.1);
                    filter: brightness(80%);
                  }
                }
              }
            }
            &-content {
              padding: 7px 10px;
              border-radius: 16px;
              position: relative;
              .react-message {
                position: absolute;
                /* max-width: 34px;
                min-width: 20px; */
                /* width: 28px; */
                height: 18px;
                background: white;
                right: -1px;
                bottom: -12px;
                box-shadow: 0 0 2px #aaa;
                border-radius: 7px;
                display: flex;
                align-items: center;
                padding: 0 2px;
                div:first-child {
                  display: flex;
                  align-items: center;
                  img {
                    width: 14px;
                    height: 14px;
                    vertical-align: text-top;
                  }
                }
                div:last-child {
                  font-size: 10px;
                  margin-left: 3px;
                  color: #65676b;
                  line-height: 20px;
                }
                &-option {
                  position: absolute;
                  right: -170px;
                  top: 5px;
                  display: flex;
                  display: none;
                  cursor: pointer;
                  &-send {
                    left: -170px;
                    right: 0;
                  }
                  &-wrapper {
                    margin-left: 3px;
                  }
                  &-status {
                    padding: 2px;
                    border-radius: 5px;
                  }

                  img {
                    /* background-color: #e4e6eb; */
                    width: 24px;
                    height: 24px;
                    margin-left: 9px;
                    transition: all 0.4s;
                    :hover {
                      transform: scale(1.5);
                    }
                    &:first-child {
                      margin-left: 0;
                    }
                  }
                }
              }
            }
            .user-name-send {
              font-size: 10px;
              color: #666;
            }
            .list-last-seen {
              display: flex;
              align-items: center;

              &-send {
                justify-content: end;
                /* flex-direction: row-reverse; */
              }

              &-like {
                margin-top: 12px;
                margin-bottom: 4px;
              }

              &-item {
                width: 14px;
                height: 14px;
                margin-left: 2px;
                img {
                  border-radius: 50%;
                  margin-top: -8px;
                  width: 100%;
                  height: 100%;
                }
                &-content {
                  white-space: nowrap;
                  font-size: 11px;
                  margin-right: 25px;
                }
                &-child {
                  width: 100%;
                  height: 100%;
                  margin-top: -2px;
                }
              }
            }
          }

          &:hover {
            .react-message-option {
              display: flex;
            }
          }
          .main-center-top-img {
            width: 32px;
            height: 32px;
          }
          &.content-message-item-react {
            margin-bottom: 15px;
          }
          &-receive {
            justify-content: start;
            .wrapper-data-content {
              background-color: #e4e6eb;
              border-bottom-left-radius: 0;
            }

            &.content-message-item-front {
              padding: 1px 10px;

              .wrapper-data {
                &-content {
                  border-top-left-radius: 4px;
                  border-bottom-left-radius: 15px;
                }
              }
            }
            &.content-message-item-mid {
              padding: 1px 10px;

              .wrapper-data {
                &-content {
                  border-top-left-radius: 4px;
                  border-bottom-left-radius: 4px;
                }
              }
            }
            &.content-message-item-end {
              padding: 1px 10px;

              .wrapper-data {
                &-content {
                  border-bottom-left-radius: 4px;
                }
              }
            }
          }
          &-send {
            justify-content: end;
            .wrapper-data-content {
              color: white;
              background-color: #00a4fd;
              border-bottom-right-radius: 0;
            }

            &.content-message-item-front {
              padding: 1px 10px;

              .wrapper-data {
                &-content {
                  border-top-right-radius: 4px;
                  border-bottom-right-radius: 15px;
                }
              }
            }
            &.content-message-item-mid {
              padding: 1px 10px;

              .wrapper-data {
                &-content {
                  border-top-right-radius: 4px;
                  border-bottom-right-radius: 4px;
                }
              }
            }
            &.content-message-item-end {
              padding: 1px 10px;

              .wrapper-data {
                &-content {
                  border-bottom-right-radius: 4px;
                }
              }
            }
          }
        }
      }
    }
    &-bottom {
      height: 40px;
      display: flex;
      align-items: center;
      width: 100%;
      position: absolute;
      bottom: 0;
      &-visible-file {
        bottom: 45px;
        .bottom-input-message {
          background: #eee;
        }
      }
      .bottom-tools {
        display: flex;
        width: 120px;
        &-item {
          width: 25%;
        }
      }
      .bottom-input-message {
        padding: 0px 0px 10px 5px;
        margin: 0 15px;
        width: calc(100% - 40px);
        border-radius: 25px;
        .message-file {
          display: flex;
          &-over {
            overflow-x: scroll;
            width: calc(100% - 30px);
            margin: 0 10px;
          }
          &-item {
            margin: 7px 5px;
            position: relative;
            img {
              &.auto-w {
                width: auto;
                height: 100%;
              }
              &.auto-h {
                height: auto;
                width: 100%;
              }
            }
            .file-item {
              &_img {
                height: 70px;
                width: 70px;
                overflow: hidden;
                border-radius: 10px;
              }
              &_icon-remove {
                position: absolute;
                cursor: pointer;
                top: 0;
                right: -6px;
                background-color: white;
                z-index: 10;
                border-radius: 50%;
                width: 15px;
                height: 20px;
                font-size: 15px;
                padding-left: 5px;
                box-shadow: 0 0 2px #888;
                &:hover {
                  background-color: #e0e0e0;
                }
              }
            }
          }
        }
        input {
          width: calc(100% - 40px);
          outline: none;
          border: 1px solid #ccc;
          border-radius: 15px;
          padding: 7px 15px;
          background: #f9f9f9;
          display: inline-block;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          color: #444;
        }
      }
    }
  }
  .main-right {
    width: 20%;
    &-header {
      margin: 0 auto;
      padding: 10px;
      height: 140px;
      .main-center-top-img {
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }
      &-name {
        font-size: 16px;
        text-align: center;
        font-weight: 600;
      }
    }
    &-body {
      height: calc(100% - 140px);
      overflow-y: scroll;
      .collapse-tool {
        &-title {
          font-size: 14px;
          font-weight: 600;
          padding: 0px 15px;
        }
        &-title:hover {
          background-color: #ccc;
        }
      }
      .list-user {
        &-item {
          padding: 5px 15px;
          display: flex;
          align-items: center;
          &-img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
            i {
              font-size: 20px;
              padding: 8px 9px;
              background-color: #e0e0e0;
            }
          }
          &-remove {
            i {
              cursor: pointer;
              display: none;
              padding: 3px 5px;
              font-size: 12px;
              background-color: #e0e0e0;
              border-radius: 50%;
            }
          }
          &-content {
            padding: 0 15px;
            width: calc(100% - 82px);
            &-user {
              font-size: 13px;
              font-weight: 500;
            }
            &-message {
              display: flex;
              color: #777;
              span:first-child {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: calc(100% - 50px);
              }
            }
          }
          :hover {
            background-color: #f7f7f7;
            .list-user-item-remove {
              i {
                display: block;
              }
            }
          }
          &-active {
            background-color: blue;
          }
          &:last-child {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
