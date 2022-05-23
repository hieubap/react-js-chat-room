import { getImg, timeFromNow } from "@src/utils/common";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import InputComment from "./input-comment";
import { WrapperStyled } from "./styled";

const Post = ({
  id,
  content,
  author,
  timestamp,
  createdAt,
  imgUrl,
  numberLike,
  numberComment,
  imgPath,
  createdBy,
  likeId,
  isLike,
  avatar,

  auth,
  onEdit,
  createLike,
  deleteLike,
  onLike,
  listUser = [],
  createComment,
  deleteComment,
  getListComment,
  updatePost,
  deletePost,
  getListPost,
}) => {
  const [state, _setstate] = useState({
    showMenu: false,
    listComment: [],
    isClickComment: false,
  });
  const setState = (data) => {
    _setstate((pre) => ({ ...pre, ...data }));
  };
  const history = useHistory();
  const refTimeout = useRef();
  const refComment = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        typeof e.target.className === "string" &&
        e.target.className?.indexOf("post-menu-id") === -1
      ) {
        setState({ showMenu: false });
      }
    });
  }, []);

  const handleLike = () => {
    if (!auth?.userId) {
      toast.info("Vui lòng đăng nhập hệ thống");
      setTimeout(() => {
        history.push("/auth/login");
      }, 2000);

      return;
    }
    onLike({ isLike: !isLike, postId: id });
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      if (isLike) {
        deleteLike({ postId: id, id: likeId });
      } else {
        createLike({ postId: id });
      }
    }, 1000);
  };

  const upComment = (input) => {
    updatePost({
      id,
      content,
      author,
      timestamp,
      createdAt,
      imgUrl,
      numberLike,
      numberComment: numberComment + input,
      imgPath,
      createdBy,
      likeId,
    });
  };
  const showComment = (forceCall) => {
    if (state.isClickComment && !forceCall) return;
    getListComment({
      page: 0,
      size: 99,
      // userId: auth?.userId,
      postId: id,
    }).then((res) => {
      if (res && res.code === 0) {
        setState({ isClickComment: true, listComment: res.data });
      }
    });
  };

  const handleComment = () => {
    if (refComment.current?.getValue()?.length === 0) {
      toast.error("Nội dung không được để trống");
      return;
    }
    createComment({
      userId: auth?.userId,
      postId: id,
      idRes: auth?.userId,
      content: refComment.current?.getValue(),
    }).then((res) => {
      if (res && res.code === 0) {
        showComment(true);
        upComment(1);
        if (refComment.current) {
          refComment.current.reset();
        }
      }
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment({ id: commentId }).then((res) => {
      if (res && res.code === 0) {
        const newListComment = Object.assign([], state.listComment);
        setState({
          listComment: newListComment.filter((item) => item.id != commentId),
        });
        upComment(-1);
      }
    });
  };

  return (
    <WrapperStyled>
      <div className="container-header">
        <div className="container-header-info">
          <img
            src={getImg(avatar)}
            alt=""
            className="container-header-info_avatar"
          />
          <ul className="container__body--main-frame-headerNT">
            <li className="container-header-info_name">{author}</li>
            <li className="container-header-info_time">
              {timeFromNow(createdAt)}
            </li>
          </ul>
        </div>
        <div className="sidebar">
          {auth?.userId && auth?.userId === createdBy && (
            <label
              onClick={() => {
                setState({ showMenu: true });
              }}
            >
              <i className="sidebar_menu-icon fa fa-ellipsis-h"></i>
            </label>
          )}
          {state.showMenu && (
            <div className="sidebar_menu post-menu-id">
              <ul className="sidebar_menu-list post-menu-id">
                <li onClick={onEdit} className="sidebar_menu-item post-menu-id">
                  Sửa bài
                </li>
                <li
                  className="sidebar_menu-item post-menu-id"
                  onClick={() => {
                    setState({ showPopConfirm: true });
                  }}
                >
                  Xóa bài
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="container-body">{content}</p>
      {imgPath && (
        <img src={getImg(imgPath)} alt="" className="container-body_img" />
      )}

      <div className="container-footer">
        <div className="container-footer-like">
          <i className="container-footer-like-icon fa fa-heart"></i>
          <span className="container-footer-like-q">{numberLike}</span>
        </div>
        <div className="container-footer-cmt">
          <span className="container-footer-cmt-q">{numberComment}</span>
          <span className="container-footer-cmt-d">Bình luận</span>
        </div>
      </div>
      <div className="container-comment">
        <div
          onClick={handleLike}
          className={`container-comment-like ${
            isLike ? "container-comment-liked" : ""
          }`}
        >
          <i className="container-comment-like-icon fa fa-heart"></i>
          <span className="container-comment-like-btn">Yêu thích</span>
        </div>
        <div className="container-comment-cmt" onClick={showComment}>
          <i className="container-comment-cmt-icon fa fa-comments"></i>
          <span className="container-comment-cmt-btn">Bình luận</span>
        </div>
      </div>
      {state.isClickComment && auth?.userId && (
        <div className="container-input-cmt">
          <div className="left-comment">
            <div className="avatar">
              <img
                src={getImg(auth?.image)}
                alt=""
                className="frame-header-avt"
              />
            </div>
            <div className="comment-input">
              <InputComment ref={refComment} />
            </div>
          </div>
          <div>
            <button type="primary" onClick={handleComment}>
              Đăng
            </button>
          </div>
        </div>
      )}

      {state.listComment?.map((item, idx) => (
        <div key={idx} className="container__list-comment">
          <div className="container__list-comment-avatar">
            <img
              src={getImg(item.avatar)}
              alt=""
              className="frame-header-avt"
            />
          </div>
          <div className="comment-item">
            <span>
              <span className="comment-username">{item.fullName}</span>
            </span>
            <div>
              <div className="content-comment">{item.content}</div>
            </div>
          </div>
          {item.createdBy === auth?.userId && (
            <i
              className="fa fa-times delete-comment"
              onClick={() => handleDeleteComment(item.id)}
            />
          )}
        </div>
      ))}
      {/* <Modal
        visible={state.showPopConfirm}
        cancelText={"Hủy"}
        okText={"Gỡ bài"}
        onCancel={() => {
          setState({ showPopConfirm: false });
        }}
        onOk={() => {
          deletePost(id);
        }}
      >
        <div style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Bạn có chắc muốn gỡ bài viết
        </div>
      </Modal> */}
    </WrapperStyled>
  );
};

export default connect(
  ({ auth: { auth } }) => ({
    auth,
  }),
  ({
    auth: { logout },
    cache: { saveHistory },
    post: { search: getListPost, delete: deletePost, updatePost },
    postEmoji: { save: createLike, delete: deleteLike, onLike },
    postComment: {
      save: createComment,
      search: getListComment,
      delete: deleteComment,
    },
  }) => ({
    logout,
    saveHistory,
    getListPost,
    updatePost,
    createLike,
    deleteLike,
    onLike,
    createComment,
    deleteComment,
    getListComment,
    deletePost,
  })
)(Post);
