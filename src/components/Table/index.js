import Icon from "@ant-design/icons";
import { ReactComponent as BookIcon } from "@assets/svg/book.svg";
import React, { forwardRef } from "react";
import { Table as Tb } from "./styled";

const Table = ({ ...props }, ref) => {
  return (
    <Tb
      {...props}
      pagination={false}
      locale={{
        emptyText: (
          <div>
            <Icon style={{ fontSize: 110 }} component={BookIcon} />
            <div style={{ padding: "10px 0", color: "black", fontSize: 16 }}>
              Không tìm thấy kết quả
            </div>
          </div>
        ),
      }}
    />
  );
};

export default forwardRef(Table);
