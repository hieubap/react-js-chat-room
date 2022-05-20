import { plantVsZombie } from "@src/assets/images/base64";
import Rate from "@src/components/Rate";
import React from "react";
import { WrapperStyled } from "./styled";

const data = [
  {
    title: "Chat app",
  },
  {
    title: "Chat app",
  },
  {
    title: "Chat app",
  },
  {
    title: "Chat app",
  },
  {
    title: "Chat app",
  },
  {
    title: "Chat app",
  },
  {
    title: "Chat app",
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
              href={require("@assets/DiamondRush.apk").default}
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
                <img src={plantVsZombie} />
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
      {renderGroup({ title: "App hiện có", data })}
      {renderGroup({ title: "Giải trí", data })}
      {renderGroup({ title: "Tiện ích", data })}
      {renderGroup({ title: "Game", data })}
    </WrapperStyled>
  );
};

export default App;
