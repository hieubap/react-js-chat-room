import React, { memo } from "react";
import ReactDOMServer from "react-dom/server";
import { GeoJSON } from "react-leaflet";
import PopupTitle from "./PopupTitle";

let i = 1;

const GeoPolygon = memo(({ refGeoJson }) => {
  function getVoivodeshipName(feature, layer) {
    if (feature.properties && feature.properties.title) {
      const popupContent = ReactDOMServer.renderToString(
        <PopupTitle feature={feature} />
      );
      layer.bindPopup(popupContent, {
        maxWidth: 200,
        autoPan: false,
        autoClose: false,
      });
    }
  }

  function onEachFeature(feature, layer) {
    layer.on("mouseover", function (e) {
      getVoivodeshipName(feature, layer);
      this.openPopup();
    });
    layer.on("mousemove", function (e) {
      this.openPopup(e.latlng);
    });
    layer.on("mouseout", function (e) {
      this.closePopup();
    });
  }
  return (
    <GeoJSON
      ref={refGeoJson}
      key="whatever"
      onEachFeature={onEachFeature}
      style={(data) => ({
        color: data.properties.color,
        fillOpacity: 0.4,
        opacity: 0.4,
      })}
    />
  );
});

export default GeoPolygon;
