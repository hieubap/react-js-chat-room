import React from "react";
import { WrapperList } from "./styled";

const List = ({ title = "", render = {}, dataSource }) => {
  return (
    <WrapperList>
      <div className="corn-list-title">{title}</div>
      {dataSource.map((item, index) => (
        <div key={index} className="corn-list-item">
          <div className="corn-list-item-left">
            <i className="fa-solid fa-mobile-screen"></i>
            <div className="corn-list-item-left_group">
              <div className="corn-list-item-1">
                {render.renderLine1(item[render.dataIndex1], item, index)}
              </div>
              <div className="corn-list-item-2">
                {render.renderLine2(item[render.dataIndex2], item, index)}
              </div>
            </div>
          </div>
          <div className="corn-list-item-right">{render.renderTool(item)}</div>
        </div>
      ))}
    </WrapperList>
  );
};

export default List;
