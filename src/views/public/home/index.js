// import "@assets/css/font-awesome.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CardAuthor from "./components/CardAuthor";
import ModalCreatePost from "./components/ModalCreatePost";
import Post from "./components/post";
import { WrapperStyled } from "./styled";

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
      <div className="container__adver-left">
        <a href="" className="container__adver-link">
          <img
            src={require("@assets/images/qc2.png").default}
            alt=""
            className="container__adver-img"
          />
        </a>
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
          {listBaiViet?.map((item, idx) => (
            <Post
              key={idx}
              onEdit={() => {
                updateData({ dataEdit: item });
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
      <div className="container__adver-right">
        <CardAuthor></CardAuthor>
        {/* <a href="" className="container__adver-link">
          <img
            src={require("@assets/images/qc2.png").default}
            alt=""
            className="container__adver-img"
          />
        </a> */}
      </div>
      {state.showModalPost && (
        <ModalCreatePost
          onClose={() => {
            setState({ showModalPost: false });
            updateData({ dataEdit: {} });
          }}
          afterPost={() => {
            setState({ showModalPost: false });
            // getlistBaiViet();
          }}
        />
      )}
    </WrapperStyled>
  );
};
export default connect(
  ({ auth: { auth }, post: { listData: listBaiViet = [] } }) => ({
    auth,
    listBaiViet,
  }),
  ({
    post: { search: getlistBaiViet, updateData },
    // account: { getUser },
  }) => ({
    getlistBaiViet,
    updateData,
    // getUser,
  })
)(Home);
