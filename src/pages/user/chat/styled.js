/* @import "../apps.css"; */

import styled from "styled-components";

/*Chat Apps Styles*/

export const StyledWrapper = styled.div`
  /* height: calc(100vh - 130px); */
  margin-top: 50px;
  padding-top: 5px;
  background-color: #eee;
  /* min-height: 100vh; */
  /* overflow-y: scroll; */
  /*Tabs Styles*/

  .gx-tabs-half {
    .ant-tabs-bar {
      margin-bottom: 0;
    }
    .ant-tabs-nav {
      display: block;
      .ant-tabs-tab {
        margin: 0;
        width: 50%;
        text-align: center;
        display: block;
      }
      .ant-tabs-ink-bar {
        width: 50%;
      }
      .ant-tabs-nav-wrap {
        display: block;
      }
    }
  }
  .gx-chat-module {
    position: relative;
  }
  .gx-chat-module-box {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    background-color: #fafafa;
    position: relative;
    width: 100%;
  }
  .gx-chat-sidenav {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-flex: 0 1 315px;
    -ms-flex: 0 1 315px;
    flex: 0 1 315px;
    min-width: 315px;
    border-right: solid 1px #e8e8e8;
  }
  .gx-chat-sidenav-header {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding: 25px 20px 12px;
    background-color: #fbfbfb;
    border-bottom: solid 1px #e8e8e8;
  }
  .gx-chat-user-hd {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    margin-bottom: 25px;
  }
  .gx-chat-search-wrapper {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    margin-bottom: 0;
  }
  .gx-chat-avatar {
    min-width: 50px;
  }
  .gx-chat-user-row .gx-chat-avatar {
    padding: 0 5px;
    min-width: 10px;
  }
  .gx-chat-user-hd .gx-chat-avatar {
    cursor: pointer;
  }
  .gx-chat-sidenav-scroll {
    height: calc(100vh - 295px) !important;
    .group-action {
      border-bottom: 1px solid #ddd;
      .action-item {
        padding: 5px 10px;
        cursor: pointer;
      }
      .action-item:hover {
        background-color: #eee;
      }
    }
  }
  .framed-layout .gx-chat-sidenav-scroll {
    height: calc(100vh - 295px + 2 * 20px) !important;
  }
  @media screen and (max-width: 991px) {
    .gx-chat-sidenav-scroll {
      height: calc(100vh - 175px) !important;
    }
    .framed-layout .gx-chat-sidenav-scroll {
      height: calc(100vh - 175px) !important;
    }
  }
  .gx-chat-sidenav-scroll > div:first-child {
    overflow-y: scroll !important;
  }
  .gx-chat-sidenav-scroll-tab-1,
  .gx-chat-sidenav-scroll-tab-2 {
    height: calc(100vh - 320px) !important;
  }
  .framed-layout .gx-chat-sidenav-scroll-tab-1,
  .framed-layout .gx-chat-sidenav-scroll-tab-2 {
    height: calc(100vh - 320px + 2 * 20px) !important;
  }
  @media screen and (max-width: 991px) {
    .gx-chat-sidenav-scroll-tab-1,
    .gx-chat-sidenav-scroll-tab-2 {
      height: calc(100vh - 198px) !important;
    }
    .framed-layout .gx-chat-sidenav-scroll-tab-1,
    .framed-layout .gx-chat-sidenav-scroll-tab-2 {
      height: calc(100vh - 198px) !important;
    }
  }
  .gx-chat-sidenav-scroll-tab-1 > div:first-child,
  .gx-chat-sidenav-scroll-tab-2 > div:first-child {
    overflow-y: scroll !important;
  }
  .gx-chat-list-scroll {
    height: calc(100vh - 268px) !important;
  }
  .framed-layout .gx-chat-list-scroll {
    height: calc(100vh - 268px + 2 * 20px) !important;
  }
  @media screen and (max-width: 1199px) {
    .gx-chat-list-scroll {
      height: calc(100vh - 242px) !important;
    }
    .framed-layout .gx-chat-list-scroll {
      height: calc(100vh - 242px + 2 * 20px) !important;
    }
  }
  @media screen and (max-width: 991px) {
    .framed-layout .gx-chat-list-scroll {
      height: calc(100vh - 242px) !important;
    }
  }
  @media screen and (max-width: 575px) {
    .gx-chat-list-scroll {
      height: calc(100vh - 220px) !important;
    }
  }
  .gx-chat-list-scroll > div:first-child {
    overflow-y: scroll !important;
  }
  .gx-chat-sidenav-content {
    background-color: #ffffff;
  }
  .gx-chat-sidenav-title {
    padding: 10px 16px;
    font-size: 14px;
    color: #1890ff;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
  }
  @media screen and (max-width: 1199px) {
    .gx-chat-sidenav-title {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    .gx-chat-sidenav-title {
      font-size: 15px;
    }
  }
  .gx-chat-tabs-header {
    background-color: #fbfbfb !important;
  }
  .gx-chat-user {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  .gx-chat-user.gx-chat-user-center {
    -webkit-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
  }
  .gx-chat-user.gx-chat-user-center .gx-chat-avatar {
    margin-left: auto;
  }
  .gx-chat-user-item {
    padding: 16px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    cursor: pointer;
    max-height: 96px;
  }
  .gx-chat-user-item:not(:last-child) {
    border-bottom: solid 1px #e8e8e8;
  }
  .gx-chat-user-item.active,
  .gx-chat-user-item:hover {
    background-color: #e6faff;
  }
  .gx-chat-user-row {
    margin: 0 -5px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
  }
  .gx-chat-info {
    max-width: calc(100% - 80px);
    padding: 0 5px;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .gx-chat-info p {
    margin-bottom: 0;
  }
  .gx-chat-info .h4 {
    display: block;
    margin-bottom: 3px;
  }
  .gx-chat-info-des {
    color: #595959;
    font-size: 13px;
  }
  .gx-chat-contact-col {
    max-width: calc(100% - 50px);
    padding: 0 5px;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .gx-chat-contact-col p {
    margin-bottom: 0;
  }
  .gx-chat-contact-col .h4 {
    display: block;
    margin-bottom: 3px;
  }
  .gx-chat-date {
    padding: 0 5px;
    text-align: right;
  }
  .gx-fs-80 {
    font-size: 80px !important;
    line-height: 80px !important;
  }
  .gx-comment-box .gx-fs-80 {
    text-align: center;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 575px) {
    .gx-fs-80 {
      font-size: 60px !important;
      line-height: 60px !important;
    }
  }
  .gx-comment-box {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    height: calc(100vh - 122px) !important;
  }
  .framed-layout .gx-comment-box {
    height: calc(100vh - 122px + 2 * 20px) !important;
  }
  @media screen and (max-width: 991px) {
    .framed-layout .gx-comment-box {
      height: calc(100vh - 122px) !important;
    }
  }
  @media screen and (max-width: 575px) {
    .gx-comment-box {
      height: calc(100vh - 100px) !important;
    }
  }
  .gx-chat-box {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    z-index: 2;
  }
  .gx-chat-main {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  .gx-chat-main-header {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
    border-bottom: solid 1px #e8e8e8;
    padding: 16px;
    background-color: #ffffff;
    width: 100%;
  }
  @media screen and (max-width: 1199px) {
    .gx-chat-main-header {
      padding: 8px 16px;
    }
  }
  @media screen and (max-width: 991px) {
    .gx-chat-main-header {
      padding: 8px 30px;
    }
  }
  .gx-chat-main-header-info {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-items: center;
    -ms-align-items: center;
    align-items: center;
    margin-right: auto;
  }
  .gx-chat-contact-name {
    font-size: 20px;
    font-weight: 500;
  }
  @media screen and (max-width: 1199px) {
    .gx-chat-contact-name {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    .gx-chat-contact-name {
      font-size: 15px;
    }
  }
  .gx-chat-main-footer {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    border-top: solid 1px #e8e8e8;
    padding: 6px 16px;
    background-color: #ffffff;
    width: 100%;
  }
  .gx-chat-main-footer .gx-form-group {
    margin-bottom: 0;
  }
  .gx-chat-item {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding: 16px;
  }
  @media screen and (max-width: 991px) {
    .gx-chat-item {
      padding: 16px 30px;
    }
  }
  .gx-chat-item .gx-bubble-block {
    width: calc(100% - 40px);
  }
  .gx-chat-item .gx-bubble {
    padding: 12px 15px;
    background-color: #ffffff;
    -webkit-border-radius: 20px 20px 20px 0px;
    -moz-border-radius: 20px 20px 20px 0px;
    border-radius: 20px 20px 20px 0px;
    position: relative;
    margin-left: 16px;
    max-width: 600px;
    border: solid 1px #d9d9d9;
    display: inline-block;
  }
  .gx-chat-item.gx-flex-row-reverse .gx-bubble-block {
    text-align: right;
  }
  .gx-chat-item.gx-flex-row-reverse .gx-bubble {
    margin-right: 16px;
    margin-left: 0;
    background-color: #e6faff;
    -webkit-border-radius: 20px 20px 0 20px;
    -moz-border-radius: 20px 20px 0 20px;
    border-radius: 20px 20px 0 20px;
    text-align: left;
  }
  .gx-chat-item .ant-avatar {
    display: block;
  }
  .gx-chat-btn {
    font-size: 38px !important;
    margin-right: 20px;
  }
  textarea.gx-chat-textarea {
    height: 40px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .gx-chat-sent {
    min-width: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
  }
  .gx-last-message-time {
    font-size: 11px;
    color: #8c8c8c;
  }
  @media screen and (max-width: 1199px) {
    .gx-chat-main-header .gx-size-60 {
      height: 50px !important;
      width: 50px !important;
      line-height: 50px;
    }
    .gx-chat-main-header button {
      margin-bottom: 0;
    }
    .gx-chat-main-header-info .gx-status-pos {
      max-width: 50px;
    }
  }
  @media screen and (max-width: 575px) {
    .gx-module-default h1 {
      font-size: 17px;
    }
  }
`;
