import { plantVsZombie } from "@src/assets/images/base64";
import Rate from "@src/components/Rate";
import React from "react";
import { WrapperStyled } from "./styled";
import { UrlServer } from "@src/utils/client-utils";

const data2 = [
  {
    title: "Chating app",
    link: "/files/documents/store/chating.apk",
    img: require("@assets/images/chat_messages.png").default
  },
  {
    title: "Studemy app",
    link: "/files/documents/store/studemy.apk",
    img: require("@assets/images/studemy_icon.webp").default
  },
];
const data = [
  {
    title: "Diamond Rush",
  },
  {
    title: "Diamond Rush",
  },
  {
    title: "Diamond Rush",
  },
  {
    title: "Diamond Rush",
  },
  {
    title: "Diamond Rush",
  },
  {
    title: "Diamond Rush",
  },
  {
    title: "Diamond Rush",
  },
];

const App = (props) => {
  const renderGroup = ({ title = "App", data }) => {
    return (
      <div className="wrap-app">
        <div className="group-title">{title}</div>
        <div className="group-list">
          {data.map((item) => (
            <a
              href={
                item.link
                  ? UrlServer() + item.link
                  : require("@assets/DiamondRush.apk").default
              }
              className="item-app"
              download={"Diamond Rush.apk"}
              onClick={() => {
                // window
                //   .open(
                //     "https://play.google.com/store/apps/details?id=com.ea.gp.pvzheroes&hl=vi&gl=US"
                //   )
                //   .focus();
              }}
            >
              <div className="item-app-image">
                <img src={item.img ? item.img : plantVsZombie} />
              </div>
              <div className="item-app-description">
                <Rate margin={2} fontSize={12} value={Math.random() * 5}></Rate>
                {item.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };
  return (
    <WrapperStyled>
      {renderGroup({ title: "App hiện có", data: data2 })}
      {renderGroup({ title: "Giải trí", data })}
      {renderGroup({ title: "Tiện ích", data })}
      {renderGroup({ title: "Game", data })}
    </WrapperStyled>
  );
};

export default App;
