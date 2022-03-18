import React, { useEffect } from "react";
import { Avatar } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const UserCell = ({ chat }) => {
  const { _getList, updateData } = useDispatch().message;
  const { idTeam } = useSelector((state) => state.message);

  return (
    <div
      className={`gx-chat-user-item ${idTeam === chat.id ? "active" : ""}`}
      onClick={() => {
        _getList({
          idTeam: chat?.id,
          size: 20,
          sort: "createdAt,asc",
        }).finally(() => {
          document
            .getElementById("id-content-chat-message")
            .scrollIntoView({ block: "end", behavior: "smooth" });
        });
        updateData({ idTeam: chat?.id, selectTeam: chat });
      }}
    >
      <div className="gx-chat-user-row">
        <div className="gx-chat-avatar">
          <div className="gx-status-pos">
            <Avatar src={chat.thumb} className="gx-size-40" alt={chat.name} />
            <span className={`gx-status gx-small gx-${chat.status}`} />
          </div>
        </div>

        <div className="gx-chat-info">
          <span className="gx-name h4">
            Nhóm {chat.id} <b>{chat?.resManagerDTO?.name}</b>
          </span>
          {/* <div className="gx-chat-info-des gx-text-truncate">{chat.lastMessage.substring(0, 25) + "..."}</div> */}
          <div className="gx-last-message-time">
            {moment(chat.createdAt).format("HH:mm DD/MM/YYYY")}
          </div>
        </div>

        {chat.unreadMessage > 0 ? (
          <div className="gx-chat-date">
            <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">
              {chat.unreadMessage}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserCell;
