import { Layout, Modal as MD } from "antd";
import React from "react";
import styled from "styled-components";

export const Screen = styled.div``;

export const Content = styled(Layout.Content)`
  padding: 20px 0px;
  margin-top: 50px;
  .body {
    padding: 10px 10px 20px 10px;
    margin: 10px;
    background-color: white;
    .header-title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      .group-search {
        display: flex;
        padding-bottom: 15px;
        width: 80%;
        .search-box {
          border-radius: 0;
        }
      }
      .btn-create {
        display: flex;
        justify-content: flex-end;
        width: 20%;
      }
    }
    /* .header-content {
      display: flex;
      justify-content: space-between;
      padding: 10px 5px;
    } */

    .div-search {
      display: flex;
      padding-bottom: 15px;
      .search-box {
        border-radius: 0;
      }
    }
  }
`;

export const Modal = styled(MD)`
  .head {
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  .footer {
    padding: 10px;
    background-color: white;
  }
`;
