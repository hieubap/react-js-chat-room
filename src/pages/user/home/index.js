import React, { useState, useEffect } from "react";
import { WrapperStyled } from "./styled";
import "@assets/css/font-awesome.css";
import { postData, productData } from "./data";
import Post from "@src/components/Post";
import ModalCreatePost from "@src/components/ModalCreatePost";
import { connect } from "react-redux";

const Home = ({ auth, getUser, getlistBaiViet, listBaiViet, updateData }) => {
  const [state, _setState] = useState({
    showModalPost: false,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useEffect(() => {
    getlistBaiViet({ size: 20 });
    // getUser();
  }, []);

  return (
    <WrapperStyled>
      <div className="container">
        <div className="container__product">
          <div className="container__product-list">
            {productData.map((item, index) => (
              <div key={index} href="" className="container__product-link">
                <img
                  src={item.imgUrl}
                  alt=""
                  className="container__product-img"
                />
                <span className="container__product-title">{item.content}</span>
                <span className="container__product-buy">Mua ngay</span>
              </div>
            ))}
          </div>
        </div>
        <div className="container__body">
          <div className="container__body--main">
            {auth && (
              <button
                className="container__body--postbtn js-container__body--postbtn"
                onClick={() => {
                  setState({ showModalPost: true });
                }}
              >
                Bạn đang nghĩ gì?
              </button>
            )}
            {(listBaiViet || []).map((item) => (
              <Post
                key={item.id}
                onEdit={() => {
                  updateData({ _dataEdit: item });
                  setState({ showModalPost: true });
                }}
                {...item}
              />
            ))}
            {(listBaiViet || []).length === 0 && (
              <div>Không tìm thấy kết quả</div>
            )}
          </div>
        </div>
        <div className="container__adver">
          <a href="" className="container__adver-link">
            <img
              src="https://statics.lotuscdn.vn/thumb_w/300/web/v1/images/lachanviruscorona_right_banner.png"
              alt=""
              className="container__adver-img"
            />
          </a>
          <a href="" className="container__adver-link">
            <img
              src="https://statics.lotuscdn.vn/thumb_w/300/web/v1/images/lachanviruscorona_right_banner.png"
              alt=""
              className="container__adver-img"
            />
          </a>
          <a href="" className="container__adver-link">
            <img
              src="https://statics.lotuscdn.vn/thumb_w/300/web/v1/images/lachanviruscorona_right_banner.png"
              alt=""
              className="container__adver-img"
            />
          </a>
        </div>
      </div>
      {state.showModalPost && (
        <ModalCreatePost
          onClose={() => {
            setState({ showModalPost: false });
            updateData({ _dataEdit: {} });
          }}
          afterPost={() => {
            setState({ showModalPost: false });
            getlistBaiViet();
          }}
        />
      )}
    </WrapperStyled>
  );
};
export default connect(
  ({ auth: { auth }, post: { _listData: listBaiViet } }) => ({
    auth,
    listBaiViet,
  }),
  ({
    post: { _getList: getlistBaiViet, updateData },
    account: { getUser },
  }) => ({
    getlistBaiViet,
    updateData,
    getUser,
  })
)(Home);
