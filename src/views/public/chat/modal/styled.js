import styled from "styled-components";

export const StyledAddMem = styled.div`
  padding: 0 5px;
  .wrapper-search {
    border: 1px solid #999;
    border-radius: 3px;
    display: flex;
    margin-top: 8px;
    align-items: center;
    i {
      padding: 0 10px;
    }
    .search-input {
      width: calc(100% - 80px);
      height: 28px;
      border: none;
      outline: none;
    }
  }

  .title-member {
    padding-left: 10px;
  }
  .list-select-member {
    display: flex;
    overflow-x: scroll;
    margin-bottom: 15px;
    min-height: 100px;
    .text-empty-select {
      margin: 0 auto;
      padding: 30px 0;
    }
    .avatar-component {
      padding: 10px;
      &-content {
        padding: 0;
        width: 50px;
        &-user {
          text-align: center;
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
  }
  .list-member {
    height: 400px;
    overflow-y: scroll;
    padding: 0 10px;
    .member-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 15px;
      .avatar-component {
        width: 250px;
      }
      input[type="checkbox"] {
        width: 18px;
        height: 18px;
      }
    }
  }
`;
