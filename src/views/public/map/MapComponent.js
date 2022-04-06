import React, { memo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import GeoPolygon from "./GeoPolygon";
import "react-leaflet-markercluster/dist/styles.min.css";

const center = [15.8828276, 107.590866];

const MapComponent = memo(({ map, refGeoJson }) => {
  const whenCreated = (m) => {
    // const zoomControl = new L.Control({ position: "topright" });
    // zoomControl.addTo(m);
    map.current = m;
  };

  return (
    <MapContainer
      fullscreenControl={{ pseudoFullscreen: true }}
      className="markercluster-map"
      center={center}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
      whenCreated={whenCreated}
      boxZoom={false}
      // zoomControl={false}
      // zoomControl={L.control({ position: "bottomleft" })}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <GeoPolygon refGeoJson={refGeoJson} /> */}
      {/* {mapData.map((m, index) => (
          <GroupMarker
            opacity={checks.some((c) => c === index) ? 1 : 0}
            key={index}
            dataPoints={dataPoints[m.dataIndex]}
            iconUrl={m.iconUrl}
            onVisiblePopup={onVisiblePopup}
            index={index}
          />
        ))}
        <GeoPolygon refGeoJson={refGeoJson} />
        {visibleCircle && centerFocus && range && (
          <Circle
            center={centerFocus}
            pathOptions={{ color: "blue", fillColor: "blue" }}
            radius={range * 1000}
          />
        )} */}
    </MapContainer>
  );
});

export default MapComponent;
