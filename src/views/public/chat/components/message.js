import React from "react";
import { connect } from "react-redux";
import { getImg } from "@utils/common";

const Message = ({ data = {}, front, end, auth }) => {
  return (
    <div
      className={`content-message-item ${
        front
          ? end
            ? "content-message-item-mid"
            : "content-message-item-front"
          : end
          ? "content-message-item-end"
          : ""
      } ${
        auth.userId === data.fromId
          ? "content-message-item-send"
          : "content-message-item-receive"
      }`}
    >
      {auth.userId !== data.fromId && (
        <div className="main-center-top-img">
          {!front && <img src={getImg(data?.avatar)} />}
        </div>
      )}

      <div className="wrapper-data">
        <div className={`wrapper-data-content`}>
          {data.content}
          <div className="react-message">
            <div>
              <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf3/1.5/16/2764.png" />
            </div>
            <div>2</div>
          </div>
          <div
            className={`react-message-option ${
              auth.userId == data.fromId && "react-message-option-send"
            }`}
          >
            <div className="react-message-option-wrapper">
              <img
                className="react-message-option-status"
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf3/1.5/16/2764.png"
              />
            </div>
            <div className="react-message-option-wrapper">
              <img
                className="react-message-option-status"
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/te7/1.5/32/1f606.png"
              />
            </div>
            <div className="react-message-option-wrapper">
              <img
                className="react-message-option-status"
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/td4/1.5/32/1f62e.png"
              />
            </div>
            <div className="react-message-option-wrapper">
              <img
                className="react-message-option-status"
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/t1f/1.5/32/1f620.png"
              />
            </div>
            <div className="react-message-option-wrapper">
              <img
                className="react-message-option-status"
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf/1.5/32/1f44d.png"
              />
            </div>
          </div>
        </div>
        {auth.userId !== data.fromId && !end && (
          <div className="user-name-send">{data.fullName}</div>
        )}
        <div
          className={`list-last-seen ${
            auth.userId === data.fromId && "list-last-seen-send"
          }`}
        >
          {data?.listLastSeen?.map((item, idx) => (
            <div key={idx} className="list-last-seen-item">
              <img src={getImg(item?.account?.avatar)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(({ auth: { auth } }) => ({ auth }))(Message);
