import { getImg } from "@src/utils/common";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { WrapperStyled } from "./styled";

const ListFriend = ({ currentRoom, listData, getList }) => {
  useEffect(() => {
    getList({});
  }, []);
  return (
    <WrapperStyled>
      <div className="main-right-body">
        <div className="collapse-tool-title">Các thành viên</div>

        <div className="list-user">
          {[...listData, ...listData, ...listData, ...listData]?.map(
            (item, key) => (
              <div key={key} className="list-user-item">
                <div className="list-user-item-img">
                  <img src={getImg(item?.avatar)} />
                </div>
                <div className="list-user-item-content">
                  <div className="list-user-item-content-user">
                    {item.fullName}
                  </div>
                  <div className="list-user-item-content-message">
                    <span></span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </WrapperStyled>
  );
};

export default connect(
  ({ user: { listData } }) => ({ listData }),
  ({ user: { search: getList } }) => ({ getList })
)(ListFriend);
