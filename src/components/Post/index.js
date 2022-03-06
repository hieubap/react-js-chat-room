import clientUtils from "@src/utils/client-utils";
import { getImg, timeFromNow } from "@src/utils/common";
import { Button, message, Modal, Popconfirm, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
      message.info("Vui lòng đăng nhập hệ thống");
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
        deleteLike(id);
      } else {
        createLike(id);
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
      isLike,
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
      message.error("Nội dung không được để trống");
      return;
    }
    createComment({
      userId: auth?.userId,
      postId: id,
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
    deleteComment(commentId).then((res) => {
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
      <div className="container__body--main-framepost">
        <div className="container__body--main-framepost-header">
          <div className="container__body--main-frame-header">
            <img src={getImg(avatar)} alt="" className="frame-header-avt" />
            <ul className="container__body--main-frame-headerNT">
              <li className="frame-header-name">{author}</li>
              <li className="frame-header-time">{timeFromNow(createdAt)}</li>
            </ul>
          </div>
          <div className="sidebar">
            {auth?.userId &&
              (auth?.userId === createdBy || auth?.role === "ROLE_1") && (
                <label
                  onClick={() => {
                    setState({ showMenu: true });
                  }}
                >
                  <i className="container__body--main-frame-header-menu fa fa-ellipsis-h"></i>
                </label>
              )}
            {state.showMenu && (
              <div className="sidebar_menu post-menu-id">
                {(auth?.userId === createdBy || auth?.role === "ROLE_1") && (
                  <ul className="sidebar_menu-list post-menu-id">
                    {auth?.userId === createdBy && (
                      <li
                        onClick={onEdit}
                        className="sidebar_menu-item post-menu-id"
                      >
                        Sửa bài
                      </li>
                    )}
                    <li
                      className="sidebar_menu-item post-menu-id"
                      onClick={() => {
                        setState({ showPopConfirm: true });
                      }}
                    >
                      Xóa bài
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        <p className="container__body--main-framepost-caption">{content}</p>
        <img
          src={`${clientUtils.serverApi}/files/${imgPath}`}
          alt=""
          className="container__body--main-framepost-img"
        />

        {/* <div className="container__body--main-framepost-text">
          <p className="container__body--main-framepost-dcs">Nhập đoạn text</p>
        </div> */}

        <div className="container__framepost-inf">
          <Tooltip
            title={
              <ul>
                {listUser.map((item) => (
                  <li key={item.id}>{item.fullName}</li>
                ))}
              </ul>
            }
          >
            <div className="container__framepost-inf-like">
              <i className="container__framepost-inf-like-icon fa fa-heart"></i>
              <span className="container__framepost-inf-like-q">
                {numberLike}
              </span>
            </div>
          </Tooltip>
          <div className="container__framepost-inf-cmt">
            <span className="container__framepost-inf-cmt-q">
              {numberComment}
            </span>
            <span className="container__framepost-inf-cmt-d">Bình luận</span>
          </div>
        </div>
        <div className="container__framepost-action">
          <div
            onClick={handleLike}
            className={`container__framepost-action-like ${
              isLike ? "container__framepost-action-liked" : ""
            }`}
          >
            <i className="container__framepost-action-like-icon fa fa-heart"></i>
            <span className="container__framepost-action-like-btn">
              Yêu thích
            </span>
          </div>
          <div
            className="container__framepost-action-cmt"
            onClick={showComment}
          >
            <i className="container__framepost-action-cmt-icon fa fa-comments"></i>
            <span className="container__framepost-action-cmt-btn">
              Bình luận
            </span>
          </div>
        </div>
        {state.isClickComment && auth?.userId && (
          <div className="input-comment">
            <div className="left-comment">
              <div className="avatar">
                <img
                  src={getImg(auth.avatar)}
                  alt=""
                  className="frame-header-avt"
                />
              </div>
              <div className="comment-input">
                <InputComment ref={refComment} />
              </div>
            </div>
            <div>
              <Button type="primary" onClick={handleComment}>
                Đăng
              </Button>
            </div>
          </div>
        )}

        {(state.listComment || []).map((item) => (
          <div className="comment">
            <div className="avatar">
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
            {auth?.userId && auth?.userId === item.userId && (
              <Tooltip title="Gỡ bình luận">
                <i
                  className="fa fa-times delete-comment"
                  onClick={() => handleDeleteComment(item.id)}
                />
              </Tooltip>
            )}
          </div>
        ))}
      </div>

      <Modal
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
      </Modal>
    </WrapperStyled>
  );
};

export default connect(
  ({ auth: { auth }, account: { listUser } }) => ({
    auth,
    listUser,
  }),
  ({
    auth: { _logout },
    cache: { saveHistory },
    post: { _getList: getListPost, _onDelete: deletePost, updatePost },
    like: { createLike, deleteLike, onLike },
    comment: {
      _createOrEdit: createComment,
      _getList: getListComment,
      _onDelete: deleteComment,
    },
  }) => ({
    _logout,
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
