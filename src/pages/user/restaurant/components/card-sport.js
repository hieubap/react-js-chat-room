import { getImg } from "@src/utils";
import { message } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CardSport = ({ item }) => {
  const [state, _setState] = useState({ isRegister: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const history = useHistory();
  const hrefTo = () => {
    history.push(`/fsocial/restaurant/detail/${item.id}`);
  };

  return (
    <div className="list-sport__item" onClick={hrefTo}>
      <div className="item-sport">
        <div className="item-sport_body">
          <div className="item-sport_background">
            <img src={getImg(item.avatar)} />
          </div>
          <div className="item-sport_content">
            <div className="title">{item.name}</div>
            <div className="address">{item.address || "123 Lê thanh Nghị"}</div>
            <div className="description">
              <i className="icon fas fa-star"></i>
              <span>4</span>
            </div>
            <div className="comment">
              <span>{`${item.numberComment || 0} Lượt đánh giá`}</span>
              <span>{`${item.numberLike || 1} Lượt thích`}</span>
            </div>
            {/* <div className="btn-register">
              <div
                className={`btn-register_content ${
                  state.isRegister ? "is-register" : ""
                }`}
                onClick={() => {
                  setState({ isRegister: true });
                  if (!state.isRegister) message.success("Đăng ký thành công");
                }}
              >
                {state.isRegister ? "Đăng ký thành công" : "Đăng ký"}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSport;
