import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSport from "./components/card-sport";
import { nhayDu, sport } from "./data";
import { WrapperStyled } from "./styled";

const Sport = (props) => {
  const [state, _setState] = useState({ showBill: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const { _listData = [] } = useSelector((state) => state.resManager);
  const { _getList } = useDispatch().resManager;

  useEffect(() => {
    // console.log(rest, "rest");
    _getList({ size: 999 });
  }, []);

  return (
    <WrapperStyled>
      {/* {_listData.map((group, index) => (
        <div key={index}>
          <div className="title-group">{group.header}</div>
          <div className="list-sport">
            {group.listActivity.map((item, idx) => (
              <CardSport key={idx} item={item} />
            ))}
          </div>
        </div>
      ))} */}
      <div className="title-group">Nhà hàng</div>
      <div className="list-sport">
        {_listData.map((item, idx) => (
          <CardSport key={idx} item={item} />
        ))}
      </div>
    </WrapperStyled>
  );
};

export default Sport;
