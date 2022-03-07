import { getImg } from "@src/utils";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({ data, addProduct, listAdd }) => {
  const [state, _setState] = useState({ isAdd: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const isAdd = listAdd.findIndex((item) => item.id === data.id) != -1;

  return (
    <div class="col l-2-4 m-4 c-6">
      <Link
        to="#"
        // href="product-info.html?id=${pageProduct.id}"
        id={data.id}
        class="home-product-item"
      >
        <img src={getImg(data.avatar)} class="home-product-item__img" />
        <div class="home-product-item__name"> {data.name} </div>
        <div class="home-product-item__price">
          {/* <span class="home-product-item__price-old">
            {data.price?.formatPrice()}đ
          </span> */}
          <span class="home-product-item__price-current">
            {data.price?.formatPrice()}đ
          </span>
        </div>
        <div class="home-product-item__action">
          <span class="home-product-item__like home-product-item__like--liked">
            <i class="home-product-item__like-icon-empty far fa-heart"></i>
            <i class="home-product-item__like-icon-fill fas fa-heart"></i>
          </span>
          <div class="home-product-item__rating">
            <i class="home-product-item__star--gold fas fa-star"></i>
            <i class="home-product-item__star--gold fas fa-star"></i>
            <i class="home-product-item__star--gold fas fa-star"></i>
            <i class="home-product-item__star--gold fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          {/* <span class="home-product-item__sold">
            {data.numberSell + " đã bán"}
          </span> */}
        </div>
        {/* <div class="home-product-item__origin">
          <span class="home-product-item__origin-name">
            {data.manufactureCountry}
          </span>
          <span
            class={`home-product-item__brand ${isAdd ? "is-add" : ""}`}
            onClick={() => {
              if (!isAdd) addProduct(data);
            }}
          >
            {isAdd ? "Đã thêm" : "Mua ngay"}
          </span>
        </div> */}
        <div class="product-favourite">
          <i class="fas fa-check"></i>
          <span> Yêu thích </span>
        </div>
        <div class="product-sale-off">
          <span class="product-sale-off__percent"> {data.per}% </span>
          {/* <span class="product-sale-off__label"> GIẢM </span> */}
        </div>
      </Link>
    </div>
  );
};

export default connect(
  ({ shop: { listAdd } }) => ({ listAdd }),
  ({ shop: { addProduct } }) => ({ addProduct })
)(Product);
