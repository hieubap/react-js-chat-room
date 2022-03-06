import React from "react";
import { data } from "../../data";
import Product from "../product";

const ListFood = ({ display }) => {
  return (
    <div className={display ? "" : "tab-not-visible"}>
      <div className="home-product">
        <div className="row sm-gutter">
          {data.map((item, idx) => (
            <Product key={idx} data={item} />
          ))}
        </div>
      </div>

      <ul className="pagination home-product__pagination">
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            <i className="pagination-item__icon fas fa-angle-left"></i>
          </a>
        </li>
        <li className="pagination-item pagination-item--active">
          <a href="" className="pagination-item__link">
            1
          </a>
        </li>
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            2
          </a>
        </li>
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            3
          </a>
        </li>
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            4
          </a>
        </li>
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            5
          </a>
        </li>
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            ...
          </a>
        </li>
        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            14
          </a>
        </li>

        <li className="pagination-item">
          <a href="" className="pagination-item__link">
            <i className="pagination-item__icon fas fa-angle-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

ListFood.propTypes = {};

export default ListFood;
