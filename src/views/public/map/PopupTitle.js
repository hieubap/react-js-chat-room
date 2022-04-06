import React from "react";
const PopupTitle = ({ feature }) => {
  let popupContent;
  if (feature.properties && feature.properties.popupContent) {
    popupContent = feature.properties.popupContent;
  }

  return (
    <div style={{ width: 100 }}>
      <p>{feature.properties.title}</p>
      {popupContent}
    </div>
  );
};

export default PopupTitle;
