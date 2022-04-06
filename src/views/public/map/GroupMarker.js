import L from "leaflet";
import React, { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import PopupMarker from "./PopupContent";
import PopupContent from "./PopupContent";
import "./styles.scss";

const GroupMarker = memo(
  ({ iconUrl, dataPoints, onVisiblePopup = () => {}, opacity = 1, index }) => {
    return (
      <MarkerClusterGroup
        spiderfyDistanceMultiplier={1}
        showCoverageOnHover={true}
        maxClusterRadius={30}
      >
        {(opacity ? dataPoints || [] : [])
          .filter((item) => item.toaDo)
          .map((item, i) => (
            <Marker
              opacity={opacity}
              key={i}
              position={{ lat: item.toaDo[0], lng: item.toaDo[1] }}
              icon={L.icon({
                iconUrl: iconUrl,
                iconSize: [32, 32],
              })}
            >
              <PopupMarker item={item} onVisiblePopup={onVisiblePopup} />
              {/* <Popup
                autoClose={false}
                onOpen={() => {
                  onVisiblePopup({
                    listNear: item.listNear,
                    centerFocus: item.toaDo,
                    chonSuDung: item.phanLoaiNccs[0] === 30,
                    item,
                  });
                }}
              >
                <PopupContent key={i} item={item} />
              </Popup> */}
            </Marker>
          ))}
      </MarkerClusterGroup>
    );
  }
);

export default GroupMarker;
