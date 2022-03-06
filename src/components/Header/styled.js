import styled from "styled-components";

export const WrapperStyled = styled.a`
  /* Header */
  .header {
    height: 50px;
    width: 100%;
    background-color: rgb(80, 122, 196);
    position: fixed;
    z-index: 1;
    top: 0;
  }
  .header__navbar {
    display: flex;
    justify-content: space-between;
  }

  .header__navbar-list {
    line-height: 50px;
    list-style: none;
    padding-left: 0;
    display: inline-flex;
  }

  .header__navbar-fun {
  }

  .header__navbar-fun-link {
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    display: block;
    color: #fff;
    font-size: 1.5rem;
    padding: 0 20px;
  }

  .header__navbar-fun-link:hover {
    background-color: #ccc;
    color: #000;
  }

  .header__navbar-fun-home {
    font-size: 2.6rem;
    margin-right: 5px;
  }

  .header__navbar-fun:hover .header__navbar-fun-list {
    display: block;
  }

  .header__navbar-fun-list {
    position: absolute;
    min-width: 200px;
    list-style-type: none;
    display: none;
  }

  .header__navbar-fun-list-link {
    background-color: #ccc;
  }

  .header__navbar-fun-list-link:hover {
    background-color: rgb(221, 217, 217);
  }

  .header__navbar-fun-list-link a {
    display: block;
    text-decoration: none;
    color: #000;
    font-size: 1.4rem;
    padding-left: 18px;
  }

  .header__navbar-fun-link-icon {
    padding-left: 2px;
    font-size: 1.2rem;
  }

  .header__search {
  }

  .header__search-input-wrap {
    z-index: 1;
    width: 600px;
    height: 100%;
  }

  .input-search {
    position: relative;
    .btn-search {
      position: absolute;
      right: 4px;
      top: 9px;
      background-color: #1890ff;
      border-radius: 3px;
      padding: 5px;
      color: white;
    }
  }
  .header__search-input {
    height: 40px;
    width: 100%;
    margin-top: 5px;
    padding-left: 16px;
    border: none;
    outline-style: none;
    font-size: 14px;
    color: #999;
    border-radius: 2px;
  }

  /* Search history */
  .header__search-history {
    z-index: 1;
    position: absolute;
    width: 100%;
    top: 50px;
    border-radius: 2px;
    box-shadow: 0 0 5px rgb(182, 179, 179);
    background-color: #fff;
    overflow: hidden;
  }

  .header__search-history-heading {
    color: #999;
    padding: 10px 12px;
    cursor: default;
  }

  .header__search-history-list {
    padding-left: 0;
    list-style: none;
    margin-bottom: 0;
  }

  .header__search-history-item {
    height: 38px;
    padding: 0 12px;

    text-decoration: none;
    display: block;
    font-size: 15px;
    color: #333;
    line-height: 38px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__search-history-item:hover {
    background-color: #fafafa;
  }

  .header__search-history-item:last-child {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .header__search-history-item a {
    text-decoration: none;
    display: block;
    font-size: 1.3rem;
    color: #333;
    line-height: 38px;
  }

  .header__navbar-user {
    position: relative;
    margin-right: 20px;
    /* Đã login */
    .header__navbar-user-all {
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 18px;
      background-color: #fff;
      height: 40px;
      width: 120px;
      padding: 0 10px 0 10px;
      margin-top: 5px;
      cursor: pointer;
      .header__navbar-user-img {
        border-radius: 50%;
        border: 1px solid #e1e1e1;
        width: 30px;
        height: 30px;
      }

      .header__navbar-user-name {
        font-size: 1.3rem;
        color: #333;
        font-weight: 500;
      }
      .header__navbar-user-menu-list {
        list-style: none;
        position: absolute;
        top: 50px;
        width: 204px;
        /* height: 139px; */
        left: -34px;
        margin-top: 2px;
        border-radius: 2px;
        box-shadow: 0 0 5px rgb(182, 179, 179);
        background-color: #fff;
        overflow: hidden;
        /* display: none; */

        .header__navbar-user-menu-link {
          padding: 15px 15px 15px 0;
          span {
            display: block;
            text-decoration: none;
            color: #333;
            padding-left: 24px;
            font-size: 1.3rem;
          }
        }
        .header__navbar-user-menu-link:hover {
          background-color: #fafafa;
        }
        .header__navbar-user-menu-link-help {
          border-top: 1px solid #e1e1e1;
        }
      }
    }
    .header__navbar-user-all:hover {
      .header__navbar-user-menu-list {
        display: block;
      }
    }
  }

  /* Chưa login */
  .header__navbar-nologin {
    list-style: none;
    display: flex;
    line-height: 50px;
    .header__navbar-nologin-link {
      margin: 0 8px;
      a {
        display: block;
        text-decoration: none;
        font-size: 1.4rem;
        color: #fff;
      }
      a:hover {
        color: #e1e1e1;
      }
    }
  }

  .ant-menu-submenu-horizontal {
    background-color: rgb(80, 122, 196);
    color: white;
  }
`;
