import React from "react";
import { data } from "../../data";
import Product from "../product";
import { useSelector } from "react-redux";

const ListFood = ({ display }) => {
  const { _listData } = useSelector((state) => state.food);
  return (
    <div className={display ? "" : "tab-not-visible"}>
      <div className="home-product">
        <div className="row sm-gutter">
          {_listData.map((item, idx) => (
            <Product key={idx} data={item} />
          ))}
          {_listData.length === 0 && (
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Cửa hàng chưa có món ăn nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ListFood.propTypes = {};

export default ListFood;
