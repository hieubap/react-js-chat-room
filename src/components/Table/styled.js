import styled from "styled-components";
import { Table as TB } from "antd";

export const Table = styled(TB)`
  border: 1px solid #d9dbe9;
  .ant-table-thead {
    tr {
      th {
        padding: 10px;
        background-color: #e9eff7;
        font-size: 14px;
        font-weight: bold;
        text-align: center !important;
      }
    }
  }
  .ant-table-tbody {
    tr {
      td {
        padding: 10px;
        border-bottom: 1px solid #d9dbe9;
      }
      &.active {
        background-color: var(--blue-2);
        &:hover {
          td {
            background-color: var(--blue-3);
          }
        }
      }
    }
  }
`;
