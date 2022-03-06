import React, { useState } from "react";
import CardSport from "./components/card-sport";
import { nhayDu, sport } from "./data";
import { WrapperStyled } from "./styled";

const Sport = (props) => {
  const [state, _setState] = useState({ showBill: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  return (
    <WrapperStyled>
      {sport.map((group, index) => (
        <div key={index}>
          <div className="title-group">{group.header}</div>
          <div className="list-sport">
            {group.listActivity.map((item, idx) => (
              <CardSport key={idx} item={item} />
            ))}
          </div>
        </div>
      ))}
    </WrapperStyled>
  );
};

export default Sport;
